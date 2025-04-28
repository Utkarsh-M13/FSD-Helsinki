const express = require('express');
const mongoose = require('mongoose');
const config = require('./utils/config');
const blogRouter = require('./controllers/blogs');

const app = express()
app.use(express.json())

mongoose.connect(config.MONGO_URI)

app.use('/api/blogs', blogRouter)

module.exports = app