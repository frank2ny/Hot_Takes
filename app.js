const express =require('express');
const path=require('path');
const bodyParser = require('body-parser');
const mongoose=require('mongoose');
 const sauceRoutes=require('./routes/source');
 const userRoutes = require('./routes/user');
 const app=express();
app.use(bodyParser.json());
mongoose.connect('mongodb+srv://hottake:wjZSFxT4xkRoZAXa@cluster0-2onig.mongodb.net/test?retryWrites=true',{ useNewUrlParser: true })
.then(()=>{
console.log('successfuly connected');
})
.catch((error)=>{
  console.log('unable to connect');
  console.error(error);
});

app.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content, Accept, Content-Type, Authorization');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, PATCH, OPTIONS');
  next();
});


app.use('/images',express.static(path.join(__dirname,'images')));
app.use('/api/sauces', sauceRoutes);
app.use('/api/auth', userRoutes);
module.exports=app;
//wjZSFxT4xkRoZAXa