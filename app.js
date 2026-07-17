// YouTube Skill Development Tracker - Core Application Controller (Auth Gateway + Profiles + Flattened Tiers)

// --- STATE MANAGEMENT ---
window.trackerState = {
  completedVideos: {}, // { videoId: true/false }
  videoNotes: {},      // { videoId: "Notes text" }
  activityLogs: {},    // { "YYYY-MM-DD": count }
  streak: 0,
  sessionActive: false, // Session gate flag
  userName: "",        // User Full Name
  userEmail: "",       // User Email ID
  lastUpdated: 0
};

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyB6jYoyUC7h_WxoziLKvFAcn8Alnc-B5U8",
  authDomain: "skill-development-tracke-9f423.firebaseapp.com",
  projectId: "skill-development-tracke-9f423",
  storageBucket: "skill-development-tracke-9f423.firebasestorage.app",
  messagingSenderId: "6788812979",
  appId: "1:6788812979:web:ea7ae185850620f2c4e0c6"
};

const LOCAL_STORAGE_KEY = "yt_skill_tracker_state";
let db = null;
let auth = null;
let currentUser = null;
let isFirebaseConnected = false;

// Format dates consistently
function getTodayString() {
  return formatDateString(new Date());
}

function formatDateString(date) {
  const yyyy = date.getFullYear();
  const mm = String(date.getMonth() + 1).padStart(2, '0');
  const dd = String(date.getDate()).padStart(2, '0');
  return `${yyyy}-${mm}-${dd}`;
}

function getRelativeDateString(offsetDays) {
  const d = new Date();
  d.setDate(d.getDate() + offsetDays);
  return formatDateString(d);
}

// Load state from local storage or cloud
async function initTrackerState() {
  const cached = localStorage.getItem(LOCAL_STORAGE_KEY);
  if (cached) {
    try {
      window.trackerState = { ...window.trackerState, ...JSON.parse(cached) };
    } catch (e) {
      console.error("Error parsing local state", e);
    }
  }

  // Update streak on startup
  recalculateStreak();

  // Initialize Firebase
  await initFirebase(firebaseConfig);
}

// Save state to local storage and sync to Firebase if available
function saveState() {
  window.trackerState.lastUpdated = Date.now();
  localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(window.trackerState));
  
  if (isFirebaseConnected && currentUser) {
    syncToFirebase();
  }
}

// --- FIREBASE INTEGRATION ENGINE ---
async function initFirebase(config) {
  try {
    updateSyncStatus(false, "Connecting to Firebase...");
    const { initializeApp } = await import("https://www.gstatic.com/firebasejs/10.8.0/firebase-app.js");
    const { getFirestore, doc, setDoc, getDoc } = await import("https://www.gstatic.com/firebasejs/10.8.0/firebase-firestore.js");
    const { getAuth, onAuthStateChanged, createUserWithEmailAndPassword, signInWithEmailAndPassword, signOut } = await import("https://www.gstatic.com/firebasejs/10.8.0/firebase-auth.js");

    const app = initializeApp(config);
    db = getFirestore(app);
    auth = getAuth(app);

    // Export auth functions to window
    window.signUpWithEmail = async function(name, email, password) {
      try {
        const userCredential = await createUserWithEmailAndPassword(auth, email, password);
        window.trackerState.userName = name;
        window.trackerState.userEmail = email;
        window.trackerState.sessionActive = true;
        saveState(); // Guarantee state is saved before redirect
        currentUser = userCredential.user;
        await syncToFirebase(); // Sync initial name and data
        window.location.href = "index.html";
      } catch (error) {
        console.error("Signup error:", error);
        alert(error.message);
      }
    };

    window.loginWithEmail = async function(email, password) {
      try {
        // Wipe local state before login to prevent previous user data bleeding into this account
        window.trackerState = {
          completedVideos: {}, videoNotes: {}, activityLogs: {}, streak: 0,
          sessionActive: false, userName: "", userEmail: "", lastUpdated: 0
        };
        localStorage.removeItem(LOCAL_STORAGE_KEY);
        
        await signInWithEmailAndPassword(auth, email, password);
        // Do not call saveState() here. Let onAuthStateChanged pull the cloud data first!
        window.location.href = "index.html";
      } catch (error) {
        console.error("Login error:", error);
        alert(error.message);
      }
    };

    window.logoutFirebase = async function() {
      try {
        await signOut(auth);
        window.trackerState = {
          completedVideos: {}, videoNotes: {}, activityLogs: {}, streak: 0,
          sessionActive: false, userName: "", userEmail: "", lastUpdated: 0
        };
        localStorage.removeItem(LOCAL_STORAGE_KEY);
        window.location.href = "login.html";
      } catch (error) {
        console.error("Logout error:", error);
      }
    };

    return new Promise((resolve) => {
      let authInitialized = false;
      onAuthStateChanged(auth, async (user) => {
        if (user) {
          currentUser = user;
          isFirebaseConnected = true;
          window.trackerState.sessionActive = true;
          updateSyncStatus(true, "Firebase Connected");
          
          // Load cloud state and merge BEFORE doing any saves
          await syncFromFirebase(getDoc, doc);
          
          // Now save the merged cloud state locally
          saveState();
        } else {
          currentUser = null;
          isFirebaseConnected = false;
          window.trackerState = {
            completedVideos: {}, videoNotes: {}, activityLogs: {}, streak: 0,
            sessionActive: false, userName: "", userEmail: "", lastUpdated: 0
          };
          updateSyncStatus(false, "Logged Out");
          localStorage.removeItem(LOCAL_STORAGE_KEY);
          
          const currentPath = window.location.pathname;
          const page = currentPath.split("/").pop();
          if (page && page !== "login.html" && page !== "") {
            window.location.href = "login.html";
          }
        }

        if (!authInitialized) {
          authInitialized = true;
          resolve();
        }
      });
    });
  } catch (err) {
    console.error("Firebase init failed, fallback to local storage mode", err);
    isFirebaseConnected = false;
    updateSyncStatus(false, "Firebase Offline");
  }
}

async function syncFromFirebase(getDocFn, docFn) {
  if (!db || !currentUser) return;
  try {
    const userDocRef = docFn(db, "users", currentUser.uid);
    const docSnap = await getDocFn(userDocRef);
    
    if (docSnap.exists()) {
      const cloudData = docSnap.data();
      if (cloudData.lastUpdated && cloudData.lastUpdated > window.trackerState.lastUpdated) {
        window.trackerState.completedVideos = cloudData.completedVideos || {};
        window.trackerState.videoNotes = cloudData.videoNotes || {};
        window.trackerState.activityLogs = cloudData.activityLogs || {};
        window.trackerState.streak = cloudData.streak || 0;
        window.trackerState.userName = cloudData.userName || "";
        window.trackerState.userEmail = cloudData.userEmail || "";
        window.trackerState.lastUpdated = cloudData.lastUpdated;
        localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(window.trackerState));
        
        triggerPageReRender();
      } else if (window.trackerState.lastUpdated > (cloudData.lastUpdated || 0)) {
        syncToFirebase();
      }
    } else {
      syncToFirebase();
    }
  } catch (e) {
    console.error("Error pulling from Firebase", e);
  }
}

async function syncToFirebase() {
  if (!db || !currentUser) return;
  try {
    const { doc, setDoc } = await import("https://www.gstatic.com/firebasejs/10.8.0/firebase-firestore.js");
    const userDocRef = doc(db, "users", currentUser.uid);
    await setDoc(userDocRef, {
      completedVideos: window.trackerState.completedVideos,
      videoNotes: window.trackerState.videoNotes,
      activityLogs: window.trackerState.activityLogs,
      streak: window.trackerState.streak,
      userName: window.trackerState.userName,
      userEmail: window.trackerState.userEmail,
      lastUpdated: window.trackerState.lastUpdated
    }, { merge: true });
    updateSyncStatus(true, "Firebase Synced");
  } catch (e) {
    console.error("Error pushing to Firebase", e);
    updateSyncStatus(false, "Sync Error (Offline)");
  }
}

function updateSyncStatus(connected, text) {
  const banner = document.getElementById("firebase-sync-banner");
  if (!banner) return;

  const dot = banner.querySelector(".sync-dot");
  const statusTxt = banner.querySelector(".sync-text");
  
  if (connected) {
    dot.classList.remove("offline");
    statusTxt.textContent = text || "Synced to Cloud";
    banner.style.borderColor = "rgba(20, 184, 166, 0.3)";
    banner.style.background = "rgba(20, 184, 166, 0.05)";
  } else {
    dot.classList.add("offline");
    statusTxt.textContent = text || "Local Storage Mode (Setup Firebase)";
    banner.style.borderColor = "var(--border-color)";
    banner.style.background = "rgba(255, 255, 255, 0.02)";
  }
}

// --- CORE UTILITY FUNCTIONS ---

// Mark a video complete / incomplete
window.markComplete = function(videoId, isComplete) {
  const completed = !!isComplete;
  const previousState = !!window.trackerState.completedVideos[videoId];
  
  if (completed === previousState) return;

  window.trackerState.completedVideos[videoId] = completed;
  
  // Track daily activity
  const today = getTodayString();
  if (!window.trackerState.activityLogs[today]) {
    window.trackerState.activityLogs[today] = 0;
  }
  
  if (completed) {
    window.trackerState.activityLogs[today] += 1;
    showToast("Video completed! Progress saved.");
    sendNotification("Progress Updated! 🚀", "You completed a video. Keep learning!");
  } else {
    window.trackerState.activityLogs[today] = Math.max(0, window.trackerState.activityLogs[today] - 1);
  }
  
  recalculateStreak();
  saveState();
  triggerPageReRender();
};

// Calculate percent completion for a skill (Flattened)
window.getProgress = function(skillId) {
  if (!window.videoData || !window.videoData[skillId]) return 0;
  
  let total = 0;
  let completed = 0;
  const videos = window.videoData[skillId].videos || [];
  
  videos.forEach(v => {
    total++;
    if (window.trackerState.completedVideos[v.id]) {
      completed++;
    }
  });
  
  return total === 0 ? 0 : Math.round((completed / total) * 100);
};

// Get aggregated statistics (Flattened)
window.getAllStats = function() {
  let totalVideos = 0;
  let completedVideosCount = 0;
  
  const skillProgress = {};
  
  if (window.videoData) {
    Object.keys(window.videoData).forEach(skillId => {
      let skillTotal = 0;
      let skillCompleted = 0;
      
      const videos = window.videoData[skillId].videos || [];
      videos.forEach(v => {
        totalVideos++;
        skillTotal++;
        if (window.trackerState.completedVideos[v.id]) {
          completedVideosCount++;
          skillCompleted++;
        }
      });
      
      skillProgress[skillId] = {
        title: window.videoData[skillId].title,
        icon: window.videoData[skillId].icon,
        pct: skillTotal === 0 ? 0 : Math.round((skillCompleted / skillTotal) * 100),
        completedCount: skillCompleted,
        totalCount: skillTotal
      };
    });
  }
  
  return {
    totalVideos,
    completedVideos: completedVideosCount,
    pct: totalVideos === 0 ? 0 : Math.round((completedVideosCount / totalVideos) * 100),
    streak: window.trackerState.streak,
    skillProgress
  };
};

// Save persistent notes for a video
window.saveNote = function(videoId, noteText) {
  window.trackerState.videoNotes[videoId] = noteText;
  saveState();
};

// Streak Calculation Logic
function recalculateStreak() {
  const logs = window.trackerState.activityLogs || {};
  const todayStr = getTodayString();
  const yesterdayStr = getRelativeDateString(-1);
  
  const hasActivityToday = logs[todayStr] && logs[todayStr] > 0;
  const hasActivityYesterday = logs[yesterdayStr] && logs[yesterdayStr] > 0;
  
  if (!hasActivityToday && !hasActivityYesterday) {
    window.trackerState.streak = 0;
    return;
  }
  
  let currentStreak = 0;
  let checkDate = new Date();
  
  if (!hasActivityToday && hasActivityYesterday) {
    checkDate.setDate(checkDate.getDate() - 1);
  }
  
  while (true) {
    const formatted = formatDateString(checkDate);
    if (logs[formatted] && logs[formatted] > 0) {
      currentStreak++;
      checkDate.setDate(checkDate.getDate() - 1);
    } else {
      break;
    }
  }
  
  window.trackerState.streak = currentStreak;
}

// --- NOTIFICATION API ENGINE ---
function initNotifications() {
  if ("Notification" in window) {
    if (Notification.permission === "default") {
      setTimeout(() => {
        Notification.requestPermission();
      }, 5000);
    }
  }
}

function sendNotification(title, body) {
  if ("Notification" in window && Notification.permission === "granted") {
    try {
      new Notification(title, {
        body: body,
        icon: "data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24' fill='%23ff4d4d'><path d='M23 12l-2.44-2.79.34-3.69-3.61-.82-1.89-3.2L12 2.96 8.6 1.5 6.71 4.7l-3.61.81.34 3.7L1 12l2.44 2.79-.34 3.69 3.61.82 1.89 3.2 3.4-1.46 3.4 1.46 1.89-3.2 3.61-.82-.34-3.69L23 12zm-12.91 4.72l-3.8-3.81 1.48-1.48 2.32 2.33 5.85-5.87 1.48 1.48-7.33 7.35z'/></svg>"
      });
    } catch (e) {
      console.warn("Desktop notification creation failed", e);
    }
  }
}

// Custom Glassmorphic Toast
function showToast(message) {
  let container = document.getElementById("toast-container");
  if (!container) {
    container = document.createElement("div");
    container.id = "toast-container";
    container.style.cssText = `
      position: fixed;
      bottom: 24px;
      right: 24px;
      display: flex;
      flex-direction: column;
      gap: 10px;
      z-index: 10000;
    `;
    document.body.appendChild(container);
  }
  
  const toast = document.createElement("div");
  toast.style.cssText = `
    background: rgba(18, 24, 40, 0.85);
    backdrop-filter: blur(12px);
    -webkit-backdrop-filter: blur(12px);
    border: 1px solid rgba(255, 77, 77, 0.3);
    color: var(--text-main);
    padding: 14px 20px;
    border-radius: var(--border-radius-md);
    box-shadow: 0 10px 30px rgba(0,0,0,0.5);
    font-size: 0.9rem;
    font-weight: 500;
    opacity: 0;
    transform: translateY(15px);
    transition: opacity 0.3s, transform 0.3s;
    display: flex;
    align-items: center;
    gap: 10px;
  `;
  toast.innerHTML = `<span>✨</span> <div>${message}</div>`;
  container.appendChild(toast);
  
  setTimeout(() => {
    toast.style.opacity = "1";
    toast.style.transform = "translateY(0)";
  }, 10);
  
  setTimeout(() => {
    toast.style.opacity = "0";
    toast.style.transform = "translateY(-10px)";
    setTimeout(() => toast.remove(), 300);
  }, 4000);
}

// --- RENDER ROUTING MANAGEMENT ---
function triggerPageReRender() {
  const event = new CustomEvent("stateUpdated");
  window.dispatchEvent(event);
  
  if (typeof window.renderIndexPage === 'function') window.renderIndexPage();
  if (typeof window.renderSkillsPage === 'function') window.renderSkillsPage();
  if (typeof window.renderLearningPage === 'function') window.renderLearningPage();
  if (typeof window.renderDashboardPage === 'function') window.renderDashboardPage();
}

// --- SESSION ACCESS LOGINS ---
// (Local login logic removed as it's replaced by window.loginWithEmail and window.signUpWithEmail inside initFirebase)

window.logout = function() {
  if (typeof window.logoutFirebase === 'function') {
    window.logoutFirebase();
  } else {
    window.trackerState = {
      completedVideos: {}, videoNotes: {}, activityLogs: {}, streak: 0,
      sessionActive: false, userName: "", userEmail: "", lastUpdated: 0
    };
    localStorage.removeItem(LOCAL_STORAGE_KEY);
    window.location.href = "login.html";
  }
};

// Start application on page load
window.addEventListener("DOMContentLoaded", async () => {
  const currentPath = window.location.pathname;
  const page = currentPath.split("/").pop();
  
  // Guard check: redirect if session is inactive
  await initTrackerState();
  
  if (page !== "login.html") {
    if (!window.trackerState.sessionActive) {
      window.location.href = "login.html";
      return;
    }
  }
  
  // Handle active highlighting
  document.querySelectorAll("nav a").forEach(link => {
    const href = link.getAttribute("href");
    if (page === href || (page === "" && href === "index.html")) {
      link.classList.add("active");
    } else {
      link.classList.remove("active");
    }
  });
  
  initNotifications();
  triggerPageReRender();
});
