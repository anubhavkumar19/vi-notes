import React, { useState } from "react";
import "./Editor.css";
import { useKeystrokeLogger } from "./useKeystrokeLogger";

const Editor: React.FC = () => {
  const [text, setText] = useState("");
  const { logKeyDown, logKeyUp,logPaste, getSessionData, pastedChars } = useKeystrokeLogger();
  const [savedData, setSavedData] = useState<any>(null);

  const handleChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setText(e.target.value);
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    logKeyDown(e.key);
  };

  const handleKeyUp = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    logKeyUp(e.key);
  };

  const handlePaste = (e: React.ClipboardEvent<HTMLTextAreaElement>) => {
    const pastedText = e.clipboardData.getData("text");
    logPaste(pastedText);
  };

  const getPastePercentage = () => {
    if (text.length === 0) return 0;
    return ((pastedChars.current / text.length) * 100).toFixed(2);
  };

  const handleSave = () => {
    const session = {
      content: text,
      pastePercentage: getPastePercentage(),
      ...getSessionData(),
    };

    console.log("Session Data:", session);

    localStorage.setItem("vi_notes_session", JSON.stringify(session));

    setSavedData(session);
    
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
        onPaste={handlePaste}
      />

      <button className="save-btn" onClick={handleSave}>
        Save Session
      </button>

      {savedData && (
        <div className="results">
          <div className="stats">
            Pasted Content: {getPastePercentage()}%
          </div>
          <h3>Saved Data</h3>
          <pre>{JSON.stringify(savedData,null,2)}</pre>
        </div>
      )}
    </div>
  );
};

export default Editor;