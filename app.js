require("dotenv").config();
const express = require("express");
const expresslayout = require("express-ejs-layouts");
const connectDB = require("./server/config/db");
const methodOverride = require("method-override");
const cookieParser = require('cookie-parser');
const session = require('express-session');
const MongoStore = require('connect-mongo');

const app = express();
const PORT = process.env.PORT;

connectDB();
//Middleware
app.use(express.static("public"));
app.use(expresslayout);
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(methodOverride("_method"));
app.use(cookieParser());

app.use(session({
  secret: 'keyboard cat',
  resave: false,
  saveUninitialized: true,
  store: MongoStore.create({
    mongoUrl: process.env.MONGODB_URI
  })
}))

app.set("view engine", "ejs");
app.set("layout", "./layouts/main");

app.use("/", require("./server/route/main"));
app.use("/", require("./server/route/admin"));

app.listen(PORT, () => {
  console.log(`server is listening to port ${PORT}`);
});
