const mongoose = require('mongoose');
const { Schema } = mongoose;

const userSchema = new Schema({
  email: {
    type: String,
    required: true,
    unique: true,
    lowercase:true
  },
  password: {
    type: String,
    required: true,
    minlength:6
  },
});

const User =  mongoose.model('User', userSchema);
module.exports = User;