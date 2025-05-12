import React, { useEffect, useState } from 'react'
import login from '../services/login'

const Login = ({setUser}) => {
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
    const user = await login(username, password);
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