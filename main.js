import dotenv from "dotenv";
import express from "express";
import passport from "passport";
import session from "express-session";
import dbCon from "./src/libs/db.js";
import authRoute from "./src/routes/authRoute.js";
import userRoute from "./src/routes/userRoute.js";
import categoryRoute from "./src/routes/categoryRoute.js";
import reviewRoute from "./src/routes/reviewRoute.js";
import product from "./src/routes/productRoute.js";
import cookieParser from "cookie-parser";
import swaggerDocs from "./src/servicess/swagger.js";
import "./src/servicess/emailConfig.js";
import "./src/servicess/passport.js";

dotenv.config();
dbCon();

const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
swaggerDocs(app);

//*****************Routes********************
app.get("/", (req, res) => {
  res.send("API is running...");
});
app.use(
  session({
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: true,
  })
);
app.use(passport.initialize());
app.use(passport.session());
passport.serializeUser((user, done) => {
  done(null, user);
});

passport.deserializeUser((user, done) => {
  done(null, user);
});

app.use("/api/v1/auth", authRoute);
app.use("/api/v1/user", userRoute);
app.use("/api/v1/product", product);
app.use("/api/v1/category", categoryRoute);
app.use("/api/v1/review", reviewRoute);
app.use("/uploads", express.static("uploads"));

const PORT = process.env.PORT || 5000;

app.listen(PORT, () =>
  console.log(`server is running of port : http://localhost:${PORT}`)
);
