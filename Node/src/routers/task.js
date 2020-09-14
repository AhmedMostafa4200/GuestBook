const express = require("express");

const url = require("url");
const querystring = require("querystring");

var ObjectId = require("mongoose").Types.ObjectId;

const auth = require("../middleware/auth");
const upload = require("../middleware/upload");

const Task = require("../models/task");
const User = require("../models/user");

const router = new express.Router();

//2-1 Create a task
router.post(
  "/tasks/newtask",
  [auth, upload.single("image")],
  async (req, res) => {
    const blog = JSON.parse(req.body.blog);
    const owner = await User.findById(blog.owner);
    const task = new Task({
      body: blog.body,
      owner: owner._id,
    });

    try {
      await task.save();
      res.status(201).send(task);
    } catch (e) {
      res.status(500).send();
    }
  }
);

//2-2 Get all tasks & pagination
router.get("/tasks", async (req, res) => {
  try {
    let urlParser = url.parse(req.url);
    let querystringParser = querystring.parse(urlParser.query); //
    const tasks = await Task.find().sort({ date: -1 });
    const paginatedTasks = tasks.slice(
      +querystringParser.start,
      +querystringParser.size
    );
    res.send(paginatedTasks);
  } catch (e) {
    res.send(e);
  }
});

//2-3 Update a task
router.patch(
  "/tasks/blogtoedit",
  [auth, upload.single("image")],
  async (req, res) => {
    try {
      const blog = JSON.parse(req.body.blog);
      const blogToEdit = await Task.findById(blog.editableBlogId);
      blogToEdit.body = blog.body;
      await blogToEdit.save();
      res.status(201).send(blogToEdit);
    } catch (e) {
      res.status(400).send(e);
    }
  }
);

//2-4 Delete a task
router.delete("/deleteTask/:id", auth, async (req, res) => {
  if (!ObjectId.isValid(req.params.id)) {
    return res.status(404).send("Invalid ID");
  }
  try {
    const task = await Task.findOneAndDelete({
      _id: req.params.id,
      owner: req.user._id,
    });
    if (!task) {
      res.status(404).send("No available Blog!");
    }
    res.send(task);
  } catch (e) {
    res.status(400).send(e);
  }
});

module.exports = router;
