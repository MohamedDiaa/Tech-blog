require("dotenv").config();
const express = require('express');
const expresslayout = require('express-ejs-layouts');

const app = express();
const PORT = process.env.PORT;

//Middleware 
app.use(expresslayout);

app.set('view engine', 'ejs');
app.set('layout', './layouts/main');

app.get('/', (req,res) => {

    const local = {
        title: "Begining of the blog",
        body: "This will explain the secrets you wanted to know. you deserve to know."
    }
    res.render('index', {local});
});

app.listen(PORT, () => {
    console.log(`server is listening to port ${PORT}`);
})
