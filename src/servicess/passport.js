import passport from "passport";
import { Strategy as GoogleStrategy } from "passport-google-oauth20";
import { Strategy as GitHubStrategy } from "passport-github";
import AuthModel from "../models/authModel.js";
import dotenv from "dotenv";
dotenv.config();

// ======================= Google Strategy =======================
passport.use(
  new GoogleStrategy(
    {
      clientID: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
      callbackURL: process.env.GOOGLE_CALLBACK_URL,
    },
    async (accessToken, refreshToken, profile, done) => {
      try {
        const existingUser = await AuthModel.findOne({ email: profile.emails[0].value });
        if (existingUser) {
          existingUser.accessToken = accessToken;
          existingUser.refreshToken = refreshToken;
          return done(null, existingUser);
        }
        const newUser = await AuthModel.create({
          name: profile.displayName,
          email: profile.emails[0].value,
          password: process.env.SESSION_SECRET,
          img: profile.photos[0].value,
          isAuth: true,
          accessToken,
          refreshToken,
        });
        done(null, newUser);
      } catch (err) {
        done(err, false);
      }
    }
  )
);

// ======================= GitHub Strategy =======================
passport.use(
  new GitHubStrategy(
    {
      clientID: process.env.GITHUB_CLIENT_ID,
      clientSecret: process.env.GITHUB_CLIENT_SECRET,
      callbackURL: process.env.GITHUB_CALLBACK_URL,
    },
    async (accessToken, refreshToken, profile, done) => {
      try {
        const email = profile.emails?.[0]?.value || `${profile.username}@github.com`;
        let user = await AuthModel.findOne({ email });

        if (user) {
          user.accessToken = accessToken;
          user.refreshToken = refreshToken;
          return done(null, user);
        }

        const newUser = await AuthModel.create({
          name: profile.displayName || profile.username,
          email,
          password: process.env.SESSION_SECRET,
          img: profile.photos?.[0]?.value,
          isAuth: true,
          accessToken,
          refreshToken,
        });

        return done(null, newUser);
      } catch (err) {
        done(err, false);
      }
    }
  )
);

// ======================= Session Handling =======================
passport.serializeUser((user, done) => {
  done(null, user);
});

passport.deserializeUser((user, done) => {
  done(null, user);
});
