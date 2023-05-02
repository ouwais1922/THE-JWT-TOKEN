const express = require('express');
const  dotenv =  require("dotenv")
const mongoose = require('mongoose');
const authRoute = require('./routes/authRoutes.js');

const app = express();
dotenv.config();
// middleware
app.use(express.static('public'));

// view engine
app.set('view engine', 'ejs');

// database connection
// const dbURI = 'mongodb+srv://shaun:test1234@cluster0.del96.mongodb.net/node-auth';
// mongoose.connect(dbURI, { useNewUrlParser: true, useUnifiedTopology: true, useCreateIndex:true })
//   .then((result) => app.listen(3000))
//   .catch((err) => console.log(err));
dotenv.config();

const connect = async()=>{

    try{

      await mongoose.connect("mongodb+srv://ouwais:ouwais@cluster0.03ljqwa.mongodb.net/?retryWrites=true&w=majority");
      console.log("Connect to mongodb!!");  

    }catch(err){
      console.log(err);
    }
}

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
app.get('/smoothies', (req, res) => res.render('smoothies'));
app.use(authRoute);

app.listen(3000,()=>{
  connect();
  console.log("The server is connected to port: 5000 ....");
})