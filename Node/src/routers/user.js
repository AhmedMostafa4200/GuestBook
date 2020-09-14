const express = require("express");
var ObjectId = require("mongoose").Types.ObjectId;

const url = require("url");
const querystring = require("querystring");

const User = require("../models/user");
const auth = require("../middleware/auth");
const upload = require("../middleware/upload");

const router = new express.Router();

// 1- CREATE
router.post("/signup", upload.single("image"), async (req, res) => {
  const newUser = JSON.parse(req.body.user);
  const user = new User({
    name: newUser.name,
    email: newUser.email,
    password: newUser.password,
    image: req.file.buffer,
  });
  try {
    await user.save();
    const token = await user.generateAuthToken();

    res.status(201).send({ user, token });
  } catch (e) {
    res.status(400).send(e);
  }
});

// 2- Authenticate
router.post("/signin", async (req, res) => {
  try {
    const user = await User.findByCredentials(
      req.body.email,
      req.body.password
    );
    const token = await user.generateAuthToken();
    res.send({ user, token });
  } catch (e) {
    res.status(400).send(e.message);
  }
});

// 3- Get me
router.get("/user/me", auth, async (req, res) => {
  res.send(req.user);
});

// 4- Get specific user
router.get("/user/:id", async (req, res) => {
  try {
    const user = await User.findOne({ _id: req.params.id });
    if (!user) {
      return res.status(404).send("User not found");
    }
    res.status(201).send(user);
  } catch (e) {
    res.status(500).send(e);
  }
});

// 5- DELETE
router.delete("/user/me", auth, async (req, res) => {
  try {
    await req.user.remove();
    res.send(req.user);
  } catch (e) {
    res.status(400).send(e);
  }
});

router.post("/logout", auth, async (req, res) => {
  try {
    req.user.tokens = req.user.tokens.filter((token) => {
      return token.token !== req.token;
    });

    await req.user.save();
    res.send(req.user);
  } catch (e) {
    res.status(500).send(e);
  }
});

// 6- User logout from all accounts
router.post("/logoutAll", auth, async (req, res) => {
  try {
    req.user.tokens = [];
    await req.user.save();
    res.send(req.user.tokens);
  } catch (e) {
    res.status(500).send(e.message);
  }
});

module.exports = router;
