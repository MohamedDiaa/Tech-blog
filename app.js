require("dotenv").config();
const express = require('express');
const expresslayout = require('express-ejs-layouts');

const app = express();
const PORT = process.env.PORT;

//Middleware 
app.use(express.static('./public'));
app.use(expresslayout);

app.set('view engine', 'ejs');
app.set('layout', './layouts/main');

app.use('/', require('./server/route/main'));

app.listen(PORT, () => {
    console.log(`server is listening to port ${PORT}`);
})
