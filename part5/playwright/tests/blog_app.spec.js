const { test, expect, beforeEach, describe } = require('@playwright/test')
const { loginWith, createBlog } = require('./helper')

describe('Blog app', () => {
  beforeEach(async ({ page, request }) => {
    await request.post('/api/testing/reset')
    await request.post('/api/users', {
      data: {
        name: 'Matti Luukkainen',
        username: 'mluukkai',
        password: 'salainen'
      }
    })

    await page.goto('/')
  })

  test('Login form is shown', async ({ page }) => {
    await expect(page.getByText('Log in to application')).toBeVisible()
  })

  describe('Login', () => {
    test('succeeds with correct credentials', async ({ page }) => {
      await loginWith(page, 'mluukkai', 'salainen')

      await expect(page.getByText('Matti Luukkainen logged in')).toBeVisible()
    })

    test('fails with wrong credentials', async ({ page }) => {
      await loginWith(page, 'mluukkai', 'wrong')

      const errorDiv = page.locator('.error')
      await expect(errorDiv).toContainText('wrong username or password')
      await expect(errorDiv).toHaveCSS('border-style', 'solid')
      await expect(errorDiv).toHaveCSS('color', 'rgb(255, 0, 0)')

      await expect(page.getByText('Matti Luukkainen logged in')).not.toBeVisible()
    })
  })

  describe('When logged in', () => {
    beforeEach(async ({ page }) => {
      await loginWith(page, 'mluukkai', 'salainen')
    })

    test('a new blog can be created', async ({ page }) => {
      await createBlog(page, 'Test', 'John Smith', 'localhost:123')
      await expect(page.getByText('Test', { exact: false })).toBeVisible()
    })

    describe('a blog exists', () => {
      beforeEach(async ({ page }) => {
        await createBlog(page, 'Test2', 'John Smith', 'localhost:123')
      })

      test('a blog can be liked', async ({ page }) => {
        const blog = page.getByText('Test2').locator('..')
        await blog.getByRole('button', { name: 'view'}).click()
        await blog.getByRole('button', { name: 'like'}).click()

        await expect(blog.getByText('likes 1')).toBeVisible()
      })

      test('a blog can be deleted by the user who created it', async ({ page }) => {
        const blog = page.getByText('Test2 John Smith').locator('..')
        await blog.getByRole('button', { name: 'view'}).click()
        page.on('dialog', dialog => dialog.accept());
        await blog.getByRole('button', { name: 'remove'}).click()
        await expect(page.getByText('Test2 John Smith')).not.toBeVisible()
      })

      test('only the creator can see the delete button', async ({ page }) => {
        const blog = page.getByText('Test2 John Smith').locator('..')
        await blog.getByRole('button', { name: 'view'}).click()
        await expect(blog.getByRole('button', { name: 'remove'})).toBeVisible()
      })
    })

    describe('multiple blogs exist', () => {
      beforeEach(async ({ page, request }) => {
        const loginResponse = await request.post('/api/login', {
          data: {
            username: 'mluukkai',
            password: 'salainen'
          }
        })
        const { token } = await loginResponse.json()

        await request.post('/api/blogs', {
          headers: {
            Authorization: `Bearer ${token}`
          },
          data: {
            title: 'Test3',
            author: 'John Smith',
            url: 'localhost:123',
            likes: 0
          }
        })
        await request.post('/api/blogs', {
          headers: {
            Authorization: `Bearer ${token}`
          },
          data: {
            title: 'Test4',
            author: 'John Smith',
            url: 'localhost:123',
            likes: 5
          }
        })

        await page.reload()
      })

      test('blogs are ordered according to likes', async ({ page }) => {
        const blogs = page.locator('.blog')
        await expect(blogs.first()).toContainText('Test4 John Smith')
        await expect(blogs.nth(1)).toContainText('Test3 John Smith')
      })

    })
  })
})
