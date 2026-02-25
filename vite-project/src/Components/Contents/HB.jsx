import { useState, useRef, useEffect } from "react";
import "./HB.css";

function HB({ user }) {
  // 메시지 목록 상태 (더미 데이터 포함)
  const [messages, setMessages] = useState([
    {
      id: 1,
      sender: "HB_Bot",
      text: "안녕! 현복이의 채팅방에 온 걸 환영해 😎",
      isMe: false,
    },
    { id: 2, sender: "HB_Bot", text: "여기에 메세지를 남겨봐!", isMe: false },
  ]);
  const [inputValue, setInputValue] = useState("");
  const messagesEndRef = useRef(null);

  // 새 메시지가 추가될 때마다 스크롤을 맨 아래로 이동
  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSendMessage = (e) => {
    e.preventDefault();
    if (!inputValue.trim()) return;

    const newMessage = {
      id: Date.now(),
      sender: user?.name || "게스트",
      text: inputValue,
      isMe: true, // 현재 로그인한 내 메세지로 처리
    };

    setMessages([...messages, newMessage]);
    setInputValue("");

    // 심심하니까 자동 응답 봇 기능 살짝 추가
    setTimeout(() => {
      setMessages((prev) => [
        ...prev,
        {
          id: Date.now() + 1,
          sender: "HB_Bot",
          text: `오, 방금 '${inputValue}' (이)라고 했어? 🔥`,
          isMe: false,
        },
      ]);
    }, 1000);
  };

  return (
    <div className="content-card hb-container">
      <h2
        style={{
          background: "linear-gradient(135deg, #f87171 0%, #ef4444 100%)",
          WebkitBackgroundClip: "text",
          WebkitTextFillColor: "transparent",
        }}
      >
        🔥 현복 채팅방
      </h2>
      <p style={{ color: "#cbd5e1", marginBottom: "8px" }}>
        여기는 현복이의 공간이야! 봇이랑 대화해봐 😆
      </p>

      {/* 채팅 영역 */}
      <div className="chat-container">
        {/* 메시지 출력 영역 */}
        <div className="chat-messages">
          {messages.map((msg) => (
            <div
              key={msg.id}
              className={`message-wrapper ${msg.isMe ? "mine" : "other"}`}
            >
              {!msg.isMe && (
                <span className="message-sender">{msg.sender}</span>
              )}
              <div className="message-bubble">{msg.text}</div>
            </div>
          ))}
          <div ref={messagesEndRef} />
        </div>

        {/* 메시지 입력 폼 */}
        <form className="chat-input-area" onSubmit={handleSendMessage}>
          <input
            type="text"
            className="chat-input"
            placeholder="메시지를 입력하세요..."
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
          />
          <button type="submit" className="chat-submit-btn">
            전송
          </button>
        </form>
      </div>
    </div>
  );
}

export default HB;
