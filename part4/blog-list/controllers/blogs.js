const blogRouter = require('express').Router()
const Blog = require('../models/blog')


blogRouter.get('/', async (request, response) => {
  const blogs = await Blog.find({})
  response.json(blogs)
})

blogRouter.post('/', async (request, response) => {
  const { body } = request
  const blog = new Blog({
    ...body,
    likes: body.likes ? body.likes : 0
  })

  const newBlog = await blog.save()
  response.status(201).json(newBlog)
})

module.exports = blogRouter