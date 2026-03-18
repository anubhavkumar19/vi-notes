import React, { useState } from "react";
import "./Editor.css";
import { useKeystrokeLogger } from "./useKeystrokeLogger";

const Editor: React.FC = () => {
  const [text, setText] = useState("");
  const { logKeyDown, logKeyUp, getSessionData } = useKeystrokeLogger();

  const handleChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setText(e.target.value);
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    logKeyDown(e.key);
  };

  const handleKeyUp = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    logKeyUp(e.key);
  };

  const handleSave = () => {
    const session = {
      content: text,
      ...getSessionData(),
    };

    console.log("Session Data:", session);

    // TEMP: store locally
    localStorage.setItem("vi_notes_session", JSON.stringify(session));

    alert("Session saved!");
  };

  return (
    <div className="editor-container">
      <textarea
        className="editor"
        placeholder="Start writing..."
        value={text}
        onChange={handleChange}
        onKeyDown={handleKeyDown}
        onKeyUp={handleKeyUp}
      />

      <button className="save-btn" onClick={handleSave}>
        Save Session
      </button>
    </div>
  );
};

export default Editor;