import passport from "passport";
import logger from "../utils/logger.js";

/* AUTH JWT */
export const authJWT = passport.authenticate("jwt", {
  session: false,
});

/* ROLE AUTHORIZATION */
export const authorizeRole = (...roles) => {
  return (req, res, next) => {
    try {

      // USER NOT AUTHENTICATED
      if (!req.user) {
        logger.warn(
          `Unauthorized access attempt on ${req.originalUrl}`
        );

        return res.status(401).json({
          status: "error",
          error: "No autenticado",
        });
      }

      // ROLE NOT ALLOWED
      if (!roles.includes(req.user.role)) {
        logger.warn(
          `Forbidden access: ${req.user.email} (${req.user.role}) -> ${req.originalUrl}`
        );

        return res.status(403).json({
          status: "error",
          error: "No autorizado",
        });
      }

      // ACCESS GRANTED
      logger.info(
        `Authorized access: ${req.user.email} -> ${req.originalUrl}`
      );

      next();

    } catch (error) {

      logger.error(
        `Authorization middleware error: ${error.message}`
      );

      return res.status(500).json({
        status: "error",
        error: "Error interno del servidor",
      });
    }
  };
};