import { useState, useEffect, createContext } from 'react'
import blogService from './services/blogs'
import Blogs from './components/Blogs'
import Login from './components/login'
import Notification from './components/Notification'
import NotificationContext from './contexts/NotificationContext'
import Toggleable from './components/Toggleable'
import UserContext from './contexts/UserContext'

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
    <UserContext.Provider value={user}>
    <NotificationContext.Provider value={setNotification}>{
    notification ? <Notification message={notification}></Notification> : <></>}
    {user !== null ? <Blogs></Blogs> : <Toggleable toggleActionName={"Login"}><Login setUser={setUser}></Login></Toggleable>}
    {user !== null ? <button onClick={handleLogout}>logout</button> : null}
    </NotificationContext.Provider>
    </UserContext.Provider>
    </>
  )
}

export default App