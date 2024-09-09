const express = require("express");
const morgan = require("morgan")
const cookieParser = require("cookie-parser")
const sequelize = require("../database")
const globalErrorHandler = require("./controllers/errorController");
const userRoutes = require("./routes/userRoutes")
const cropRoutes = require("./routes/cropRoutes");
const AppError = require("./utils/appError");
require('dotenv').config({ path: './src/.env' });
const app = express()
const PORT = process.env.PORT||5000
const apiVersion = "v1"


app.use(express.json())
app.use(morgan("dev"))
app.use(cookieParser())

app.use(`/api/${apiVersion}/user`, userRoutes);
app.use(`/api/${apiVersion}/crop`, cropRoutes);
// app.use(`/api/${apiVersion}/user`, userRoutes);

async function testConnection(){
    try {
        await sequelize.authenticate();
        console.log('Connection has been established successfully.');
      } catch (error) {
        console.error('Unable to connect to the database:', error);
      }
}


testConnection();
app.use(globalErrorHandler)

app.all("*", ( req, res, next)=>{
    next(new AppError(`Can't find ${req.originalUrl} on this server!`, 404));
})
app.listen(PORT, ()=>{
    console.log(`FarmSmart listening on port ${PORT}`)
})