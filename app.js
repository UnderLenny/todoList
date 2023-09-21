const express = require("express");
const app = express();
const Todo = require("./models/todoModels");
const bodyParser = require("body-parser");

const router = express.Router();
app.set("view engine", "ejs")

app.use(express.static(`/${__dirname}/views`));
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(express.json());

app.use("/", router);
app.use("/todos", router);

// отображение страницы 
router.get("/", async (req, res) => {
  try {
    const todos = await Todo.find();
    res.render("./index", { todos });
  } catch (err) {
    console.log(err)
  }
});

router.post("/", (req, res) => {
  try {
    const todo = new Todo({
      todo: req.body.todoValue,
    });
    todo.save();

    res.redirect("/");
  } catch (err) {
    console.log(err);
  }
});

module.exports = app
