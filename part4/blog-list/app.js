const express = require('express')
const mongoose = require('mongoose')
const blogRouter = require('./controllers/blogs');
const config = require('./utils/config');

const app = express()

const mongoUrl = config.MONGODB_URI
mongoose.connect(mongoUrl, { family: 4 })

app.use(express.json())
app.use('/api/blogs', blogRouter)

module.exports = app