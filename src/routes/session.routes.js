import { Router } from "express";
import passport from "passport";
import logger from "../utils/logger.js";

const router = Router();

router.get(
  "/current",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    logger.info(
      `Current session requested by: ${req.user.email}`
    );

    res.json({
      first_name: req.user.first_name,
      email: req.user.email,
      role: req.user.role,

    });
  }
);

export default router;