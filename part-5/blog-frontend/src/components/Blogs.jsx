import React, { useEffect, useState } from 'react'
import Blog from './Blog'
import blogService from '../services/blogs'
import BlogForm from './BlogForm'
import Toggleable from './Toggleable'


const Blogs = () => {
  const [blogs, setBlogs] = useState([])
  useEffect(() => {
    blogService.getAll().then(blogs =>
      setBlogs( blogs )
    )  
  }, [])
  
  return (
    <>
     <div>
      <h2>blogs</h2>
      {blogs.map(blog =>
        <Blog key={blog.id} blog={blog} />
      )}
    </div>
    <Toggleable toggleActionName="New Blog">
      <BlogForm></BlogForm>
    </Toggleable>
    </>
   
  )
}

export default Blogs