const express = require("express");
const app = express();
const path = require('path');
const bodyParser = require("body-parser");
const todoRouter = require('./routes/todoRouters')

const router = express.Router();

// view engine setup
app.set("view engine", "ejs")
app.use(express.static(`/${__dirname}/views`));

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(express.json());
app.use(express.static(path.join(__dirname, 'views')));

app.use("/", todoRouter);

module.exports = app;
