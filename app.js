const express = require("express");
const userRouter = require("./routes/user.routes");
const dotenv = require("dotenv");
const connectToDB = require("./config/db");
const cookieParser = require("cookie-parser");
const indexRouter = require("./routes/index.routes");



dotenv.config();
connectToDB();

const app = express();

app.set("view engine", "ejs");
app.use(cookieParser());
app.use(express.json());
app.use(express.urlencoded({extended: true}));


app.use('/user', userRouter);
app.use('/', indexRouter);


// process.on('uncaughtException', (err) => {
//     console.log('UNCAUGHT EXCEPTION! 💥 Shutting down...');
//     console.log(err.name, err.message);
//     // process.exit(1);  // stop the server
// })


app.listen(3000, () => {
    console.log("server is running in port 3000")
})