const mongoose = require('mongoose');
const mongodbConnect = async () => {

  try {

    await mongoose.connect(process.env.MONGODB, { useUnifiedTopology: true, useNewUrlParser: true });
    console.log("Connect to mongodb!!");

  } catch (err) {
    console.log(err);
  }
}

module.exports = { mongodbConnect }