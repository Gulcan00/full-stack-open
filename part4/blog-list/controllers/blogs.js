const blogRouter = require('express').Router()
const Blog = require('../models/blog')
const User = require('../models/user')


blogRouter.get('/', async (request, response) => {
  const blogs = await Blog.find({}).populate('user', {username: 1, name: 1})
  response.json(blogs)
})

blogRouter.post('/', async (request, response) => {
  const { body } = request
  const firstUser = await User.findOne({});
  const blog = new Blog({
    ...body,
    likes: body.likes ? body.likes : 0,
    user: firstUser.id
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