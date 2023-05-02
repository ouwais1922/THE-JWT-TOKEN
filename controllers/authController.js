const singUpGetController = async(req,res)=>{
    res.render('signup')
}
const singUpPostController = async(req,res)=>{
    res.send("sign up controller")
}
const loginGetController = async(req,res)=>{
    res.render('login')
}
const loginPostController = async(req,res)=>{
    res.send("Login controller")
}

module.exports = {
  singUpGetController,
  singUpPostController,
  loginGetController,
  loginPostController
}