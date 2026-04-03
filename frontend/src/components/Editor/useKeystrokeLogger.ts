import { useRef } from "react";
import type { KeystrokeEvent } from "../../types/keystroke";

export const useKeystrokeLogger = () => {
  const keystrokes = useRef<KeystrokeEvent[]>([]);
  const pastedChars = useRef<number>(0);
  const backspaceCount = useRef<number>(0);

  const lastTime = useRef<number>(Date.now());
  const totalPauseTime = useRef<number>(0);
  const pauseCount = useRef<number>(0);

  const logKeyDown = (key: string) => {
    const now = Date.now();
    const diff = now - lastTime.current;

    // Detect pauses (>500ms)
    if (diff > 500) {
      totalPauseTime.current += diff;
      pauseCount.current++;
    }

    if (key === "Backspace") {
      backspaceCount.current++;
    }

    keystrokes.current.push({
      timestamp: diff,
      type: "keydown",
    });

    lastTime.current = now;
  };

  const logKeyUp = (_key: string) => {
    keystrokes.current.push({
      timestamp: Date.now(),
      type: "keyup",
    });
  };

  const logPaste = (text: string) => {
    pastedChars.current += text.length;
  };

  return {
    keystrokes,
    pastedChars,
    backspaceCount,
    totalPauseTime,
    pauseCount,
    logKeyDown,
    logKeyUp,
    logPaste,
  };
};