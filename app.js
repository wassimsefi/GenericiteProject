const express = require('express');
const app = express();
const morgan = require('morgan');
const bodyParser = require('body-parser');
const dotenv = require('dotenv');
const connectDB = require('./config/db');



dotenv.config({
    path: './config/config.env'
});

connectDB();

app.use(morgan('dev'));
app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());


app.use((req,res,next)=>{
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Acess-Control-Allow-Headers', '*');
    if(req.method==='OPTIONS'){
        res.header('Access-Control-Allow-Methods','PUT','POST','PATCH','DELETE','GET');
        return res.status(200).json({})
    }
    next();
});

app.use("/api/Client", require("./routes/Client"));

app.use((req,res,next)=>{
    const error = new Error('Not Found');
    error.status = 404;
    next(error);
})

app.use((error,req,res,next)=>{
    res.status(error.status || 500);
    res.json({
        error: {
            message: error.message
        }
    });
});



module.exports = app;
