const mongoose = require("mongoose");

const dbRoute = process.env.MONGODB_URL;
//const dbRoute = "mongodb+srv://fabianzul:Cafazual-30@cluster0-epbcl.mongodb.net/mongo-matic?retryWrites=true&w=majority";

const options = {
  useNewUrlParser: true,
  useUnifiedTopology: true,
};

const connectDB = async () => {
  try {
    await mongoose.connect(dbRoute, options).then(
      () => {
        console.log("Database connection established!");
      },
      (err) => {
        console.log("Error connecting Database instance due to: ", err);
      }
    );
  } catch (err) {
    console.error(err.message);
    process.exit(1);
  }
};

connectDB()

// require any models
require("../models/Grant");
