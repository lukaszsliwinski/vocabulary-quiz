const mongoose = require('mongoose');
require('dotenv').config();

// connect to MondgoDB database
async function dbConnect() {
  mongoose.set('strictQuery', true);
  mongoose
    .connect(process.env.DB_URL, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => console.log('connected to db'))
    .catch((error) => {
      console.log('unable to connect to db');
      console.error(error);
    });
}

module.exports = dbConnect;
