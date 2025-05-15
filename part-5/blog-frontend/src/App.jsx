import { useState, useEffect, createContext } from 'react'
import blogService from './services/blogs'
import Blogs from './components/Blogs'
import Login from './components/login'
import Notification from './components/Notification'
import NotificationContext from './contexts/NotificationContext'

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
    <NotificationContext.Provider value={setNotification}>{
    notification ? <Notification message={notification}></Notification> : <></>}
    {user !== null ? <Blogs></Blogs> : <Login setUser={setUser}></Login>}
    {user !== null ? <button onClick={handleLogout}>logout</button> : null}
    </NotificationContext.Provider>
    </>
  )
}

export default App