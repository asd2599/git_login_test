import { useState } from 'react';
import './App.css';
import Login from './Components/Login';
import Register from './Components/Register';
import Dashboard from './Components/Dashboard';

function App() {
  const [page, setPage] = useState('login');
  const [user, setUser] = useState(null);

  const handleLoginSuccess = (userData) => {
    setUser(userData);
    setPage('dashboard');
  };

  const handleLogout = () => {
    setUser(null);
    setPage('login');
  };

  return (
    <div className="app-container">
      {page === 'dashboard' ? (
        <Dashboard user={user} onLogout={handleLogout} />
      ) : page === 'login' ? (
        <Login
          onSignupClick={() => setPage('register')}
          onLoginSuccess={handleLoginSuccess}
        />
      ) : (
        <Register onLoginClick={() => setPage('login')} />
      )}
    </div>
  );
}

export default App;
