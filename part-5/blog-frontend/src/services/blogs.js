import axios from 'axios'
const baseUrl = '/api/blogs'

const config = {
  headers: {  Authorization: null },
}

const getAll = async () => {
  const response = await axios.get(baseUrl, config)
  return response.data.sort((a, b) => b.likes - a.likes)
}

const createBlog = async (title, author, url) => {
  const newBlog = { title, author, url }
  const response = await axios.post(baseUrl, newBlog, config)
  return response.data
}

const likeBlog = async (blog) => {
  const URL = `${baseUrl}/${blog.id}`
  const newBlog = { ...blog, likes: blog.likes + 1 }
  const response = await axios.put(URL, newBlog, config)
  return response.data
}

const deleteBlog = async (id) => {
  console.log('id', id)
  const URL = `${ baseUrl }/${ id }`
  await axios.delete(URL, config)
  return
}

const setAuth = (newToken) => {
  config.headers.Authorization = `Bearer ${ newToken }`
}

export default { getAll , setAuth, createBlog, likeBlog, deleteBlog }