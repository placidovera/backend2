import { Router } from "express";
import passport from "passport";

const router = Router();

router.get("/current",passport.authenticate("jwt", { session: false }),(req, res) => {

  const token = req.cookies.token;

    res.json({
      message: "usuario autenticado",
      token,
      user: req.user
    });
  }
);

export default router;
