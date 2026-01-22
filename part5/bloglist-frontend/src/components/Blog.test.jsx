import { render, screen } from '@testing-library/react'
import Blog from './Blog'
import userEvent from '@testing-library/user-event'

test('displays title and author, not URL or likes by default', () => {
  const blog = {
    title: 'Test',
    author: 'John Smith',
    url: 'http://123.com',
    likes: 10
  }

  render(<Blog blog={blog} />)

  const title = screen.getByText('Test', { exact: false })
  const author = screen.getByText('John Smith', { exact: false })
  const url = screen.queryByText('http://123.com')
  const likes = screen.queryByText('likes 10')

  expect(title).toBeDefined()
  expect(author).toBeDefined()
  expect(url).toBeNull()
  expect(likes).toBeNull()
})

test('displays URL and likes when view button is clicked', async () => {
  const blog = {
    title: 'Test',
    author: 'John Smith',
    url: 'http://123.com',
    likes: 10
  }

  render(<Blog blog={blog} />)

  const user = userEvent.setup()
  const button = screen.getByText('view')
  await user.click(button)

  const url = screen.getByText('http://123.com', { exact: false })
  const likes = screen.getByText('likes 10', { exact: false })
  expect(url).toBeDefined()
  expect(likes).toBeDefined()
})

test('calls updateBlog twice when like button is clicked twice', async () => {
  const blog = {
    title: 'Test',
    author: 'John Smith',
    url: 'http://123.com',
    likes: 10
  }

  const mockUpdateBlog = vi.fn()

  render(<Blog blog={blog} updateBlog={mockUpdateBlog} />)

  const user = userEvent.setup()
  const viewButton = screen.getByText('view')
  await user.click(viewButton)
  const likeButton = screen.getByText('like')
  await user.click(likeButton)
  await user.click(likeButton)

  expect(mockUpdateBlog).toHaveBeenCalledTimes(2)
})