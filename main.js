import express from "express";
import dotenv from "dotenv";
import dbCon from "./src/libs/db.js";
import authRoute from "./src/routes/authRoute.js";
import userRoute from "./src/routes/userRoute.js"
import product from "./src/routes/productRoute.js"
import cookieParser from "cookie-parser";
import './src/servicess/emailConfig.js'

dotenv.config();
dbCon();



const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser())

//*****************Routes********************

app.use("/api/v1/auth", authRoute);
app.use('/api/v1/user',userRoute);
app.use("/api/v1/product",product)
app.use("/uploads", express.static("uploads"));


const PORT = process.env.PORT || 5000;

app.listen(PORT, () =>
  console.log(`server is running of port : http://localhost:${PORT}`)
);
