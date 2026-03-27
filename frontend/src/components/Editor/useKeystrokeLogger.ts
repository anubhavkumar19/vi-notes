import { useRef } from "react";
import type { KeystrokeEvent } from "../../types/keystroke";

export const useKeystrokeLogger = () => {
  const keystrokes = useRef<KeystrokeEvent[]>([]);
  const startTime = useRef<number>(Date.now());

  const pastedChars = useRef<number>(0);

  const logKeyDown = (key: string) => {
    keystrokes.current.push({
      key,
      timestamp: Date.now(),
      type: "keydown",
    });
  };

  const logKeyUp = (key: string) => {
    keystrokes.current.push({
      key,
      timestamp: Date.now(),
      type: "keyup",
    });
  };

  const logPaste = (text: string) => {
    pastedChars.current += text.length;
  };

  const getSessionData = () => {
    return {
      keystrokes: keystrokes.current,
      pastedChars: pastedChars.current,
      startTime: startTime.current,
      endTime: Date.now(),
    };
  };

  return {
    logKeyDown,
    logKeyUp,
    logPaste,
    getSessionData,
    pastedChars,
  };
};