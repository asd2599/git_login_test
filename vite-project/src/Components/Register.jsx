import { useState } from 'react';
import './Register.css';

function Signup({ onLoginClick }) {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [passwordConfirm, setPasswordConfirm] = useState('');

  const handleSignup = (e) => {
    e.preventDefault();
    if (password !== passwordConfirm) {
      alert('비밀번호가 일치하지 않습니다.');
      return;
    }
    console.log('Signup attempt with:', { name, email, password });
    alert('아직 회원가입 기능은 연결 안 했어! 😎 일단 UI만 구경해봐.');
  };

  const handleLoginClick = (e) => {
    e.preventDefault();
    if (onLoginClick) onLoginClick();
  };

  return (
    <div className="register-container">
      <div className="bg-shape shape1"></div>
      <div className="bg-shape shape2"></div>

      <div className="register-card">
        <div className="register-header">
          <h1>회원가입</h1>
          <p>새 계정을 만들어 서비스를 이용해보세요.</p>
        </div>

        <form
          onSubmit={handleSignup}
          style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}
        >
          <div className="input-group">
            <label htmlFor="name">이름</label>
            <input
              type="text"
              id="name"
              className="input-field"
              placeholder="이름을 입력하세요..."
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
            />
          </div>

          <div className="input-group">
            <label htmlFor="email">이메일</label>
            <input
              type="email"
              id="email"
              className="input-field"
              placeholder="name@example.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>

          <div className="input-group">
            <label htmlFor="password">비밀번호</label>
            <input
              type="password"
              id="password"
              className="input-field"
              placeholder="••••••••"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>

          <div className="input-group">
            <label htmlFor="passwordConfirm">비밀번호 확인</label>
            <input
              type="password"
              id="passwordConfirm"
              className="input-field"
              placeholder="••••••••"
              value={passwordConfirm}
              onChange={(e) => setPasswordConfirm(e.target.value)}
              required
            />
          </div>

          <button type="submit" className="register-button">
            회원가입
          </button>
        </form>

        <div className="login-prompt">
          이미 계정이 있으신가요?
          <a href="#" className="login-link" onClick={handleLoginClick}>
            로그인
          </a>
        </div>
      </div>
    </div>
  );
}

export default Signup;
