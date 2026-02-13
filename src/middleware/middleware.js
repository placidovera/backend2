import passport from "passport";

export const authJWT = passport.authenticate("jwt", { session: false });

export const authorizeRole = (...roles) => (req, res, next) => {
  if (!req.user) return res.status(401).json({ error: "No autenticado" });
  if (!roles.includes(req.user.role)) return res.status(403).json({ error: "No autorizado" });
  next();
};