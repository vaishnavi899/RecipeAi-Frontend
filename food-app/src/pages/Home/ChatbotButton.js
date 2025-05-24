import React, { useState } from "react";

const ChatbotButton = () => {
  const [open, setOpen] = useState(false);
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState("");

  const sendMessage = async () => {
    if (!input.trim()) return;

    const userMessage = { type: "user", text: input };
    setMessages((prev) => [...prev, userMessage]);

    try {
      const res = await fetch("http://localhost:5000/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ message: input })
      });

      const data = await res.json();
      const botMessage = { type: "bot", text: data.reply };
      setMessages((prev) => [...prev, botMessage]);
    } catch (err) {
      setMessages((prev) => [
        ...prev,
        { type: "bot", text: "Error reaching server." }
      ]);
    }

    setInput("");
  };

  return (
    <>
      <button
        onClick={() => setOpen(!open)}
        style={{
          position: "fixed",
          bottom: 20,
          right: 20,
          width: 60,
          height: 60,
          borderRadius: "50%",
          backgroundColor: "#FF6B6B",
          color: "white",
          fontSize: 30,
          border: "none",
          cursor: "pointer",
          zIndex: 1000,
          boxShadow: "0 4px 8px rgba(0, 0, 0, 0.2)",
          transition: "all 0.3s ease",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          ":hover": {
            transform: "scale(1.1)",
            backgroundColor: "#FF5252"
          }
        }}
      >
        🍔
      </button>

      {open && (
        <div
          style={{
            position: "fixed",
            bottom: 90,
            right: 20,
            width: 350,
            height: 500,
            backgroundColor: "#FFF9F2",
            border: "1px solid #FFD3B6",
            borderRadius: "15px",
            boxShadow: "0 8px 16px rgba(0,0,0,0.1)",
            display: "flex",
            flexDirection: "column",
            zIndex: 1000,
            overflow: "hidden"
          }}
        >
          <div
            style={{
              padding: "15px",
              backgroundColor: "#FF6B6B",
              color: "white",
              fontWeight: "bold",
              textAlign: "center",
              borderTopLeftRadius: "15px",
              borderTopRightRadius: "15px"
            }}
          >
            "Marie Plans. You Plate."
          </div>
          <div
            style={{
              padding: "15px",
              flexGrow: 1,
              overflowY: "auto",
              display: "flex",
              flexDirection: "column",
              gap: "10px"
            }}
          >
            {messages.length === 0 ? (
              <div
                style={{
                  textAlign: "center",
                  color: "#888",
                  marginTop: "auto",
                  marginBottom: "auto"
                }}
              >
                Ask me about recipes, ingredients, or food recommendations!
              </div>
            ) : (
              messages.map((msg, index) => (
                <div
                  key={index}
                  style={{
                    alignSelf: msg.type === "user" ? "flex-end" : "flex-start",
                    maxWidth: "80%",
                    padding: "10px 15px",
                    borderRadius: msg.type === "user" 
                      ? "15px 5px 15px 15px" 
                      : "5px 15px 15px 15px",
                    backgroundColor: msg.type === "user" ? "#FFD3B6" : "#FF6B6B",
                    color: msg.type === "user" ? "#333" : "white",
                    boxShadow: "0 2px 4px rgba(0,0,0,0.1)"
                  }}
                >
                  {msg.text}
                </div>
              ))
            )}
          </div>
          <div 
            style={{ 
              display: "flex", 
              borderTop: "1px solid #FFD3B6",
              padding: "10px",
              backgroundColor: "#FFF"
            }}
          >
            <input
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && sendMessage()}
              placeholder="Ask about food..."
              style={{
                flexGrow: 1,
                padding: "12px",
                border: "1px solid #FFD3B6",
                borderRadius: "25px",
                outline: "none",
                marginRight: "10px",
                ":focus": {
                  borderColor: "#FF6B6B"
                }
              }}
            />
            <button
              onClick={sendMessage}
              style={{
                backgroundColor: "#FF6B6B",
                color: "white",
                border: "none",
                borderRadius: "50%",
                width: "40px",
                height: "40px",
                cursor: "pointer",
                transition: "all 0.2s",
                ":hover": {
                  backgroundColor: "#FF5252",
                  transform: "scale(1.05)"
                }
              }}
            >
              →
            </button>
          </div>
        </div>
      )}
    </>
  );
};

export default ChatbotButton;