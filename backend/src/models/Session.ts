import mongoose from "mongoose";

const sessionSchema = new mongoose.Schema({
  content: String,
  keystrokes: Array,
  pastedChars: Number,
  pastePercentage: Number,
});

export default mongoose.model("Session", sessionSchema);