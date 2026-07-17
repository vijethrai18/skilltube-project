import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Play, 
  CheckCircle2, 
  ChevronRight, 
  MoreVertical, 
  MessageSquare, 
  FileText,
  Save,
  SkipForward
} from 'lucide-react';

const COURSES = {
  'web-dev': {
    title: 'Modern Web Development',
    lessons: [
      { id: 1, title: 'Introduction to HTML5 & Semantic Elements', duration: '12:45', completed: true, level: 'beginner', thumbnail: 'https://picsum.photos/seed/web1/400/225' },
      { id: 2, title: 'CSS3 Flexbox & Grid Masterclass', duration: '24:10', completed: true, level: 'beginner', thumbnail: 'https://picsum.photos/seed/web2/400/225' },
      { id: 3, title: 'JavaScript ES6+ Features', duration: '18:30', completed: false, level: 'beginner', thumbnail: 'https://picsum.photos/seed/web3/400/225' },
      { id: 4, title: 'React Hooks Deep Dive', duration: '35:20', completed: false, level: 'intermediate', thumbnail: 'https://picsum.photos/seed/web4/400/225' },
      { id: 5, title: 'State Management with Redux Toolkit', duration: '42:15', completed: false, level: 'advanced', thumbnail: 'https://picsum.photos/seed/web5/400/225' },
    ]
  }
};

export default function LearningPage() {
  const { skillId } = useParams();
  const [activeTab, setActiveTab] = useState('beginner');
  const [activeLesson, setActiveLesson] = useState(null);
  const [notes, setNotes] = useState('');
  const [isSaving, setIsSaving] = useState(false);

  const course = COURSES[skillId] || COURSES['web-dev'];
  
  useEffect(() => {
    // Select first incomplete lesson on load
    const firstIncomplete = course.lessons.find(l => !l.completed) || course.lessons[0];
    setActiveLesson(firstIncomplete);
    
    // Load notes from local storage
    const savedNotes = localStorage.getItem(`notes-${skillId}`);
    if (savedNotes) setNotes(savedNotes);
  }, [skillId]);

  const handleSaveNotes = () => {
    setIsSaving(true);
    localStorage.setItem(`notes-${skillId}`, notes);
    setTimeout(() => setIsSaving(false), 800);
  };

  const filteredLessons = course.lessons.filter(l => l.level === activeTab);

  return (
    <div className="max-w-7xl mx-auto flex flex-col lg:flex-row gap-8">
      {/* Video Content Area */}
      <div className="flex-1 space-y-6">
        <div className="glass rounded-3xl overflow-hidden aspect-video relative group">
          <iframe 
            width="100%" 
            height="100%" 
            src={`https://www.youtube.com/embed/dQw4w9WgXcQ`} 
            title="YouTube video player" 
            frameBorder="0" 
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" 
            allowFullScreen
            className="w-full h-full"
          ></iframe>
        </div>

        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <h1 className="text-2xl font-bold">{activeLesson?.title}</h1>
            <p className="text-slate-400 mt-1">{course.title} • Module: {activeTab.toUpperCase()}</p>
          </div>
          <div className="flex items-center gap-3">
            <button className="flex items-center gap-2 px-4 py-2 bg-white/5 hover:bg-white/10 rounded-xl transition-colors border border-white/10">
              <CheckCircle2 size={18} className="text-green-400" />
              <span>Mark Completed</span>
            </button>
            <button className="btn-primary py-2 text-sm">
              Next Lesson <SkipForward size={16} />
            </button>
          </div>
        </div>

        {/* Notes Section */}
        <div className="glass-card">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-2">
              <FileText size={20} className="text-brand-primary" />
              <h3 className="font-bold">Your Notes</h3>
            </div>
            <button 
              onClick={handleSaveNotes}
              className="flex items-center gap-2 text-xs font-bold text-slate-400 hover:text-white transition-colors"
            >
              {isSaving ? 'Saving...' : <><Save size={14} /> Save Notes</>}
            </button>
          </div>
          <textarea 
            className="w-full bg-white/5 border border-white/5 rounded-xl p-4 min-h-[150px] outline-none focus:border-brand-primary/50 transition-colors resize-none text-sm placeholder:text-slate-600"
            placeholder="Type your notes here... They will be saved automatically."
            value={notes}
            onChange={(e) => setNotes(e.target.value)}
          />
        </div>
      </div>

      {/* Sidebar Playlist */}
      <div className="w-full lg:w-96 space-y-6">
        <div className="glass rounded-3xl p-6 flex flex-col h-full border border-white/5">
          <h3 className="text-xl font-bold mb-6">Course Content</h3>
          
          {/* Progress Overview */}
          <div className="mb-8">
            <div className="flex justify-between text-sm mb-2 font-medium">
              <span className="text-slate-400">Total Progress</span>
              <span>40%</span>
            </div>
            <div className="h-2 w-full bg-white/5 rounded-full overflow-hidden">
               <div className="h-full bg-brand-primary w-[40%] rounded-full shadow-[0_0_10px_rgba(99,102,241,0.5)]"></div>
            </div>
          </div>

          {/* Difficulty Tabs */}
          <div className="flex p-1 bg-white/5 rounded-2xl mb-6">
            {['beginner', 'intermediate', 'advanced'].map((tab) => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={`flex-1 py-2 text-xs font-bold rounded-xl capitalize transition-all duration-300 ${
                  activeTab === tab ? 'bg-brand-primary text-white shadow-lg' : 'text-slate-500 hover:text-slate-300'
                }`}
              >
                {tab}
              </button>
            ))}
          </div>

          {/* Lessons List */}
          <div className="space-y-3 overflow-y-auto pr-2 max-h-[500px] custom-scrollbar">
            <AnimatePresence mode="wait">
              <motion.div
                key={activeTab}
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                className="space-y-3"
              >
                {filteredLessons.map((lesson) => (
                  <button
                    key={lesson.id}
                    onClick={() => setActiveLesson(lesson)}
                    className={`w-full flex gap-3 p-3 rounded-2xl group transition-all duration-200 border ${
                      activeLesson?.id === lesson.id 
                      ? 'bg-brand-primary/10 border-brand-primary/30' 
                      : 'bg-white/5 border-transparent hover:bg-white/10'
                    }`}
                  >
                    <div className="w-20 h-12 bg-slate-800 rounded-lg overflow-hidden flex-shrink-0 relative">
                       <img src={lesson.thumbnail} className="w-full h-full object-cover" />
                       {lesson.completed && (
                         <div className="absolute inset-0 bg-brand-primary/40 flex items-center justify-center">
                           <CheckCircle2 size={20} className="text-white" />
                         </div>
                       )}
                    </div>
                    <div className="flex-1 text-left">
                      <h4 className={`text-xs font-bold line-clamp-2 ${activeLesson?.id === lesson.id ? 'text-brand-primary' : 'text-slate-300'}`}>
                        {lesson.title}
                      </h4>
                      <div className="flex items-center gap-2 mt-1">
                        <Play size={10} className="text-slate-500" />
                        <span className="text-[10px] text-slate-500 font-medium">{lesson.duration}</span>
                      </div>
                    </div>
                  </button>
                ))}
              </motion.div>
            </AnimatePresence>
          </div>
        </div>
      </div>
    </div>
  );
}
