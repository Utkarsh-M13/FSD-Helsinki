import React, { useState } from 'react'
import blogService from '../services/blogs'

const BlogForm = () => {
  const [title, setTitle] = useState("")
  const [url, setURL] = useState("")
  const [author, setAuthor] = useState("")
  const handleCreate = async () => {
    try {
      const response =  await blogService.createBlog(title, author, url)
      console.log('response', response)
    } catch (error) {
      console.log('error', error)
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