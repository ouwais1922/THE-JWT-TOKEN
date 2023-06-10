const User = require('../Model/User.js');
const jwt = require('jsonwebtoken');

const hadnleError = (err)=>{
    //console.log(err.message,err.code);
    let errors = {email : '', password: ''}
    if(err.code === 11000){
        errors['email'] = 'Email already exist';
        return errors;
    }
    if(err.message.includes('User validation failed')){
        Object.values(err.errors).forEach(({properties})=>{
            errors[properties.path]  = properties.message
        })
    }
    return errors;
}

const maxAge = 3 * 24 * 60 * 60;
const createToken = (id) =>{
    const token = jwt.sign({id},'ouwais Zlaigi',{
        expiresIn: maxAge
    }) 
    return token;
}

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
        const token = createToken(user._id);
        res.cookie('JWT',token, {httpOnly: true, maxAge: maxAge * 1000});
        res.status(201).json({user: user._id});
    }catch(err){
       const errors =  hadnleError(err);
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