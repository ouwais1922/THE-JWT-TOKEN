const mongoose = require('mongoose');
const { Schema } = mongoose;
const {isEmail} = require('validator')

const userSchema = new Schema({
  email: {
    type: String,
    required: [true,'Please enter an email'],
    unique: true,
    lowercase:true,
    validate:[isEmail,'Please enter a valid email'],
  },
  password: {
    type: String,
    required: [true,'Please enter your password'],
    minlength:[6,'Minimun password length is 6 charachters']
  },
});

const User =  mongoose.model('User', userSchema);
module.exports = User;