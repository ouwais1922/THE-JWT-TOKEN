const User = require('../Model/User.js')

const singUpGetController = async(req,res)=>{
    res.render('signup')
}

const loginGetController = async(req,res)=>{
    res.render('login')
}
const singUpPostController = async(req,res)=>{
    
}
const loginPostController = async(req,res)=>{
    const {email,password} = req.body
    console.log(req.body)
    res.send('login')
  
} 


module.exports = {
  singUpGetController,
  singUpPostController,
  loginGetController,
  loginPostController
}