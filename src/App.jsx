import { useEffect, useState } from 'react';
import Login from './components/Login.jsx';
import TaskDashboard from './components/TaskDashboard.jsx';

const SESSION_KEY = 'taskManagerSession';

const App = () => {
  const [session, setSession] = useState(() => sessionStorage.getItem(SESSION_KEY));

  useEffect(() => {
    const handleStorage = () => {
      setSession(sessionStorage.getItem(SESSION_KEY));
    };

    window.addEventListener('storage', handleStorage);
    return () => window.removeEventListener('storage', handleStorage);
  }, []);

  const handleLogin = (email) => {
    const payload = JSON.stringify({
      email,
      loggedInAt: new Date().toISOString(),
    });
    sessionStorage.setItem(SESSION_KEY, payload);
    setSession(payload);
  };

  const handleLogout = () => {
    sessionStorage.removeItem(SESSION_KEY);
    setSession(null);
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-50 to-slate-100">
      {session ? <TaskDashboard onLogout={handleLogout} /> : <Login onLogin={handleLogin} />}
    </div>
  );
};

export default App;

