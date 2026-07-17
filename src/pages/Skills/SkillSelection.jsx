import { useNavigate } from 'react-router-dom';
import { 
  Code2, 
  Terminal, 
  Binary, 
  Palette, 
  BrainCircuit
} from 'lucide-react';
import SkillCard from '../../components/SkillCard';

const skills = [
  {
    id: 'python',
    title: 'Python Development',
    description: 'Master Python from basics to advanced data science and automation.',
    icon: Terminal,
    progress: 45,
    color: 'from-blue-500 to-cyan-500',
    count: '24 Videos'
  },
  {
    id: 'web-dev',
    title: 'Web Development',
    description: 'Build modern responsive websites using React, Node, and Tailwind.',
    icon: Code2,
    progress: 70,
    color: 'from-orange-500 to-yellow-500',
    count: '38 Videos'
  },
  {
    id: 'dsa',
    title: 'DSA with C++',
    description: 'Cracking coding interviews with data structures and algorithms.',
    icon: Binary,
    progress: 20,
    color: 'from-indigo-500 to-purple-500',
    count: '42 Videos'
  },
  {
    id: 'graphic-design',
    title: 'Graphic Design',
    description: 'Master UI/UX principles and design tools like Figma and Photoshop.',
    icon: Palette,
    progress: 0,
    color: 'from-pink-500 to-rose-500',
    count: '15 Videos'
  },
  {
    id: 'ai-ml',
    title: 'AI & Machine Learning',
    description: 'Learn neural networks, deep learning and AI implementation.',
    icon: BrainCircuit,
    progress: 10,
    color: 'from-green-500 to-emerald-500',
    count: '29 Videos'
  }
];

export default function SkillSelection() {
  const navigate = useNavigate();

  const handleContinue = (id) => {
    navigate(`/learning/${id}`);
  };

  return (
    <div className="max-w-7xl mx-auto">
      <header className="mb-10">
        <h1 className="text-4xl font-bold mb-3">Choose Your Skill Track</h1>
        <p className="text-slate-400 text-lg">Select a path to continue your learning journey.</p>
      </header>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {skills.map((skill) => (
          <SkillCard 
            key={skill.id} 
            skill={skill} 
            onContinue={handleContinue} 
          />
        ))}
      </div>
    </div>
  );
}
