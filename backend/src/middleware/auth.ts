import jwt from "jsonwebtoken";

const SECRET = "secret123";

export const authMiddleware = (req: any, res: any, next: any) => {
  const token = req.headers.authorization;

  if (!token) return res.status(401).send("No token");

  try {
    const decoded = jwt.verify(token, SECRET);
    req.user = decoded;
    next();
  } catch {
    res.status(401).send("Invalid token");
  }
};