const dummy = (props) => {
  return 1;
}

const totalLikes = (blogs) => {
  if (blogs.length === 0) return 0;
  return blogs.reduce((sum, blog) => {
    return sum + blog.likes
  }, 0)
}

const favoriteBlog = (blogs) => {
  if (blogs.length === 0) return null
  const sortedBlogs  = blogs.sort((a, b) => b.likes - a.likes)
  return sortedBlogs[0];
}

const mostBlogs = (allBlogs) => {
  if (allBlogs.length === 0) return null
  const authors = {}
  let mostBlogAuthor = null;
  for (let blog of allBlogs) {
    authors[blog.author] = (authors[blog.author] || 0) + 1;
    if (mostBlogAuthor === null || authors[blog.author] > mostBlogAuthor.blogs) {
      mostBlogAuthor = {name: blog.author, blogs: authors[blog.author]}
    } 
  }
  return mostBlogAuthor;
}

const mostLikes = (allBlogs) => {
  if (allBlogs.length === 0) return null
  const authors = {}
  let mostLikesAuthor = null;
  for (let blog of allBlogs) {
    authors[blog.author] = (authors[blog.author] || 0) + blog.likes;
    if (mostLikesAuthor === null || authors[blog.author] > mostLikesAuthor.likes) {
      mostLikesAuthor = {name: blog.author, likes: authors[blog.author]}
    } 
  }
  return mostLikesAuthor;
}
module.exports = { dummy, totalLikes, favoriteBlog, mostBlogs, mostLikes }