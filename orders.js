const express = require("express");
const mongoose = require("mongoose");
const app = express();
const bodyParser = require("body-parser");
const chalk = require("chalk");

//import router
const ordersRouter = require('./routers/orders');

//connect to DB
mongoose.connect(
  "mongodb+srv://orders_admin:4msJglzx8IgqjPBR@cluster0.nkhwf.mongodb.net/Orders-Microservice?retryWrites=true&w=majority",
  { useNewUrlParser: true, useUnifiedTopology: true },
  () => {
    console.log(chalk.green("connected to orders database"));
  }
);



//port
const port = 7700;

//middlewares
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

//router
app.use(ordersRouter);

//start application
app.listen(port, () => {
  console.log(chalk.green(`orders service started on ${port}`));
});
