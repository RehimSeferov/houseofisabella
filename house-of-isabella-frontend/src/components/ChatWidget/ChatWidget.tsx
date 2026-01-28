import React, { useState, useEffect, useRef } from "react";
import { FaCommentDots, FaPaperPlane, FaTimes } from "react-icons/fa";
import { IoMdClose } from "react-icons/io";
import "./ChatWidget.scss";

interface Message {
  id: number;
  text: string;
  sender: "user" | "bot";
}

const ChatWidget = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [showTooltip, setShowTooltip] = useState(false);
  const [input, setInput] = useState("");
  const [messages, setMessages] = useState<Message[]>([
    {
      id: 1,
      text: "Hello! Welcome to House of Isabella. How can we help you today?",
      sender: "bot",
    },
  ]);


  const messagesEndRef = useRef<HTMLDivElement>(null);


  useEffect(() => {
    const timer = setTimeout(() => {
      setShowTooltip(true);
    }, 2000);
    return () => clearTimeout(timer);
  }, []);

  // Mesaj gələndə aşağı scroll etsin
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, isOpen]);

  const toggleChat = () => {
    setIsOpen(!isOpen);
    if (showTooltip) setShowTooltip(false); 
  };

  const closeTooltip = (e: React.MouseEvent) => {
    e.stopPropagation();
    setShowTooltip(false);
  };

  const handleSend = (e?: React.FormEvent) => {
    e?.preventDefault();
    if (!input.trim()) return;


    const newUserMsg: Message = { id: Date.now(), text: input, sender: "user" };
    setMessages((prev) => [...prev, newUserMsg]);
    setInput("");

    setTimeout(() => {
      const botMsg: Message = {
        id: Date.now() + 1,
        text: "Thank you for your message. One of our agents will be with you shortly.",
        sender: "bot",
      };
      setMessages((prev) => [...prev, botMsg]);
    }, 1500);
  };

  return (
    <div className="chat-widget-container">

      {showTooltip && !isOpen && (
        <div className="chat-tooltip" onClick={toggleChat}>
          <div className="tooltip-content">
            <strong>We're Online!</strong>
            <p>How may I help you today?</p>
          </div>
          <button className="close-tooltip" onClick={closeTooltip}>
            <IoMdClose />
          </button>
        </div>
      )}


      <button
        className={`chat-toggle-btn ${isOpen ? "active" : ""}`}
        onClick={toggleChat}
      >
        {isOpen ? <FaTimes /> : <FaCommentDots />}
      </button>


      <div className={`chat-window ${isOpen ? "open" : ""}`}>
        <div className="chat-header">
          <div className="header-info">
            <h4>Customer Support</h4>
            <span>We usually reply in a few minutes</span>
          </div>
          <button onClick={toggleChat}>
            <IoMdClose />
          </button>
        </div>

        <div className="chat-messages">
          {messages.map((msg) => (
            <div key={msg.id} className={`message ${msg.sender}`}>
              <div className="bubble">{msg.text}</div>
            </div>
          ))}
          <div ref={messagesEndRef} />
        </div>

        <form className="chat-input-area" onSubmit={handleSend}>
          <input
            type="text"
            placeholder="Type your message..."
            value={input}
            onChange={(e) => setInput(e.target.value)}
          />
          <button type="submit">
            <FaPaperPlane />
          </button>
        </form>
      </div>
    </div>
  );
};

export default ChatWidget;
