import { useRef } from "react";
import type { KeystrokeEvent } from "../../types/keystroke";

export const useKeystrokeLogger = () => {
  const keystrokes = useRef<KeystrokeEvent[]>([]);
  const startTime = useRef<number>(Date.now());

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

  const getSessionData = () => {
    return {
      keystrokes: keystrokes.current,
      startTime: startTime.current,
      endTime: Date.now(),
    };
  };

  return {
    logKeyDown,
    logKeyUp,
    getSessionData,
  };
};