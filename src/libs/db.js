import mongoose from "mongoose";

const dbCon = async () => {
  try {
    await mongoose.connect(process.env.DB_URL);
    console.log("mongodb connected successful...");
  } catch (err) {
    console.log("error while connecting on mongodb...", err);
  }
};
export default dbCon;
