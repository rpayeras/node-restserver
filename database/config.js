const mongoose = require("mongoose");

const dbConnection = async () => {
  try {
    await mongoose.connect(process.env.DB_URL, {
      useUnifiedTopology: true,
    });

    console.log("Connected to database");
  } catch (err) {
    console.log(err);
    throw new Error("Error connecting to database");
  }
};

module.exports = {
  dbConnection,
};
