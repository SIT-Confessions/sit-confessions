import jwt from "jsonwebtoken";
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
    const decoded = jwt.verify(token, process.env.JWTSECRET);
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
    const decoded = jwt.verify(token, process.env.JWTSECRET);
    req.user = decoded.user;

    if (req.user.role !== MASTER) {
      res.status(401).json({ msg: "Role not authorised" });
    }

    next();
  } catch (err) {
    res.status(401).json({ msg: "Token is not valid" });
  }
};
