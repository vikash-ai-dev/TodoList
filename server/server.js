require("dotenv").config();

const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const Todo = require("./models/Todo");

const app = express();

app.use(express.json());
app.use(cors());

mongoose.connect(process.env.MONGO_URL)
  .then(()=>{console.log("MongoDB connected")})
  .catch((error)=>console.log("MongoDB connection error:",error));

app.get("/", (req,res)=>{
  res.send("Todo API if running!");
})

app.post("/api/todos", async (req, res) => {
  console.log(req.body);
  const todo = new Todo({
    text: req.body.text,
    completed: req.body.completed
  });
  await todo.save()

  res.json(todo);
});

app.get("/api/todos", async (req,res)=>{
  const todos = await Todo.find();
  res.json(todos);
})

app.delete("/api/todos/:id", async (req,res)=>{
  await Todo.findByIdAndDelete(req.params.id);

  res.json({
    message: "Todo deleted"
  });
})

app.patch("/api/todos/:id", async(req,res)=>{
  await Todo.findByIdAndUpdate(req.params.id, req.body);

  res.json({
    message: "Todo Updated"
  });

})

app.listen(5000, () => {
  console.log("Server running on http://localhost:5000");
});