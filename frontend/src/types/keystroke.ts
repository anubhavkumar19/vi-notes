export interface KeystrokeEvent {
  key: string;
  timestamp: number;
  type: "keydown" | "keyup";
}

export interface WritingSession {
  content: string;
  keystrokes: KeystrokeEvent[];
  startTime: number;
  endTime?: number;
}