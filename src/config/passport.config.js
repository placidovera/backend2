import passport from "passport";
import { Strategy as JwtStrategy, ExtractJwt } from "passport-jwt";
import { User } from "../models/user.model.js";

const cookieExtractor = req => req?.cookies?.token || null;

const initializePassport = () => {
  passport.use(
    "jwt",
    new JwtStrategy(
      {
        jwtFromRequest: ExtractJwt.fromExtractors([
          cookieExtractor,                   
          ExtractJwt.fromAuthHeaderAsBearerToken() 
        ]),
        secretOrKey: process.env.JWT_SECRET
      },
      async (payload, done) => {
        try {
          const user = await User.findById(payload.id).select("-password");
          if (!user) return done(null, false);
          return done(null, user);
        } catch (error) {
          return done(error, false);
        }
      }
    )
  );
};

export default initializePassport;
