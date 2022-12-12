const express = require('express');
const morgan = require('morgan');
const mongoose = require('mongoose');
const session = require('express-session');
var cookieParser = require('cookie-parser');
const app = express()

app.use(morgan("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(session({
    // path: '/',
    secret: 'Secret12',
    // saveUninitialized: true,
    // cookie: {
    //     secure: true
    // }
}))

mongoose.connect(process.env.MONGO_URL, {
    useNewUrlParser: true
}, (error) =>{
    if (error){
        console.log(error);
    } else {
        console.log('BD connect !');
    }
});


const classesRouter = require('./routes/classes');
const studentRouter = require('./routes/students');
const lessonRouter = require('./routes/lessons');

app.get("/", (req, res) => {
    res.status(200).send('<h1>Hello world !</h1>');
});

app.use('/students', studentRouter);
app.use('/classes', classesRouter);
app.use('/lessons', lessonRouter);


app.listen(4500, () => {
    console.log('Server is running on http://127.0.0.1:4500')
});