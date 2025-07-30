require("dotenv").config();
const express = require("express");
const expresslayout = require("express-ejs-layouts");
const connectDB = require("./server/config/db");

const app = express();
const PORT = process.env.PORT;

connectDB();
//Middleware
app.use(express.static("./public"));
app.use(expresslayout);
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.set("view engine", "ejs");
app.set("layout", "./layouts/main");

app.use("/", require("./server/route/main"));
app.use("/", require("./server/route/admin"));

app.listen(PORT, () => {
  console.log(`server is listening to port ${PORT}`);
});
