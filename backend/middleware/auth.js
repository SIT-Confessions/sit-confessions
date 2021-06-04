import config from "config";
import jwt from "jsonwebtoken";
import rateLimit from "express-rate-limit";
import { MASTER } from "../constants/roles.js";

export default (req, res, next) => {
  // Get token from header
  const token = req.header("x-auth-token");

  // Check if no token
  if (!token) {
    return res.status(401).json({ msg: "No token, authorisation denied" });
  }

  // Verify token
  try {
    jwt.verify(token, config.get("jwtSecret"), (err, decoded) => {
      if (err) {
        return res.status(401).json(err);
      }
      req.user = decoded.user;
    });
    next();
  } catch (err) {
    res.status(401).json({ msg: "Token is not valid" });
  }
};

export const master = (req, res, next) => {
  // Get token from header
  const token = req.header("x-auth-token");

  // Check if no token
  if (!token) {
    return res.status(401).json({ msg: "No token, authorisation denied" });
  }

  // Verify token
  try {
    const decoded = jwt.verify(token, config.get("jwtSecret"));
    req.user = decoded.user;
    console.log(decoded);

    if (req.user.role !== MASTER) {
      res.status(401).json({ msg: "Role not authorised" });
    }

    next();
  } catch (err) {
    res.status(401).json({ msg: "Token is not valid" });
  }
};

export const loginLimiter = rateLimit({
  windowMs: 60 * 60 * 1000, // 1 hour window
  max: 5, // start blocking after 5 requests
  message:
    "Too many login attempts from this IP, please try again after an hour",
});
