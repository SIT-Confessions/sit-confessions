import config from "config";
import jwt from "jsonwebtoken";
import rateLimit from "express-rate-limit";
import { MASTER } from "../constants/roles.js";

/**
 * Checks if jwt token is present
 */
export default (req, res, next) => {
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
    next();
  } catch (err) {
    res.status(401).json({ msg: "Token is not valid" });
  }
};

/**
 * Checks if jwt token is present and role is master
 */
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

/**
 * Limits the number of login attempts from the same ip
 * address to 5 within a 15 min window
 */
export const loginLimiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 5,
  message:
    "Too many login attempts from this IP, please try again after 15 mins.",
});
