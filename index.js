const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose')
const routes = require('./routes/index')
require('dotenv').config();

const app = express();


app.use(cors())
app.use(express.json())
app.use(express.urlencoded({extended : true}))

app.use(function(req,res,next){
    res.setHeader('Access-Control-Allow-Origin','*');
    res.setHeader('Access-Control-Allow-Methods','POST, OPTIONS, PATCH');
    next();
});

//const url = 'mongodb://localhost/attendance'
const url = 'mongodb+srv://B162210:B162210@cluster0.az10j.mongodb.net/universitydb?retryWrites=true&w=majority'
mongoose.connect(url,{useNewUrlParser:true})
.then(()=>console.log("database connected"));

app.use('/',routes);
// app.get('/',(req,res)=>{
//     res.send('hi')
// });
app.listen(process.env.PORT || 4000,()=>console.log("listening at 4000"));