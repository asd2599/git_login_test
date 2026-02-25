import { useState } from "react";
import "./PD.css";

const INITIAL_TASKS = [
  { id: 1, text: "리액트 컴포넌트 설계", priority: "high", done: false },
  { id: 2, text: "API 명세서 작성", priority: "high", done: false },
  { id: 3, text: "UI 목업 검토", priority: "medium", done: true },
  { id: 4, text: "팀 코드 리뷰", priority: "medium", done: false },
  { id: 5, text: "단위 테스트 작성", priority: "low", done: false },
  { id: 6, text: "배포 환경 설정 확인", priority: "low", done: true },
];

const GOALS = [
  { label: "주간 커밋 목표", current: 12, total: 20 },
  { label: "이슈 해결률", current: 7, total: 10 },
  { label: "코드 리뷰 완료", current: 3, total: 5 },
];

const PRIORITY_META = {
  high:   { label: "높음", cls: "prio-high" },
  medium: { label: "중간", cls: "prio-medium" },
  low:    { label: "낮음", cls: "prio-low" },
};

function PD() {
  const [tasks, setTasks] = useState(INITIAL_TASKS);
  const [newTask, setNewTask] = useState("");
  const [newPriority, setNewPriority] = useState("medium");

  const doneCount = tasks.filter((t) => t.done).length;
  const progressPct = tasks.length > 0 ? Math.round((doneCount / tasks.length) * 100) : 0;

  const toggleTask = (id) =>
    setTasks(tasks.map((t) => (t.id === id ? { ...t, done: !t.done } : t)));

  const deleteTask = (id) =>
    setTasks(tasks.filter((t) => t.id !== id));

  const addTask = (e) => {
    e.preventDefault();
    if (!newTask.trim()) return;
    setTasks([
      ...tasks,
      { id: Date.now(), text: newTask.trim(), priority: newPriority, done: false },
    ]);
    setNewTask("");
  };

  return (
    <div className="content-card pd-container">
      {/* 헤더 */}
      <h2
        style={{
          background: "linear-gradient(135deg, #34d399 0%, #10b981 100%)",
          WebkitBackgroundClip: "text",
          WebkitTextFillColor: "transparent",
        }}
      >
        🌿 판돌 태스크 보드
      </h2>
      <p>할 일을 추가하고 진행 상황을 한눈에 관리하세요.</p>

      {/* 요약 카드 */}
      <div className="pd-summary">
        <div className="pd-summary-card">
          <span className="pd-sum-num">{tasks.filter((t) => !t.done).length}</span>
          <span className="pd-sum-label">남은 할 일</span>
        </div>
        <div className="pd-summary-card pd-sum-done">
          <span className="pd-sum-num">{doneCount}</span>
          <span className="pd-sum-label">완료</span>
        </div>
        <div className="pd-summary-card">
          <span className="pd-sum-num">{progressPct}%</span>
          <span className="pd-sum-label">진행률</span>
        </div>
      </div>

      {/* 전체 진행 바 */}
      <div className="pd-progress-bar-wrap">
        <div className="pd-progress-bar" style={{ width: `${progressPct}%` }}></div>
      </div>

      {/* 추가 폼 */}
      <form className="pd-add-form" onSubmit={addTask}>
        <input
          className="pd-add-input"
          type="text"
          placeholder="새 할 일을 입력하세요..."
          value={newTask}
          onChange={(e) => setNewTask(e.target.value)}
        />
        <select
          className="pd-priority-select"
          value={newPriority}
          onChange={(e) => setNewPriority(e.target.value)}
        >
          <option value="high">🔴 높음</option>
          <option value="medium">🟡 중간</option>
          <option value="low">🟢 낮음</option>
        </select>
        <button type="submit" className="pd-add-btn">+ 추가</button>
      </form>

      {/* 할 일 목록 */}
      <ul className="pd-task-list">
        {tasks.map((task) => (
          <li key={task.id} className={`pd-task-item ${task.done ? "done" : ""}`}>
            <button className="pd-check-btn" onClick={() => toggleTask(task.id)}>
              {task.done ? "✅" : "⬜"}
            </button>
            <span className="pd-task-text">{task.text}</span>
            <span className={`pd-priority-tag ${PRIORITY_META[task.priority].cls}`}>
              {PRIORITY_META[task.priority].label}
            </span>
            <button className="pd-delete-btn" onClick={() => deleteTask(task.id)}>
              ✕
            </button>
          </li>
        ))}
      </ul>

      {/* 주간 목표 */}
      <div className="pd-goals-section">
        <h3 className="pd-goals-title">📊 이번 주 목표</h3>
        {GOALS.map((goal) => (
          <div key={goal.label} className="pd-goal-item">
            <div className="pd-goal-header">
              <span>{goal.label}</span>
              <span>
                {goal.current} / {goal.total}
              </span>
            </div>
            <div className="pd-goal-bar-bg">
              <div
                className="pd-goal-bar"
                style={{ width: `${(goal.current / goal.total) * 100}%` }}
              ></div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default PD;
