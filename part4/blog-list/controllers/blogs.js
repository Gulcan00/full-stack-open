const blogRouter = require('express').Router()
const { request } = require('../app')
const blog = require('../models/blog')
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

blogRouter.delete('/:id', async (request, response) => {
  const id = request.params.id
  await Blog.findByIdAndDelete(id)
  response.status(204).end()
})

blogRouter.put('/:id', async (request, response) => {
  const id = request.params.id
  let blogToUpdate = await Blog.findById(id)

  if (!blogToUpdate) {
    return response.status(404).end()
  } else {
    const { title, url, likes, author } = request.body
    blogToUpdate.title = title
    blogToUpdate.url = url
    blogToUpdate.likes = likes
    blogToUpdate.author = author
    blogToUpdate = await blogToUpdate.save()
    return response.json(blogToUpdate)
  }
})

module.exports = blogRouter