import { useContext, useState } from 'react'
import blogService from '../services/blogs'
import UserContext from '../contexts/UserContext'

const Blog = ({ blog, handleDelete }) => {
  const [full, setFull] = useState()
  const [likes, setLikes] =useState(blog.likes)
  const [isDisabled, setIsDisabled] = useState(false)

  const user  = useContext(UserContext)

  const handleLike = async () => {
    try {
      setIsDisabled(true)
      await blogService.likeBlog(blog)
      setLikes(likes + 1)
      setIsDisabled(false)
    } catch (error) {
      console.log('Error', error)
    }
  }

  return (
    <div style={{ border: '2px solid black', margin: '3px', padding: '2px' }}>
      <div className='TitleAndAuthor'><b>Title: </b>{ blog.title }<b>Author: </b>{ blog.author }</div>
      <button style={{ margin: '0px 10px' }} onClick={() => { setFull(!full) }}>View</button>
      { full ? <div>
        <div className='URL'><b>URL:</b><a href={blog.url}>{blog.url}</a></div>
        <div><b>Likes:</b>{likes} <button disabled={isDisabled} onClick={ handleLike } style={{ margin: '0px 5px' }}>Like</button></div>
        <div><b>User:</b>{blog.user.name}</div>
        {user.username === blog.user.username ? <div><button className='viewFull' onClick={() => { handleDelete(blog.id) }}>Delete Blog</button></div> : null}
      </div> : null }
    </div>
  )
}

export default Blog