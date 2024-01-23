const express = require('express');
const app = express()

app.use(express.urlencoded({ extended: false }));
app.use(express.json())

const cors = require("cors"); 
app.use(cors()) 

module.exports = app;