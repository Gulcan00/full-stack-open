const dummy = (blogs) => {
  return 1;
}

const totalLikes = (blogs) => {
    return blogs.reduce((sum, blog) => sum + blog.likes, 0)
}

const favoriteBlog = (blogs) => {
    return blogs.reduce((maxLikesBlog, blog) => {
        if (!maxLikesBlog.likes) {
            maxLikesBlog = blog
        }
        if (blog.likes > maxLikesBlog.likes) {
            maxLikesBlog = blog
        }
        return maxLikesBlog
    }, {})
}

module.exports = {
  dummy, 
  totalLikes,
  favoriteBlog
}