import passport from "passport";
import logger from "../utils/logger.js";

export const authJWT = passport.authenticate("jwt", {
  session: false,
});

export const authorizeRole = (...roles) => (req, res, next) => {
  if (!req.user) {
    logger.warn(
      `Unauthorized access attempt on ${req.originalUrl}`
    );

    return res.status(401).json({
      error: "No autenticado",
    });
  }

  if (!roles.includes(req.user.role)) {
    logger.warn(
      `Forbidden access: user ${req.user.email} with role ${req.user.role} tried to access ${req.originalUrl}`
    );

    return res.status(403).json({
      error: "No autorizado",
    });
  }

  logger.info(
    `Authorized access: ${req.user.email} -> ${req.originalUrl}`
  );

  next();
};