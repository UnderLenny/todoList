const express = require("express");

const app = express();
const path = require("path");
const methodOverride = require("method-override");
const bodyParser = require("body-parser");
const todoRouter = require("./routes/todoRouters");
const onboardingRouter = require("./routes/onboardingRouters");

// view engine setup
app.set("view engine", "ejs");
app.use(express.static(path.join(__dirname, "views")));
app.use(express.static(path.join(__dirname, "views/styles")));

app.use(methodOverride("_method"));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(express.json());

app.use((req, res, next) => {
  if (req.url === "/") {
    res.redirect("/onboarding");
  } else {
    next();
  }
});

app.use("/onboarding", onboardingRouter);
app.use("/tasks", todoRouter);

module.exports = app;
