import { useState, useEffect } from 'react'
import blogService from './services/blogs'
import Blogs from './components/Blogs'
import Login from './components/login'
import Notification from './components/Notification'

const App = () => {
  const [user, setUser] = useState(null)
  const [notification, setNotification] = useState(null)

  useEffect(() => {
    const userJSON = window.localStorage.getItem("loggedInUser");
    if (userJSON) {
      const loggedInUser = JSON.parse(userJSON)
      setUser(loggedInUser)
      blogService.setAuth(loggedInUser.token)
    }
  }, [])

  const handleLogout = () => {
    window.localStorage.removeItem("loggedInUser")
    setUser(null)
    blogService.setAuth(null)
  }

  return (
    <>
    {notification ? <Notification></Notification> : <></>}
    {user !== null ? <Blogs></Blogs> : <Login setUser={setUser} setNotification={setNotification}></Login>}
    {user !== null ? <button onClick={handleLogout}>logout</button> : null}
    </>
  )
}

export default App