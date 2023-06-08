const mongoose = require('mongoose');
const { Schema } = mongoose;
const {isEmail} = require('validator')
const bcrypt = require('bcrypt');

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

userSchema.pre('save', async function(next){
  const salt = await bcrypt.genSalt();
  this.password = await bcrypt.hash(this.password,salt);
  next();
})


const User =  mongoose.model('User', userSchema);
module.exports = User;