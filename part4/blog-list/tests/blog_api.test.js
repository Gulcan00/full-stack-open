const { test, after, beforeEach, describe } = require('node:test')
const mongoose = require('mongoose')
const supertest = require('supertest')
const app = require('../app')
const assert = require('node:assert')
const testHelper = require('./test_helper')
const Blog = require('../models/blog')
const { title } = require('node:process')

const api = supertest(app)

beforeEach(async () => {
    await Blog.deleteMany({})
    await Blog.insertMany(testHelper.initialBlogs)
})

test('blogs are returned as JSON', async () => {
    await api
        .get('/api/blogs')
        .expect(200)
        .expect('Content-Type', /application\/json/)
})

test('all blogs are returned', async () => {
    const response = await api.get('/api/blogs')

    assert.strictEqual(response.body.length, testHelper.initialBlogs.length)
})

test('blog posts have property id', async () => {
    const response = await api.get('/api/blogs')

    response.body.forEach(blog => assert(Object.hasOwn(blog, 'id')))
})

test('a valid blog can be added', async () => {
    const blog = {
        title: "Type wars 2",
        author: "Robert C. Martin",
        url: "http://blog.cleancoder.com/uncle-bob/2016/05/01/TypeWars.html",
        likes: 3,
    }

    await api
    .post('/api/blogs')
    .send(blog)
    .expect(201)
    .expect('Content-Type', /application\/json/)

    const blogs = await testHelper.blogsInDB()
    assert.strictEqual(blogs.length, testHelper.initialBlogs.length + 1)

    const titles = blogs.map(blog => blog.title)
    assert(titles.includes('Type wars 2'))
})

test('likes defaults to 0 if missing', async () => {
        const blog = {
            title: "Type wars 2",
            author: "Robert C. Martin",
            url: "http://blog.cleancoder.com/uncle-bob/2016/05/01/TypeWars.html"
        }

        await api
            .post('/api/blogs')
            .send(blog)
            .expect(201)
            .expect('Content-Type', /application\/json/)

        const blogs = await testHelper.blogsInDB()
        const createdBlog = blogs.find(blog => blog.title === 'Type wars 2')
        assert.strictEqual(createdBlog.likes, 0)
})

test('blog with missing title is not added', async () => {
        const blog = {
            author: "Robert C. Martin",
            url: "http://blog.cleancoder.com/uncle-bob/2016/05/01/TypeWars.html"
        }

        await api
            .post('/api/blogs')
            .send(blog)
            .expect(400)

        const blogs = await testHelper.blogsInDB()
        assert.strictEqual(blogs.length, testHelper.initialBlogs.length)
})

test('blog with missing url is not added', async () => {
        const blog = {
            title: "Type wars 2",
            author: "Robert C. Martin"
        }

         await api
            .post('/api/blogs')
            .send(blog)
            .expect(400)

        const blogs = await testHelper.blogsInDB()
        assert.strictEqual(blogs.length, testHelper.initialBlogs.length)
})

describe('deletion of a blog', () => {
    test('succeeds with status code 204 if id is valid', async () => {
      const blogsAtStart = await testHelper.blogsInDB()
      const blogToDelete = blogsAtStart[0]

      await api.delete(`/api/blogs/${blogToDelete.id}`).expect(204)

      const blogsAtEnd = await testHelper.blogsInDB()

      const titles = blogsAtEnd.map(n => n.title)
      assert(!titles.includes(blogToDelete.title))

      assert.strictEqual(blogsAtEnd.length, testHelper.initialBlogs.length - 1)
    })
  })

after(() => {
    mongoose.connection.close()
})