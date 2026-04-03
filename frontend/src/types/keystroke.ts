export interface KeystrokeEvent {
  timestamp: number;
  type: "keydown" | "keyup";
}

export interface SessionData {
  content: string;
  keystrokes: KeystrokeEvent[];
  pastedChars: number;
  pastePercentage: number;
}