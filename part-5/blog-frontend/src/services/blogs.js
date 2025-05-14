import axios from 'axios'
const baseUrl = '/api/blogs'

const config = {
  headers: {Authorization: null},
}

const getAll = async () => {
  const response = await axios.get(baseUrl, config)
  return response.data;
}

const createBlog = async (title, author, url) => {
  const newBlog = {
    title,
    author,
    url
  }
  const response = await axios.post(baseUrl, newBlog, config);
  return response.data
}

const setAuth = (newToken) => {
  config.headers.Authorization = `Bearer ${newToken}`
}

export default { getAll , setAuth, createBlog}