import "./Dashboard.css";

const stats = [
  { label: "총 회원수", value: "12,847", change: "+3.2%", icon: "👥", color: "indigo" },
  { label: "오늘 방문자", value: "1,293", change: "+8.1%", icon: "📈", color: "emerald" },
  { label: "이번달 매출", value: "₩4.2M", change: "+12.5%", icon: "💰", color: "amber" },
  { label: "활성 세션", value: "847", change: "-1.4%", icon: "🟢", color: "pink" },
];

const activities = [
  { user: "홍길동", action: "로그인", time: "방금 전", avatar: "홍" },
  { user: "김철수", action: "회원가입", time: "5분 전", avatar: "김" },
  { user: "이영희", action: "프로필 수정", time: "12분 전", avatar: "이" },
  { user: "박지수", action: "비밀번호 변경", time: "31분 전", avatar: "박" },
  { user: "최민준", action: "로그아웃", time: "1시간 전", avatar: "최" },
];

const chartBars = [40, 65, 50, 80, 72, 90, 60, 85, 70, 95, 78, 88];
const chartLabels = ["1월", "2월", "3월", "4월", "5월", "6월", "7월", "8월", "9월", "10월", "11월", "12월"];

function Dashboard({ user, onLogout }) {
  const displayName = user?.name || user?.email?.split("@")[0] || "사용자";

  return (
    <div className="dashboard-container">
      {/* 배경 장식 */}
      <div className="db-bg-shape db-shape1"></div>
      <div className="db-bg-shape db-shape2"></div>
      <div className="db-bg-shape db-shape3"></div>

      {/* 상단 네비바 */}
      <nav className="db-navbar">
        <div className="db-nav-logo">
          <span className="db-logo-icon">⚡</span>
          <span className="db-logo-text">AdminPanel</span>
        </div>
        <div className="db-nav-links">
          <a href="#" className="db-nav-link active">대시보드</a>
          <a href="#" className="db-nav-link">분석</a>
          <a href="#" className="db-nav-link">사용자</a>
          <a href="#" className="db-nav-link">설정</a>
        </div>
        <div className="db-nav-user">
          <div className="db-user-avatar">{displayName[0].toUpperCase()}</div>
          <span className="db-user-name">{displayName}</span>
          <button className="db-logout-btn" onClick={onLogout}>
            로그아웃
          </button>
        </div>
      </nav>

      {/* 메인 콘텐츠 */}
      <main className="db-main">
        {/* 헤더 인사 */}
        <div className="db-welcome">
          <div>
            <h1 className="db-welcome-title">안녕하세요, {displayName}님! 👋</h1>
            <p className="db-welcome-sub">오늘도 좋은 하루 되세요. 최신 현황을 확인해보세요.</p>
          </div>
          <div className="db-date-badge">
            {new Date().toLocaleDateString("ko-KR", { year: "numeric", month: "long", day: "numeric", weekday: "long" })}
          </div>
        </div>

        {/* 통계 카드 */}
        <div className="db-stats-grid">
          {stats.map((stat) => (
            <div key={stat.label} className={`db-stat-card db-stat-${stat.color}`}>
              <div className="db-stat-top">
                <span className="db-stat-label">{stat.label}</span>
                <span className="db-stat-icon">{stat.icon}</span>
              </div>
              <div className="db-stat-value">{stat.value}</div>
              <div className={`db-stat-change ${stat.change.startsWith("+") ? "positive" : "negative"}`}>
                {stat.change} 지난달 대비
              </div>
            </div>
          ))}
        </div>

        {/* 차트 + 활동 */}
        <div className="db-content-grid">
          {/* 월별 방문자 차트 */}
          <div className="db-card db-chart-card">
            <div className="db-card-header">
              <h2 className="db-card-title">월별 방문자</h2>
              <span className="db-card-badge">2025년</span>
            </div>
            <div className="db-chart">
              {chartBars.map((height, i) => (
                <div key={i} className="db-chart-col">
                  <div
                    className="db-chart-bar"
                    style={{ height: `${height}%` }}
                    title={`${chartLabels[i]}: ${height * 100}명`}
                  ></div>
                  <span className="db-chart-label">{chartLabels[i]}</span>
                </div>
              ))}
            </div>
          </div>

          {/* 최근 활동 */}
          <div className="db-card db-activity-card">
            <div className="db-card-header">
              <h2 className="db-card-title">최근 활동</h2>
              <a href="#" className="db-card-link">전체 보기</a>
            </div>
            <ul className="db-activity-list">
              {activities.map((item, i) => (
                <li key={i} className="db-activity-item">
                  <div className="db-activity-avatar">{item.avatar}</div>
                  <div className="db-activity-info">
                    <span className="db-activity-user">{item.user}</span>
                    <span className="db-activity-action">{item.action}</span>
                  </div>
                  <span className="db-activity-time">{item.time}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* 하단 퀵 메뉴 */}
        <div className="db-quick-grid">
          {[
            { icon: "👤", title: "회원 관리", desc: "전체 회원 목록 및 권한 관리" },
            { icon: "📊", title: "리포트", desc: "상세 분석 리포트 확인" },
            { icon: "🔔", title: "알림 설정", desc: "시스템 알림 규칙 관리" },
            { icon: "🛡️", title: "보안 로그", desc: "접속 및 보안 이벤트 기록" },
          ].map((item) => (
            <div key={item.title} className="db-quick-card">
              <span className="db-quick-icon">{item.icon}</span>
              <div>
                <div className="db-quick-title">{item.title}</div>
                <div className="db-quick-desc">{item.desc}</div>
              </div>
            </div>
          ))}
        </div>
      </main>
    </div>
  );
}

export default Dashboard;
