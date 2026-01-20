import { render, screen } from '@testing-library/react'
import Blog from './Blog'

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