const User = require('../Model/User.js')

const singUpGetController = async(req,res)=>{
    res.render('signup')
}
const singUpPostController = async(req,res)=>{
    // const {email,password} = req.body;
    try{
        // const user = await User.create(req.body);
        const user = new User(req.body);
        const saveUser = await user.save();
        res.status(200).json(saveUser);
    }catch(err){
        console.log(err);
        res.status(401).send('User is not created!');
    }
}
const loginGetController = async(req,res)=>{
    res.render('login')
}
const loginPostController = async(req,res)=>{
    console.log(req.body);
    const {email,password, ...rest} = req.body;
    console.log(rest);
    res.send("Login controller")
} 
// const bookBasedOnAvailibiliy = async(req,res)=>{
//     try{

//         const newBook = new Book(req.body);
//         const saveBook = await newBook.save();
//         res.status(200).json(saveBook);
//     }catch(err){
//         console.log(err);
//     }
// }

module.exports = {
  singUpGetController,
  singUpPostController,
  loginGetController,
  loginPostController
}