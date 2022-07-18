// Modules 
require("dotenv").config();
require("express-async-errors");

const express = require("express");
const dbConnect = require("./db/connect");
const authMiddleware = require("./middleware/auth");
const errorHandlerMiddleware = require("./middleware/error-handler");
const notFoundMiddleware = require("./middleware/not-found");
const mainRouter = require("./routes/main")

// Vars
const app = express();
const port = process.env.PORT || 3000;

// Middleware
app.use(express.json());
app.use('/api/v1', mainRouter);
app.use(express.static('./public'));
app.use(errorHandlerMiddleware);
app.use(notFoundMiddleware);


// Start the app
const start = async () => {
    try{
        await dbConnect(process.env.MONGO_URI);
        app.listen(port, () => {
            console.log(`The server is listening on port ${port}`)
        })
    }catch(err){
        console.log(`An error occured while connecting to the database. ${err}`)
    }
}

start();