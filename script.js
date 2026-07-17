/**
 * YouTube Skill Development Tracker
 * Core Application Logic
 */

const app = {
    // 1. Initial Data Structure
    data: {
        user: {
            name: "Guest User",
            streak: 0,
            lastActivityDate: null,
            weeklyActivity: [0, 0, 0, 0, 0, 0, 0], // Sun-Sat
            totalCompleted: 0
        },
        skills: {
            python: {
                id: 'python',
                title: 'Python Programming',
                description: 'Master the most popular language for AI and web.',
                image: 'https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?w=800&auto=format&fit=crop',
                progress: 0,
                videos: [
                    { id: 'p1', title: 'Python in 100 Seconds', embedId: 'x7X9w_GIm1s', level: 'Beginner', completed: false, notes: '' },
                    { id: 'p2', title: 'Python Full Course for Beginners', embedId: 'rfscVS0vtbw', level: 'Beginner', completed: false, notes: '' },
                    { id: 'p3', title: 'Python Object Oriented Programming', embedId: 'ZDa-Z5JzLYM', level: 'Intermediate', completed: false, notes: '' },
                    { id: 'p4', title: 'Advanced Python Decorators', embedId: 'r7Dtus7N4hc', level: 'Advanced', completed: false, notes: '' }
                ]
            },
            webdev: {
                id: 'webdev',
                title: 'Web Development',
                description: 'Build modern responsive websites with HTML, CSS, & JS.',
                image: 'https://images.unsplash.com/photo-1498050108023-c5249f4df085?w=800&auto=format&fit=crop',
                progress: 0,
                videos: [
                    { id: 'w1', title: 'HTML & CSS Crash Course', embedId: 'hu-q2zYwEYs', level: 'Beginner', completed: false, notes: '' },
                    { id: 'w2', title: 'JavaScript Fundamentals', embedId: 'hdI2bqOjy3c', level: 'Beginner', completed: false, notes: '' },
                    { id: 'w3', title: 'CSS Grid & Flexbox Masterclass', embedId: 'jV8B24wq57A', level: 'Intermediate', completed: false, notes: '' }
                ]
            },
            dsa: {
                id: 'dsa',
                title: 'DSA with JavaScript',
                description: 'Crack coding interviews with efficient algorithms.',
                image: 'https://images.unsplash.com/photo-1516116216624-53e697fedbea?w=800&auto=format&fit=crop',
                progress: 0,
                videos: [
                    { id: 'd1', title: 'Big O Notation Explained', embedId: 'itnHiGmshu0', level: 'Beginner', completed: false, notes: '' },
                    { id: 'd2', title: 'Binary Search Algorithm', embedId: '6ysjqCUvQHw', level: 'Beginner', completed: false, notes: '' },
                    { id: 'd3', title: 'Graph Theory Foundations', embedId: 'cWNEl4HE2OE', level: 'Intermediate', completed: false, notes: '' }
                ]
            },
            design: {
                id: 'design',
                title: 'Graphic Design',
                description: 'Learn the principles of visual design and UI/UX.',
                image: 'https://images.unsplash.com/photo-1558655146-d09347e92766?w=800&auto=format&fit=crop',
                progress: 0,
                videos: [
                    { id: 'g1', title: 'Graphic Design Theory', embedId: 'YqQx75OPRa0', level: 'Beginner', completed: false, notes: '' },
                    { id: 'g2', title: 'Color Theory for Designers', embedId: 'L1CK9bE3H_s', level: 'Beginner', completed: false, notes: '' }
                ]
            }
        }
    },

    currentTrackId: null,
    currentVideoId: null,
    currentLevel: 'Beginner',

    // Initialization
    init() {
        this.loadFromLocalStorage();
        this.setupEventListeners();
        this.updateStreak();
        this.renderSkills();
        this.updateDashboard();
        
        // Initial view
        this.showView('home');
        
        console.log("SkillTracker Initialized");
    },

    // 2. Navigation / View Management
    showView(viewId) {
        // Hide all views
        document.querySelectorAll('.view').forEach(v => v.classList.remove('active'));
        // Show target view
        const targetView = document.getElementById(`view-${viewId}`);
        if (targetView) targetView.classList.add('active');

        // Update nav items
        document.querySelectorAll('.nav-item').forEach(item => {
            item.classList.toggle('active', item.dataset.view === viewId);
        });

        // Scroll to top
        document.querySelector('.main-content').scrollTop = 0;
    },

    // 3. Local Storage Handling
    saveToLocalStorage() {
        localStorage.setItem('skillTrackerData', JSON.stringify(this.data));
    },

    loadFromLocalStorage() {
        const saved = localStorage.getItem('skillTrackerData');
        if (saved) {
            this.data = JSON.parse(saved);
        }
    },

    // 4. Data Logic & calculations
    updateSkillProgress(trackId) {
        const track = this.data.skills[trackId];
        const total = track.videos.length;
        const completed = track.videos.filter(v => v.completed).length;
        track.progress = Math.round((completed / total) * 100);
        
        this.updateTotalStats();
        this.saveToLocalStorage();
    },

    updateTotalStats() {
        let totalVideos = 0;
        let totalCompleted = 0;
        let skillsStarted = 0;

        for (const trackId in this.data.skills) {
            const track = this.data.skills[trackId];
            totalVideos += track.videos.length;
            const completedCount = track.videos.filter(v => v.completed).length;
            totalCompleted += completedCount;
            if (completedCount > 0) skillsStarted++;
        }

        this.data.user.totalCompleted = totalCompleted;
        this.data.user.completionRate = totalVideos > 0 ? Math.round((totalCompleted / totalVideos) * 100) : 0;
        this.data.user.skillsStartedCount = skillsStarted;
    },

    // Streak Logic
    updateStreak() {
        const today = new Date().toDateString();
        const lastDate = this.data.user.lastActivityDate;
        const dayOfWeek = new Date().getDay();

        if (lastDate !== today) {
            const yesterday = new Date();
            yesterday.setDate(yesterday.getDate() - 1);
            
            if (lastDate === yesterday.toDateString()) {
                // Streak continues! (Will be incremented on first completion of today)
            } else if (lastDate === null) {
                // First time
                this.data.user.streak = 0;
            } else {
                // Streak broken
                this.data.user.streak = 0;
            }
        }
        
        document.getElementById('streak-count').textContent = this.data.user.streak;
    },

    recordActivity() {
        const today = new Date().toDateString();
        const todayIndex = new Date().getDay();

        if (this.data.user.lastActivityDate !== today) {
            this.data.user.streak++;
            this.data.user.lastActivityDate = today;
            
            // Increment weekly activity (mental "check" for the day)
            this.data.user.weeklyActivity[todayIndex] = Math.min(this.data.user.weeklyActivity[todayIndex] + 1, 100);
        }
        
        this.saveToLocalStorage();
        this.updateStreak();
    },

    // 5. Rendering Logic
    renderSkills() {
        const grid = document.getElementById('skill-grid');
        grid.innerHTML = '';

        for (const trackId in this.data.skills) {
            const track = this.data.skills[trackId];
            const card = document.createElement('div');
            card.className = 'skill-card';
            card.innerHTML = `
                <div class="skill-card-image" style="background-image: url('${track.image}')"></div>
                <div class="skill-card-content">
                    <h3>${track.title}</h3>
                    <div class="progress-info">
                        <span>Progress</span>
                        <span>${track.progress}%</span>
                    </div>
                    <div class="progress-bar-container">
                        <div class="progress-bar" style="width: ${track.progress}%"></div>
                    </div>
                </div>
            `;
            card.onclick = () => this.openTrack(trackId);
            grid.appendChild(card);
        }
    },

    openTrack(trackId) {
        this.currentTrackId = trackId;
        const track = this.data.skills[trackId];
        
        document.getElementById('current-track-title').textContent = track.title;
        this.updateLearningProgressUI();
        this.renderVideoList(this.currentLevel);
        
        this.showView('learning');
    },

    renderVideoList(level) {
        this.currentLevel = level;
        const videoList = document.getElementById('video-list');
        videoList.innerHTML = '';
        
        const track = this.data.skills[this.currentTrackId];
        const filteredVideos = track.videos.filter(v => v.level === level);

        filteredVideos.forEach(video => {
            const item = document.createElement('div');
            item.className = `video-item ${video.completed ? 'completed' : ''} ${this.currentVideoId === video.id ? 'active' : ''}`;
            item.innerHTML = `
                <i data-lucide="${video.completed ? 'check-circle' : 'play-circle'}" class="check"></i>
                <div class="video-item-info">
                    <h4>${video.title}</h4>
                    <span>${video.level}</span>
                </div>
            `;
            item.onclick = () => this.selectVideo(video.id);
            videoList.appendChild(item);
        });
        
        lucide.createIcons();
    },

    selectVideo(videoId) {
        this.currentVideoId = videoId;
        const track = this.data.skills[this.currentTrackId];
        const video = track.videos.find(v => v.id === videoId);

        // Update UI
        document.getElementById('current-video-title').textContent = video.title;
        document.getElementById('video-notes').value = video.notes || '';
        
        const container = document.getElementById('video-player-container');
        container.innerHTML = `<iframe src="https://www.youtube.com/embed/${video.embedId}?autoplay=1" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>`;

        // Update Button
        const btn = document.getElementById('mark-complete-btn');
        btn.innerHTML = video.completed ? '<i data-lucide="check-circle"></i> Completed' : '<i data-lucide="circle"></i> Mark as Completed';
        btn.className = video.completed ? 'btn btn-secondary' : 'btn btn-success';
        
        this.renderVideoList(this.currentLevel);
        lucide.createIcons();
    },

    toggleCompletion() {
        if (!this.currentTrackId || !this.currentVideoId) return;

        const track = this.data.skills[this.currentTrackId];
        const video = track.videos.find(v => v.id === this.currentVideoId);
        
        video.completed = !video.completed;
        
        if (video.completed) this.recordActivity();
        
        this.updateSkillProgress(this.currentTrackId);
        this.updateLearningProgressUI();
        this.selectVideo(this.currentVideoId); // Refresh state
        this.renderSkills(); // Update cards in background
    },

    updateLearningProgressUI() {
        const track = this.data.skills[this.currentTrackId];
        document.getElementById('track-progress-text').textContent = `${track.progress}% Completed`;
        document.getElementById('track-progress-bar').style.width = `${track.progress}%`;
    },

    saveNote(content) {
        if (!this.currentTrackId || !this.currentVideoId) return;
        
        const track = this.data.skills[this.currentTrackId];
        const video = track.videos.find(v => v.id === this.currentVideoId);
        video.notes = content;
        
        // Visual feedback
        const badge = document.getElementById('notes-status');
        badge.textContent = 'Saving...';
        badge.style.background = 'rgba(59, 130, 246, 0.2)';
        badge.style.color = '#3b82f6';
        
        clearTimeout(this.saveTimeout);
        this.saveTimeout = setTimeout(() => {
            this.saveToLocalStorage();
            badge.textContent = 'Saved';
            badge.style.background = 'rgba(16, 185, 129, 0.2)';
            badge.style.color = '#10b981';
        }, 800);
    },

    updateDashboard() {
        this.updateTotalStats();
        
        document.getElementById('total-completed').textContent = this.data.user.totalCompleted;
        document.getElementById('current-streak-stat').textContent = this.data.user.streak;
        document.getElementById('completion-rate').textContent = `${this.data.user.completionRate || 0}%`;
        document.getElementById('skills-mastered').textContent = this.data.user.skillsStartedCount;

        // Render Skill breakdown
        const list = document.getElementById('skill-progress-list');
        list.innerHTML = '';
        
        for (const id in this.data.skills) {
            const track = this.data.skills[id];
            const item = document.createElement('div');
            item.className = 'skill-prog-item';
            item.innerHTML = `
                <div class="progress-info">
                    <span>${track.title}</span>
                    <span>${track.progress}%</span>
                </div>
                <div class="progress-bar-container">
                    <div class="progress-bar" style="width: ${track.progress}%"></div>
                </div>
            `;
            list.appendChild(item);
        }

        // Weekly Activity Chart
        const bars = document.querySelectorAll('.chart-bar span');
        this.data.user.weeklyActivity.forEach((value, index) => {
            if (bars[index]) bars[index].style.height = `${Math.max(5, value * 20)}%`;
        });
    },

    // 6. Event Listeners
    setupEventListeners() {
        // Navigation clicks
        document.querySelectorAll('.nav-item').forEach(item => {
            item.addEventListener('click', (e) => {
                e.preventDefault();
                const view = item.dataset.view;
                this.showView(view);
                if (view === 'dashboard') this.updateDashboard();
                if (view === 'skills') this.renderSkills();
            });
        });

        // Difficulty tabs
        document.querySelectorAll('.tab-btn').forEach(btn => {
            btn.addEventListener('click', () => {
                document.querySelectorAll('.tab-btn').forEach(b => b.classList.remove('active'));
                btn.classList.add('active');
                this.renderVideoList(btn.dataset.level);
            });
        });

        // Completion button
        document.getElementById('mark-complete-btn').addEventListener('click', () => {
            this.toggleCompletion();
        });

        // Notes textarea
        document.getElementById('video-notes').addEventListener('input', (e) => {
            this.saveNote(e.target.value);
        });
    }
};

// Start the app when DOM is ready
document.addEventListener('DOMContentLoaded', () => {
    app.init();
});
