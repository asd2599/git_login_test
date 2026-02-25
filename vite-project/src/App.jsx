import { useState } from 'react';
import './App.css';
import Login from './Components/Login';
import Register from './Components/Register';

function App() {
  const [page, setPage] = useState('login');

  return (
    <div className="app-container">
      {page === 'login' ? (
        <Login onSignupClick={() => setPage('register')} />
      ) : (
        <Register onLoginClick={() => setPage('login')} />
      )}
    </div>
  );
}

export default App;
