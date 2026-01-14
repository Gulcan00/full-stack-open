import { useState } from "react"

const Blog = ({ blog, updateBlog, user, removeBlog }) => {
  const [detailsVisible, setDetailsVisible] = useState(false)

  const blogStyle = {
    paddingTop: 10,
    paddingLeft: 2,
    border: 'solid',
    borderWidth: 1,
    marginBottom: 5
  }

  const toggleDetails = () => {
    setDetailsVisible(!detailsVisible)
  }

  const onLike = () => {
    const updatedBlog = {
      ...blog,
      likes: blog.likes + 1
    }

    updateBlog(blog.id, updatedBlog)
  }

  const handleRemoveBlog = () => {
    const confirmDelete = window.confirm(`Remove blog ${blog.title} by ${blog.author}?`)
    if (confirmDelete) {
      removeBlog(blog.id)
    }
  }

  return (
    <div style={blogStyle}>
      <div>
        {blog.title} {blog.author} <button onClick={toggleDetails}>{detailsVisible ? 'hide' : 'view'}</button>
      </div>
      {detailsVisible && <div>
        {blog.url} <br />
        likes {blog.likes} <button onClick={onLike}>like</button> <br />
        {blog.user?.name}
        {
          user && blog.user && user.username === blog.user.username &&
          <div>
            <button onClick={handleRemoveBlog}>remove</button>
          </div>
        }
        </div>
      }        
    </div>
)}
export default Blog