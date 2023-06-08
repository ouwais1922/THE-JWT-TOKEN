const User = require('../Model/User.js')

const hadnleError = (err)=>{
    //console.log(err.message,err.code);
    let errors = {email : '', password: ''}
    if(err.code === 11000){
        errors['email'] = 'Email already exist';
        return errors;
    }
    if(err.message.includes('User validation failed')){
        // console.log(Object.values(err.errors));
        Object.values(err.errors).forEach(({properties})=>{
            errors[properties.path] = properties.message
        })
    }
    return errors;
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
        res.status(201).json(user);
    }catch(err){
       const errors =  hadnleError(err);
        res.status(404).send({errors});
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