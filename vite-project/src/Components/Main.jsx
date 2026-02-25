import { useState } from "react";
import "./Main.css";
import HB from "./Contents/HB";
import KH from "./Contents/KH";
import PD from "./Contents/PD";

function Main({ user, onLogout }) {
  const [activeTab, setActiveTab] = useState("hyunbok");

  const renderContent = () => {
    switch (activeTab) {
      case "hyunbok":
        return <HB />;
      case "kookhyun":
        return <KH />;
      case "pandol":
        return <PD />;
      default:
        return <HB />;
    }
  };

  return (
    <div className="main-layout">
      {/* 1. 사이드바 영역 */}
      <aside className="sidebar">
        <div className="sidebar-header">
          <h2>My Space 🚀</h2>
        </div>

        <nav className="sidebar-nav">
          <ul>
            <li
              className={activeTab === "hyunbok" ? "active" : ""}
              onClick={() => setActiveTab("hyunbok")}
            >
              현복 관리
            </li>
            <li
              className={activeTab === "kookhyun" ? "active" : ""}
              onClick={() => setActiveTab("kookhyun")}
            >
              국현 관리
            </li>
            <li
              className={activeTab === "pandol" ? "active" : ""}
              onClick={() => setActiveTab("pandol")}
            >
              판돌 관리
            </li>
          </ul>
        </nav>

        <div className="sidebar-footer">
          <div className="user-info">
            <span className="user-icon">👤</span>
            <div className="user-details">
              <span className="user-name">{user?.name || "게스트"}</span>
              <span className="user-email">{user?.email || "비회원"}</span>
            </div>
          </div>
          <button className="logout-button" onClick={onLogout}>
            로그아웃
          </button>
        </div>
      </aside>

      {/* 2. 메인 컨텐츠 영역 */}
      <main className="main-content">
        <header className="content-header">
          <h1>안녕하세요, {user?.name || "게스트"}님! 👋</h1>
          <p>오늘도 멋진 하루 보내세요.</p>
        </header>

        {/* 현재 활성화된 탭에 따라 컴포넌트 렌더링 */}
        <section className="content-body">{renderContent()}</section>
      </main>
    </div>
  );
}

export default Main;
