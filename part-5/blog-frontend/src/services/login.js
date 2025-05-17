import axios from 'axios'
const baseUrl = '/api/login'

const login = async (username, password) => {
  const user =  await axios.post(baseUrl, { username, password })
  return user.data
}

export default { login }