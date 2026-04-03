import Session from "../models/Session.js";

export const saveSession = async (req: any, res: any) => {
  const session = new Session(req.body);
  await session.save();
  res.send("Session saved");
};