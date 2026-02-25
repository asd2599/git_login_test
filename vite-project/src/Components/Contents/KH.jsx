import { useState } from "react";
import "./KH.css";

const WEEKDAYS = ["일", "월", "화", "수", "목", "금", "토"];

function getNoteKey(year, month, day) {
  return `${year}-${month}-${day}`;
}

function KH() {
  const [currentDate, setCurrentDate] = useState(new Date());
  const [notes, setNotes] = useState({});
  const [selectedDate, setSelectedDate] = useState(null);
  const [editText, setEditText] = useState("");

  const year = currentDate.getFullYear();
  const month = currentDate.getMonth();

  const firstDay = new Date(year, month, 1).getDay();
  const daysInMonth = new Date(year, month + 1, 0).getDate();
  const daysInPrevMonth = new Date(year, month, 0).getDate();

  const today = new Date();
  const isToday = (day) =>
    day === today.getDate() &&
    month === today.getMonth() &&
    year === today.getFullYear();

  const handleDayClick = (day, isCurrentMonth) => {
    if (!isCurrentMonth) return;
    const key = getNoteKey(year, month, day);
    setSelectedDate({ year, month, day });
    setEditText(notes[key] || "");
  };

  const handleSaveNote = () => {
    if (!selectedDate) return;
    const key = getNoteKey(selectedDate.year, selectedDate.month, selectedDate.day);
    setNotes((prev) => ({ ...prev, [key]: editText }));
    setSelectedDate(null);
  };

  const handleCloseModal = () => {
    if (editText.trim()) handleSaveNote();
    setSelectedDate(null);
  };

  const goPrevMonth = () => {
    setCurrentDate(new Date(year, month - 1, 1));
  };

  const goNextMonth = () => {
    setCurrentDate(new Date(year, month + 1, 1));
  };

  const goToday = () => {
    setCurrentDate(new Date());
  };

  // 이전 달 말일들
  const prevMonthDays = [];
  for (let i = firstDay - 1; i >= 0; i--) {
    prevMonthDays.push(daysInPrevMonth - i);
  }

  // 이번 달 날짜들
  const currentMonthDays = Array.from({ length: daysInMonth }, (_, i) => i + 1);

  // 다음 달 날짜들 (캘린더를 6줄로 채우기)
  const totalCells = prevMonthDays.length + currentMonthDays.length;
  const nextMonthCount = totalCells % 7 === 0 ? 0 : 42 - totalCells;
  const nextMonthDays = Array.from({ length: nextMonthCount }, (_, i) => i + 1);

  return (
    <div className="content-card kh-container">
      <h2
        style={{
          background: "linear-gradient(135deg, #60a5fa 0%, #3b82f6 100%)",
          WebkitBackgroundClip: "text",
          WebkitTextFillColor: "transparent",
        }}
      >
        🌊 국현 대시보드
      </h2>
      <p className="kh-desc">여기는 국현이 공간! 필요한 차트나 표를 만들어서 넣기 딱 좋지.</p>

      <div className="kh-calendar">
        <div className="kh-calendar-header">
          <button className="kh-nav-btn" onClick={goPrevMonth} aria-label="이전 달">
            ‹
          </button>
          <div className="kh-month-title">
            {year}년 {month + 1}월
          </div>
          <button className="kh-nav-btn" onClick={goNextMonth} aria-label="다음 달">
            ›
          </button>
        </div>
        <button className="kh-today-btn" onClick={goToday}>
          오늘로
        </button>

        <div className="kh-weekdays">
          {WEEKDAYS.map((day, i) => (
            <div key={day} className={`kh-weekday ${i === 0 ? "sun" : ""} ${i === 6 ? "sat" : ""}`}>
              {day}
            </div>
          ))}
        </div>

        <div className="kh-days">
          {prevMonthDays.map((d) => (
            <div key={`prev-${d}`} className="kh-day kh-day-other">
              {d}
            </div>
          ))}
          {currentMonthDays.map((d) => (
            <div
              key={d}
              className={`kh-day kh-day-clickable ${isToday(d) ? "kh-day-today" : ""}`}
              onClick={() => handleDayClick(d, true)}
            >
              <span className="kh-day-num">{d}</span>
              {notes[getNoteKey(year, month, d)]?.trim() && (
                <span className="kh-day-note">{notes[getNoteKey(year, month, d)].trim()}</span>
              )}
            </div>
          ))}
          {nextMonthDays.map((d) => (
            <div key={`next-${d}`} className="kh-day kh-day-other">
              {d}
            </div>
          ))}
        </div>
      </div>

      {selectedDate && (
        <div className="kh-modal-overlay" onClick={handleCloseModal}>
          <div className="kh-modal" onClick={(e) => e.stopPropagation()}>
            <div className="kh-modal-header">
              <span>{selectedDate.year}년 {selectedDate.month + 1}월 {selectedDate.day}일</span>
              <button className="kh-modal-close" onClick={handleCloseModal} aria-label="닫기">×</button>
            </div>
            <textarea
              className="kh-modal-textarea"
              placeholder="메모를 입력하세요..."
              value={editText}
              onChange={(e) => setEditText(e.target.value)}
              autoFocus
            />
            <button className="kh-modal-save" onClick={handleSaveNote}>
              저장
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

export default KH;
