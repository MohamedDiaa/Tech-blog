const express = require("express");
const router = express.Router();

router.get("/", (req, res) => {
  const local = {
    title: "router is talking",
    body: "talking will not stop untill everything is 100% better",
  };
  res.render("index", { local });
});

module.exports = router;
