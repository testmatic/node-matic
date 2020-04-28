const mongoose = require("mongoose");

const dbRoute =
  "mongodb+srv://fabianzul:Cafazual-30@cluster0-epbcl.mongodb.net/mongo-matic?retryWrites=true&w=majority";

const options = {
  useNewUrlParser: true,
  useUnifiedTopology: true,
};

mongoose.connect(dbRoute, options).then(
  () => {
    console.log("Database connection established!");
  },
  (err) => {
    console.log("Error connecting Database instance due to: ", err);
  }
);


// require any models
require("../models/Grant");
