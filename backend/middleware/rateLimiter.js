import rateLimit from "express-rate-limit";

/**
 * Limits the number of login attempts from the same ip
 * address to 5 within a 15 min window
 */
export const loginLimiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  skipSuccessfulRequests: true,
  max: 5,
  handler: (req, res) => {
    res.status(429).json({
      errors: [
        {
          msg: "We have detected too many login attempts from this IP, please try again after 15 minutes.",
        },
      ],
    });
  },
});

/**
 * Limits the number of api request from ip
 * address to 500 within a 15 min window
 */
export const longLimiter = rateLimit({
  max: 500,
  windowMs: 15 * 60 * 1000,
  message: "Too many request from this IP",
});
