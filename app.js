const express = require('express');
const dotenv = require("dotenv");
const mongoose = require('mongoose');
const cookieParser = require('cookie-parser');
const winston = require('winston');
const { mongodbConnect } = require('./Model/database');
const authRouter = require('./routes/authRoutes.js');
const {requireAuth} = require('./middleware/requireAuth.js')


const app = express();
dotenv.config();
// middleware
app.use(express.static('public'));
app.use(express.json());
app.use(cookieParser());

// view engine
app.set('view engine', 'ejs');
dotenv.config();

// in case someting is going wrong in MONGODB
mongoose.connection.on("disconnected", () => {
  console.log("mongoDB diconnected");
});
// in case somthing is going wrong in MONGODB and we get to rcover the problem
mongoose.connection.on("connected", () => {
  console.log("mongoDB is connected");
});


// routes
app.get('/', (req, res) => res.render('home'));
app.get('/smoothies',requireAuth,(req, res) => res.render('smoothies'));
app.use(authRouter)

const logger = winston.createLogger({
  level: 'info',
  format: winston.format.combine(
    winston.format.timestamp(),
    winston.format.printf(({ level, message, timestamp }) => {
      return `[${timestamp}] ${level}: ${message}`;
    })
  ),
  transports: [
    new winston.transports.File({ filename: './logs/logs.log' })
  ]
});



app.listen(process.env.PORT, () => {
  mongodbConnect();
  console.log("The server is connected to port: 5000 ....");
})