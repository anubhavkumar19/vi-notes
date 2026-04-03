import User from "../models/User.js";
import jwt from "jsonwebtoken";

const SECRET = "secret123"; // later move to .env

export const register = async (req: any, res: any) => {
  const user = new User(req.body);
  await user.save();
  res.send("User created");
};

export const login = async (req: any, res: any) => {
  const user = await User.findOne(req.body);

  if (!user) return res.status(401).send("Invalid credentials");

  const token = jwt.sign({ id: user._id }, SECRET, { expiresIn: "1d" });

  res.json({ token });
};