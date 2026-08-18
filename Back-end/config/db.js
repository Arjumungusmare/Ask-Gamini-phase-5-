const mongoose = require("mongoose");

const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URI);
    console.log("MongoDB server connected successfully");

  } 
  
  catch (error) {
    console.log(error);
    console.log("MongoDB server connection Not connected:");
  }
};
module.exports = connectDB;