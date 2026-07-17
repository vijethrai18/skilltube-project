import { Routes, Route, Navigate } from 'react-router-dom';
import MainLayout from './layouts/MainLayout';
import AuthLayout from './layouts/AuthLayout';
import Login from './pages/Auth/Login';
import Signup from './pages/Auth/Signup';
import Dashboard from './pages/Dashboard/Dashboard';
import SkillSelection from './pages/Skills/SkillSelection';
import LearningPage from './pages/Learning/LearningPage';
import Analytics from './pages/Analytics/Analytics';
import Achievements from './pages/Community/Achievements';

function App() {
  return (
    <Routes>
      {/* Auth Routes */}
      <Route element={<AuthLayout />}>
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
      </Route>

      {/* App Routes */}
      <Route element={<MainLayout />}>
        <Route path="/" element={<Navigate to="/dashboard" replace />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/skills" element={<SkillSelection />} />
        <Route path="/learning/:skillId" element={<LearningPage />} />
        <Route path="/analytics" element={<Analytics />} />
        <Route path="/achievements" element={<Achievements />} />
      </Route>
    </Routes>
  );
}

export default App;
