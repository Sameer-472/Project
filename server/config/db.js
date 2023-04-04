const mongoose = require("mongoose");
const MONGO_URL = process.env.MONGO_URL;
const MONGO_DB = process.env.MONGO_DB;

const connectDB = async () => {
  try {
    mongoose.set("strictQuery", false);
    await mongoose.connect(
      `${MONGO_URL}${MONGO_DB}?retryWrites=true&w=majority`,
      {
        useNewUrlParser: true,
        useUnifiedTopology: true,
      }
    );
    console.log("\u001b[" + 34 + "m" + `Connected to Database` + "\u001b[0m");
  } catch (error) {
    console.log(error);
    console.error(error.message);
    // exit process with failure
    process.exit(1);
  }
};
module.exports = connectDB;
