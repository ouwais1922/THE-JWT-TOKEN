const User = require('../Model/User.js');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');

const hadnleError = (err) => {
    // console.log(err.message,err.code);
    let errors = { email: '', password: '' }
    if(err.message === 'incorrect email'){
        errors.email = 'The email is not registred yet'
    }
    if(err.message === 'incorrect password'){
        errors.password = 'The password is not correct'
    }
    if (err.code === 11000) {
        errors['email'] = 'Email already exist';
        return errors;
    }
    if (err.message.includes('User validation failed')) {
        Object.values(err.errors).forEach(({ properties }) => {
            errors[properties.path] = properties.message
        })
    }
    return errors;
}

const maxAge = 3 * 24 * 60 * 60;
const createToken = (id) => {
    const token = jwt.sign({ id }, 'ouwais Zlaigi', {
        expiresIn: maxAge
    })
    return token;
}

const singUpGetController = async (req, res) => {
    res.render('signup')
}

const loginGetController = async (req, res) => {
    res.render('login')

}
const singUpPostController = async (req, res) => {
    const { email, password } = req.body;
    try {
        const user = await User.create({ email, password });
        const token = createToken(user._id);
        res.cookie('jwt', token, { httpOnly: true, maxAge: maxAge * 1000 });
        res.status(201).json({ user: user._id });
    } catch (err) {
        const errors = hadnleError(err);
        res.status(400).json({ errors });
    }
}

const loginHelper = async (email, password) => {

    const user = await User.findOne({ email });
    if (user) {
        const auth = bcrypt.compare(password, user.password);
        if (auth) {
            return user;
        } throw Error('Incorrect Password')
    } throw Error('Incorrect Email');
}

const loginPostController = async (req, res) => {

    const { email, password } = req.body;

    try {
        const user = await User.login(email, password);
        const token = createToken(user._id);
        res.cookie('jwt', token, { httpOnly: true, maxAge: maxAge * 1000 });
        res.status(200).json({ user: user._id });
    } catch (err) {
        const errors = hadnleError(err);
        // console.log(errors);
        res.status(400).json({errors});
    }
}

const midFunction = ()=>{

    console.log("hello world");

}

module.exports = {
    singUpGetController,
    singUpPostController,
    loginGetController,
    loginPostController,
    midFunction
}