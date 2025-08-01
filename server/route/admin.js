const express = require("express");
const router = express.Router();
const Post = require("../models/Post");
const User = require("../models/User");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const adminLayout = "../views/layouts/admin";

const jwtSecret = process.env.JWT_SECRET;

const authMiddleware = (req, res, next) => {
  const token = req.cookies.token;

  if (!token) {
    return res.status(401).json({ message: "Unauthorized" });
  }
  try {
    const decoded = jwt.verify(token, jwtSecret);
    req.userId = decoded.userId;
    next();
  } catch (error) {
    res.status(401).json({ message: "Unauthorized" });
  }
};

router.get("/admin", async (req, res) => {
  try {
    const locals = {
      title: "Admin",
      description: "Simple Blog created with NodeJS, Express & MongoDb.",
    };
    res.render("admin/index", { locals, layout: adminLayout });
  } catch (error) {
    console.log(error);
  }
});

/**
 * POST
 * Admin - Login
 */

router.post("/admin", async (req, res) => {
  try {
    const { username, password } = req.body;
    const user = await User.findOne({ username });
    if (!user) {
      return res.status(401).json({ message: "Invalid credentials" });
    }
    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      return res.status(401).json({ message: "Invalid credentials" });
    }
    const token = jwt.sign({ userId: user._id }, jwtSecret);
    res.cookie('token',token, {httpOnly: true });
    res.redirect("/dashboard");
  } catch (error) {
    console.log(error);
  }
});
/**
 * POST /
 * Admin - Register
 */
router.post("/register", async (req, res) => {
  try {
    const { username, password } = req.body;
    const hashedPassword = await bcrypt.hash(password, 10);
    try {
      const user = await User.create({ username, password: hashedPassword });
      res.status(201).json({ message: "User Created", user });
    } catch (error) {
      if (error.code === 11000) {
        res.status(409).json({ message: "User already in use" });
      }
      res.status(500).json({ message: "Internal server error" });
    }
  } catch (error) {
    console.log(error);
  }
});

/**
 * GET
 * Admin Dashboard
 */
router.get("/dashboard", authMiddleware, async (req, res) => {
  try {
    const posts = await Post.find();
    res.render("admin/dashboard", { posts, layout: adminLayout });
  } catch (error) {}
});

router.delete("/delete-post/:id", authMiddleware, async (req, res) => {
  try {
    const result = await Post.deleteOne({ _id: req.params.id });
    res.redirect("/dashboard");
  } catch (error) {
    console.log(error);
  }
});

/**
 * GET
 * Admin - Add post
 */
router.get("/add-post", authMiddleware, async (req, res) => {
  try {
    res.render("admin/add-post");
  } catch (error) {
    console.log(error);
  }
});

/**
 * POST
 * Admin - save post
 */
router.post("/add-post", authMiddleware, async (req, res) => {
  try {
    const post = await Post.create({
      title: req.body.title,
      body: req.body.body,
      updatedAt: Date.now(),
    });

    console.log(`Created post ${post._id}`);
    res.redirect("/dashboard");
  } catch (error) {
    console.log(error);
  }
});

/**
 * GET
 * Admin - Edit Post
 */
router.get("/edit-post/:id", authMiddleware, async (req, res) => {
  try {
    const post = await Post.findById({ _id: req.params.id });
    res.render("admin/edit-post", { post });
  } catch (error) {
    console.log(error);
  }
});

router.put("/edit-post/:id", authMiddleware, async (req, res) => {
  try {
    await Post.findByIdAndUpdate(req.params.id, {
      title: req.body.title,
      body: req.body.body,
      updatedAt: Date.now(),
    });

    res.redirect(`/edit-post/${req.params.id}`);
  } catch (error) {
    console.log(error);
  }
});

module.exports = router;
