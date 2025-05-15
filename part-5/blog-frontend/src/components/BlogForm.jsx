import React, { useContext, useState } from 'react'
import blogService from '../services/blogs'
import NotificationContext from '../contexts/NotificationContext'


const BlogForm = () => {
  const [title, setTitle] = useState("")
  const [url, setURL] = useState("")
  const [author, setAuthor] = useState("")
  const setNotification = useContext(NotificationContext)
  const handleCreate = async (event) => {
    event.preventDefault()
    try {
      const response =  await blogService.createBlog(title, author, url)
      setNotification(`Created blog ${response.title} by ${response.author}`)
      setTimeout(() => {
        setNotification(null)
      }, 5000)
    } catch (error) {
      console.log('error', error)
      setNotification(error.message)
      setTimeout(() => {
        setNotification(null)
      }, 5000)
    }
  }
  return (
    <form onSubmit={handleCreate}>
      <div>Title</div>
      <input type="text" value={title} onChange={(event) => setTitle(event.target.value)}/>
      <div>Author</div>
      <input type="text" value={author} onChange={(event) => {setAuthor(event.target.value)}}/>
      <div>url</div>
      <input type="text" value={url} onChange={(event) => {setURL(event.target.value)}}/>
      <div><button type='submit'>Create Blog</button></div>
    </form>
  )
}

export default BlogForm