import { useState } from "react";
import "./Login.css";

function Login({ onSignupClick, onLoginSuccess }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleLogin = (e) => {
    e.preventDefault();
    setError("");

    // 저장된 유저 목록 가져오기
    const users = JSON.parse(localStorage.getItem("users")) || [];
    const user = users.find((u) => u.email === email);

    // 이메일 존재 여부 확인
    if (!user) {
      setError("가입되지 않은 이메일입니다.");
      return;
    }

    // 비밀번호 검증
    if (user.password !== password) {
      setError("비밀번호가 일치하지 않습니다.");
      return;
    }

    // 로그인 성공 시 userData 전달
    const userData = { email: user.email, name: user.name };
    if (onLoginSuccess) onLoginSuccess(userData);
  };

  const handleSignupClick = (e) => {
    e.preventDefault();
    if (onSignupClick) onSignupClick();
    else alert("회원가입은 나중에 만든댔잖아! 😆");
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

          {error && (
            <div
              style={{
                background: "rgba(239, 68, 68, 0.12)",
                border: "1px solid rgba(239, 68, 68, 0.3)",
                borderRadius: "10px",
                padding: "12px 16px",
                color: "#fca5a5",
                fontSize: "14px",
                textAlign: "center",
              }}
            >
              {error}
            </div>
          )}

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
