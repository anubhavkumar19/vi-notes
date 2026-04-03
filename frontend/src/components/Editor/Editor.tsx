// Editor.tsx - Single Navbar with Logout Button

import React, { useState } from "react";
import { useKeystrokeLogger } from "./useKeystrokeLogger";
import { saveSession } from "../../services/api";
import logo from "../../assets/logo.svg";

const Editor = () => {
  const [text, setText] = useState("");
  const [report, setReport] = useState<any>(null);
  const [isSaving, setIsSaving] = useState(false);
  const {
    keystrokes,
    pastedChars,
    backspaceCount,
    totalPauseTime,
    pauseCount,
    logKeyDown,
    logKeyUp,
    logPaste,
  } = useKeystrokeLogger();

  const handleChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setText(e.target.value);
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => logKeyDown(e.key);
  const handleKeyUp = (e: React.KeyboardEvent<HTMLTextAreaElement>) => logKeyUp(e.key);
  const handlePaste = (e: React.ClipboardEvent<HTMLTextAreaElement>) => logPaste(e.clipboardData.getData("text"));

  const generateReport = () => {
    const totalChars = text.length;
    const pasted = pastedChars.current;
    const typedChars = totalChars - pasted;
    const pastePercentage = totalChars === 0 ? 0 : (pasted / totalChars) * 100;
    const totalTimeMinutes = (Date.now() - (keystrokes.current[0]?.timestamp || Date.now())) / 60000 || 1;
    const words = text.trim().split(/\s+/).length;
    const wpm = words === 0 ? 0 : Math.round(words / totalTimeMinutes);
    const avgPause = pauseCount.current === 0 ? 0 : totalPauseTime.current / pauseCount.current;
    let plagiarismIndicator = pastePercentage;
    if (backspaceCount.current < 5) plagiarismIndicator += 10;
    if (avgPause < 200) plagiarismIndicator += 10;
    plagiarismIndicator = Math.min(plagiarismIndicator, 100);

    return {
      totalChars,
      typedChars,
      pastedChars: pasted,
      pastePercentage: pastePercentage.toFixed(2),
      wpm,
      avgPause: Math.round(avgPause),
      backspaceCount: backspaceCount.current,
      plagiarismIndicator: plagiarismIndicator.toFixed(2),
    };
  };

  const handleSave = async () => {
    setIsSaving(true);
    const sessionReport = generateReport();
    setReport(sessionReport);

    const session = {
      content: text,
      keystrokes: keystrokes.current,
      ...sessionReport,
    };

    await saveSession(session);
    setTimeout(() => setIsSaving(false), 500);
  };


  const getPlagiarismClass = (value: number) => {
    if (value < 40) return "low";
    if (value < 70) return "medium";
    return "high";
  };

  const StatCard = ({ label, value, unit = "", highlight = false }: any) => (
    <div className="stat-card">
      <span className="stat-label">{label}</span>
      <span className={`stat-value ${highlight ? "text-[var(--accent)]" : ""}`}>
        {value}{unit && <span className="text-sm opacity-60 ml-0.5">{unit}</span>}
      </span>
    </div>
  );

  return (
    <div className="flex flex-col h-screen bg-[var(--bg)] text-[var(--text)]">
      {/* Single Navbar */}
      <nav className="bg-[var(--code-bg)] border-b border-[var(--border)] px-6 py-3 flex items-center justify-between sticky top-0 z-10">
        <div className="flex items-center gap-3">
          <img src={logo} alt="logo" className="w-10 h-10 object-contain"/>
          <h2 className="text-xl font-semibold text-[var(--text-h)]">Vi-Notes Editor</h2>
        </div>
        <div className="flex items-center gap-3">
          <button
            className="bg-[var(--accent)] hover:bg-[var(--accent)]/90 text-white px-4 py-2 rounded-lg font-medium transition-all flex items-center gap-2"
            onClick={handleSave}
            disabled={isSaving}
          >
            {isSaving ? (
              <>
                <svg className="animate-spin h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg>
                Saving...
              </>
            ) : (
              <>
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7H5a2 2 0 00-2 2v9a2 2 0 002 2h14a2 2 0 002-2V9a2 2 0 00-2-2h-3m-1 4l-3 3m0 0l-3-3m3 3V4" />
                </svg>
                Save Session
              </>
            )}
          </button>
          <button
          className="bg-red-500 px-3 py-1 rounded hover:bg-red-600  h-10 w-20 text-white"
          onClick={() => {
            localStorage.removeItem("token");
            window.location.reload();
          }}
        >
          Logout
        </button>
        </div>
      </nav>

      {/* Main Content */}
      <main className="flex flex-1 overflow-hidden p-6 gap-6">
        {/* Text Editor Area */}
        <div className="flex-1 flex flex-col">
          <div className="mb-3 flex items-center justify-between">
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 rounded-full bg-[var(--success)]"></div>
              <span className="text-xs font-mono text-[var(--text)]">Ready to write</span>
            </div>
            <div className="text-xs font-mono bg-[var(--code-bg)] px-3 py-1 rounded-md border border-[var(--border)]">
              {text.length} characters
            </div>
          </div>
          <textarea
            className="w-full h-full bg-[var(--bg)] rounded-lg resize-none focus:outline-none focus:ring-2 focus:ring-[var(--accent)]/20 focus:border-[var(--accent)] text-sm font-mono placeholder:text-[var(--text)]/40 transition-all duration-200"
            value={text}
            onChange={handleChange}
            onKeyDown={handleKeyDown}
            onKeyUp={handleKeyUp}
            onPaste={handlePaste}
            placeholder="Start typing your notes here..."
          />
        </div>

        {/* Report Panel */}
        <aside className="w-96 bg-[var(--code-bg)] rounded-lg border border-[var(--border)] shadow-md overflow-y-auto flex flex-col">
          <div className="p-5 border-b border-[var(--border)]">
            <h3 className="text-lg font-semibold text-[var(--text-h)] flex items-center gap-2">
              <svg className="w-5 h-5 text-[var(--accent)]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
              </svg>
              Session Report
            </h3>
            <p className="text-xs text-[var(--text)]/60 mt-1">Typing analytics and insights</p>
          </div>

          <div className="flex-1 p-5">
            {report ? (
              <div className="space-y-4">
                <StatCard label="Typing Speed" value={report.wpm} unit="WPM" highlight />
                <StatCard label="Total Characters" value={report.totalChars} />
                <StatCard label="Typed Characters" value={report.typedChars} />
                <StatCard label="Pasted Characters" value={report.pastePercentage} unit="%" />
                <StatCard label="Average Pause" value={report.avgPause} unit="ms" />
                <StatCard label="Corrections" value={report.backspaceCount} unit="x" />

                {/* Plagiarism Indicator */}
                <div className="stat-card flex-col items-stretch gap-2">
                  <div className="flex justify-between">
                    <span className="stat-label">Originality Score</span>
                    <span className={`font-semibold text-lg ${
                      parseFloat(report.plagiarismIndicator) > 50 ? "text-[var(--error)]" : "text-[var(--success)]"
                    }`}>
                      {100 - parseFloat(report.plagiarismIndicator)}%
                    </span>
                  </div>
                  <div className="plagiarism-bar">
                    <div
                      className={`plagiarism-fill ${getPlagiarismClass(parseFloat(report.plagiarismIndicator))}`}
                      style={{ width: `${report.plagiarismIndicator}%` }}
                    />
                  </div>
                  <div className="flex justify-between text-xs text-[var(--text)]/50">
                    <span>Original</span>
                    <span>Modified</span>
                    <span>Copied</span>
                  </div>
                </div>

                {/* Quick Insight */}
                <div className="mt-4 p-3 rounded-lg bg-(--accent-light) border border-(--accent-border)">
                  <div className="flex items-center gap-2 mb-2">
                    <svg className="w-4 h-4 text-(--accent)" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                    <span className="text-xs font-semibold uppercase tracking-wider text-(--accent)">Insight</span>
                  </div>
                  <p className="text-sm text-[var(--text-h)]">
                    {parseFloat(report.plagiarismIndicator) > 70
                      ? "High similarity detected. Consider adding more original content."
                      : parseFloat(report.plagiarismIndicator) > 40
                      ? "Moderate originality. Good mix of typing and pasting."
                      : "Excellent originality! Your authentic voice shines through."}
                  </p>
                </div>
              </div>
            ) : (
              <div className="flex flex-col items-center justify-center h-full text-center py-12">
                <div className="w-16 h-16 rounded-full bg-[var(--accent-light)] flex items-center justify-center mb-4">
                  <svg className="w-8 h-8 text-[var(--accent)]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                  </svg>
                </div>
                <p className="text-[var(--text)]/60 text-sm">No session saved yet</p>
                <p className="text-xs text-[var(--text)]/40 mt-1">Click "Save Session" to generate analytics</p>
              </div>
            )}
          </div>
        </aside>
      </main>
    </div>
  );
};

export default Editor;