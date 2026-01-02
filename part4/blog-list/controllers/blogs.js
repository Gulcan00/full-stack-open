const blogRouter = require('express').Router()
const jwt = require('jsonwebtoken')
const Blog = require('../models/blog')
const User = require('../models/user')


blogRouter.get('/', async (request, response) => {
  const blogs = await Blog.find({}).populate('user', {username: 1, name: 1})
  response.json(blogs)
})

const getTokenFrom = request => {
  const authorization = request.get('authorization')
  if (authorization && authorization.startsWith('Bearer ')) {
    return authorization.replace('Bearer ', '')
  }
  return null
}

blogRouter.post('/', async (request, response) => {
  const { body } = request
  const decodedToken = jwt.verify(getTokenFrom(request), process.env.SECRET)
  
  if (!decodedToken.id) {
    return response.status(401).json({error: 'token invalid'})
  }

  const user = await User.findById(decodedToken.id)
  if (!user) {
    return response.status(400).json({error: 'userId missing or not valid'})
  }
  const blog = new Blog({
    ...body,
    likes: body.likes ? body.likes : 0,
    user: user._id
  })

  const newBlog = await blog.save()
  user.blogs = user.blogs.concat(newBlog._id)
  await user.save()
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