import React, { useContext, useEffect, useState } from 'react'
import loginService from '../services/login'
import blogService from '../services/blogs'
import NotificationContext from '../contexts/NotificationContext'
import PropTypes from 'prop-types'

const Login = ({ setUser }) => {
  const setNotification = useContext(NotificationContext)
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')

  Login.propTypes = {
    setUser: PropTypes.func.isRequireds
  }

  const usernameHandler = (event) => {
    setUsername(event.target.value)
  }

  const passwordHandler = (event) => {
    setPassword(event.target.value)
  }

  const loginHandler = async (event) => {
    event.preventDefault()
    try {
      const user = await loginService.login(username, password)
      blogService.setAuth(user.token)
      window.localStorage.setItem('loggedInUser', JSON.stringify(user))
      setUser(user)
      setUsername('')
      setPassword('')
      setNotification('Logged in')
      setTimeout(() => {
        setNotification(null)
      }, 5000)
    } catch (error) {
      setNotification(error.message)
      setTimeout(() => {
        setNotification(null)
      }, 5000)
    }
  }


  return (
    <form onSubmit={loginHandler}>
      <div>Username</div>
      <input type='text' label='login' value={username} onChange={usernameHandler}/>
      <div>Password</div>
      <input type='text' label='password' value={password} onChange={passwordHandler}/>
      <div><button type='submit'>login</button></div>
    </form>
  )
}

export default Login