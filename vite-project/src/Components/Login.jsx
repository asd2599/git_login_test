import { useState } from "react";
import "./Login.css";

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = (e) => {
    e.preventDefault();
    console.log("Login attempt with:", { email, password });
    alert("아직 로그인 기능은 연결 안 했어! 😎 일단 UI만 구경해봐.");
  };

  const handleSignupClick = (e) => {
    e.preventDefault();
    alert("회원가입은 나중에 만든댔잖아! 😆");
  };

  return (
    <div className="login-container">
      {/* Background shapes for premium look */}
      <div className="bg-shape shape1"></div>
      <div className="bg-shape shape2"></div>

      <div className="login-card">
        <div className="login-header">
          <h1>환영합니다</h1>
          <p>계정에 로그인하여 서비스를 이용해보세요.</p>
        </div>

        <form
          onSubmit={handleLogin}
          style={{ display: "flex", flexDirection: "column", gap: "24px" }}
        >
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

          <div className="options">
            <label className="checkbox-label">
              <input type="checkbox" />
              <span>로그인 유지</span>
            </label>
            <a href="#" className="forgot-link">
              비밀번호 찾기
            </a>
          </div>

          <button type="submit" className="login-button">
            로그인
          </button>
        </form>

        <div className="signup-prompt">
          계정이 없으신가요?
          <a href="#" className="signup-link" onClick={handleSignupClick}>
            회원가입
          </a>
        </div>
      </div>
    </div>
  );
}

export default Login;
