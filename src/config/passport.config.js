import passport from "passport";
import { Strategy as JwtStrategy, ExtractJwt } from "passport-jwt";
import { User } from "../models/user.model.js";
import logger from "../utils/logger.js";

const cookieExtractor = (req) => req?.cookies?.token || null;

const initializePassport = () => {
  logger.info("Initializing Passport JWT Strategy");

  passport.use(
    "jwt",
    new JwtStrategy(
      {
        jwtFromRequest: ExtractJwt.fromExtractors([
          cookieExtractor,
          ExtractJwt.fromAuthHeaderAsBearerToken(),
        ]),
        secretOrKey: process.env.JWT_SECRET,
      },
      async (payload, done) => {
        try {
          logger.info(`JWT auth attempt for user id: ${payload.id}`);

          const user = await User.findById(payload.id).select("-password");

          if (!user) {
            logger.warn(`User not found for id: ${payload.id}`);

            return done(null, false);
          }

          logger.info(`Authenticated user: ${user.email}`);

          return done(null, user);
        } catch (error) {
          logger.error(`Passport JWT error: ${error.message}`);

          return done(error, false);
        }
      }
    )
  );
};

export default initializePassport;