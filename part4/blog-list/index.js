require('dotenv').config();
const express = require('express')
const mongoose = require('mongoose')
const blogRouter = require('./controllers/blogs');

const app = express()

const mongoUrl = process.env.MONGODB_URI
mongoose.connect(mongoUrl, { family: 4 })

app.use(express.json())
app.use('/', blogRouter)

const PORT = 3003
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})