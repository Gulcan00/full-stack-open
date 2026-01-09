import { useState, useEffect } from 'react'
import Blog from './components/Blog'
import blogService from './services/blogs'
import loginService from './services/login'

const App = () => {
  const [blogs, setBlogs] = useState([])
  const [user, setUser] = useState(null)
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [title, setTitle] = useState('')
  const [author, setAuthor] = useState('')
  const [url, setUrl] = useState('')

  useEffect(() => {
    blogService.getAll().then(blogs =>
      setBlogs( blogs )
    )  
  }, [])

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem('loggedBlogappUser')
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON)
      setUser(user)
      blogService.setToken(user.token)
    }
  }, [])

  const handleLogin = async (event) => {
    event.preventDefault()
    try {
      const user = await loginService.login({
        username, password,
      })
      window.localStorage.setItem(
        'loggedBlogappUser', JSON.stringify(user)
      )
      setUser(user)
      blogService.setToken(user.token)
      setUsername('')
      setPassword('')
    } catch {
      console.log('wrong credentials')
    }
  }

  const handleCreate = async (event) => {
    event.preventDefault()
    const blogObject = {
      title,
      author,
      url,
    }
    const returnedBlog = await blogService.create(blogObject)
    setBlogs(blogs.concat(returnedBlog))
    setTitle('')
    setAuthor('')
    setUrl('')
  }

  if (user === null) {
    return (
      <div>
        <h2>Log in to application</h2>
        <form onSubmit={handleLogin}>
          <label>
            username
            <input type="text" name="username" value={username} onChange={({ target }) => setUsername(target.value)} />
          </label>
          <br />
          <label>
            password
            <input type="password" name="password" value={password} onChange={({ target }) => setPassword(target.value)} />
          </label>
          <br />
          <button type="submit">login</button>
        </form>
      </div>
    )
  }

  return (
    <div>
      <h2>blogs</h2>
      <p>{user.name} logged in</p><button onClick={() => {
        window.localStorage.removeItem('loggedBlogappUser')
        setUser(null)
      }}>logout</button>

      <h2>create new</h2>
      <form onSubmit={handleCreate}>
        <label>
          title:
          <input type="text" value={title} name="Title" onChange={({ target }) => setTitle(target.value)} />
        </label>
        <br />
        <label>
          author:
          <input type="text" value={author} name="Author" onChange={({ target }) => setAuthor(target.value)} />
        </label>
        <br />
        <label>
          url:
          <input type="text" value={url} name="Url" onChange={({ target }) => setUrl(target.value)} />
        </label>
        <br />
        <button type="submit">create</button>
      </form>
      {blogs.map(blog =>
        <Blog key={blog.id} blog={blog} />
      )}
    </div>
  )
}

export default App