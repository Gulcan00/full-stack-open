const _ = require('lodash');

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

const mostBlogs = (blogs) => {
    const groupedBlogs = _(blogs)
        .groupBy('author')
        .map((group, author) => ({
            author,
            blogs: group.length
        }))
        .orderBy(['blogs'], ['desc'])
        .value();

    return groupedBlogs.length > 0 ? groupedBlogs[0] : {};
}

module.exports = {
  dummy, 
  totalLikes,
  favoriteBlog,
  mostBlogs
}