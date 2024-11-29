require("dotenv").config();
require('express-async-errors');

const connectDB = require("./db/connect");
const express = require("express");
const cors = require('cors')
const app = express();
const mainRouter = require("./routes/user");
const cls =  require("./routes/class")
const post=require("./routes/post")
const comment=require('./routes/comment')
app.use(express.json());

app.use(cors())
app.use("/api/v1", mainRouter);
app.use("/class",cls)
app.use("/post",post)
app.use("/comment",comment)


const port = process.env.PORT || 3000;

const start = async () => {

    try {        
        await connectDB(process.env.MONGO_URI);
        app.listen(port, () => {
            console.log(`Server is listening on port ${port}`);
        })

    } catch (error) {
       console.log(error); 
    }
}

start();

