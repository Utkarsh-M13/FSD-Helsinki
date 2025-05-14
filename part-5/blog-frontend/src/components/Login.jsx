import React, { useEffect, useState } from 'react'
import loginService from '../services/login'
import blogService from '../services/blogs'

const Login = ({setUser, setNotification}) => {
  const [username, setUsername] = useState("")
  const [password, setPassword] = useState("")

  const usernameHandler = (event) => {
    setUsername(event.target.value)
  }

  const passwordHandler = (event) => {
    setPassword(event.target.value)
  }

  const loginHandler = async (event) => {
    event.preventDefault()
    try {
      const user = await loginService.login(username, password);
      blogService.setAuth(user.token)
      window.localStorage.setItem("loggedInUser", JSON.stringify(user))
      setUser(user)
      setUsername("")
      setPassword("")
      setNotification("Logged in")
    } catch (error) {
      console.log('error:', error)
    }
  }


  return (
    <form onSubmit={loginHandler}>
      <div>Username</div>
      <input type="text" label="login" value={username} onChange={usernameHandler}/>
      <div>Password</div>
      <input type="text" label="password" value={password} onChange={passwordHandler}/>
      <div><button type='submit'>login</button></div>
    </form>
  )
}

export default Login