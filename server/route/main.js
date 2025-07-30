const express = require("express");
const router = express.Router();
const Post = require("../models/Post");
const Contact = require("../models/Contact");

router.get("/", async (req, res) => {
  const local = {
    title: "Tech Blog",
    body: "All info needed to follow the latest in tech.",
  };

  let posts = await Post.find();
  res.render("index", { local, posts });
});

router.get("/about", async (req, res) => {
  res.render("about");
});

router.get("/contact", async (req, res) => {
  res.render("contact");
});

router.post("/contact", async (req, res) => {
  console.log(req.body);
  try {
    await Contact.insertOne({
      name: req.body.name,
      email: req.body.email,
      phone: req.body.phone,
    });
  } catch (error) {
    console.log(error);
  }
  res.redirect("/");
});

async function uploadServer() { console.log("uploading data");
  try {
    const insert = await Post.insertMany([
      {
        title: "Adobe unveils new AI‑powered Photoshop tools",
        body: "Adobe has added several AI features to Photoshop, including intelligent harmonization and image editing enhancements that streamline creative workflows.",
        image: "/img/img1.webp",
      },
      {
        title: "Microsoft Edge launches Copilot Mode AI browser",
        body: "Microsoft Edge is evolving into an AI-first browser with the launch of Copilot Mode, integrating natural language commands and smart summarization.",
        image: "/img/img2.jpg",
      },
      {
        title: "TikTok integrates YouTube Music syncing",
        body: "TikTok users can now link with YouTube Music to save and sync songs heard in videos directly into playlists.",
        image: "/img/img3.webp",
      },
      {
        title: "AI startup Julius secures $10M for analytics platform",
        body: "Julius, an AI data analytics startup, has raised $10M in seed funding to scale its predictive business intelligence solution.",
        image: "/img/img4.jpg",
      },
    ]);
  } catch (error) {
    console.log(error);
  }
}

module.exports = router;
