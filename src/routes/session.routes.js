import { Router } from "express";
import passport from "passport";

const router = Router();

router.get(
  "/current",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    res.json({
      first_name: req.user.first_name,
      email: req.user.email,
      role: req.user.role
    });
  }
);


export default router;
