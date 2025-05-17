import axios from 'axios'
const baseUrl = '/api/blogs'

const config = {
  headers: {Authorization: null},
}

const getAll = async () => {
  const response = await axios.get(baseUrl, config)
  return response.data.sort((a, b) => b.likes - a.likes);
}

const createBlog = async (title, author, url) => {
  try {
    const newBlog = { title, author, url }
    const response = await axios.post(baseUrl, newBlog, config)
    return response.data
  } catch (error) {
    throw error 
  }
}

const likeBlog = async (blog) => {
  const URL = `${baseUrl}/${blog.id}`
  const newBlog = {...blog, likes: blog.likes + 1}
  try {
    const response = await axios.put(URL, newBlog, config)
    return response.data
  } catch (error) {
    throw error
  }
}

const deleteBlog = async (id) => {
  console.log('id', id)
  const URL = `${baseUrl}/${id}`
  try {
    await axios.delete(URL, config)
    return
  } catch (error) {
    throw error
  }
}

const setAuth = (newToken) => {
  config.headers.Authorization = `Bearer ${newToken}`
}

export default { getAll , setAuth, createBlog, likeBlog, deleteBlog}