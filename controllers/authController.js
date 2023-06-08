const User = require('../Model/User.js')

const singUpGetController = async(req,res)=>{
    res.render('signup')
}

const loginGetController = async(req,res)=>{
    res.render('login')
}
const singUpPostController = async(req,res)=>{
    const {email,password} = req.body;
    try{
        const user = await User.create({email,password});
        res.status(201).json(user.email);
    }catch(err){
        console.log(err);
        res.status(404).send('Error, user is not created');
    }
}
const loginPostController = async(req,res)=>{
    res.send('login')
} 

module.exports = {
  singUpGetController,
  singUpPostController,
  loginGetController,
  loginPostController
}