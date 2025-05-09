const blogRouter = require("express").Router()
const Blog = require("../models/blog")
const User = require('../models/user')
const jwt = require('jsonwebtoken');

blogRouter.get('', async (request, response, next) => {
  try {
    const blogs = await Blog.find({}).populate('user', {username: 1, name: 1, id: 1})
    response.json(blogs)
  } catch (error) {
    next(error)
  }
  
})

blogRouter.put('/:id', async (request, response, next) => {
  try {
    const id = request.params.id
    const newBlog = {
      title: request.body.title,
      url: request.body.url,
      author: request.body.author,
      likes: request.body.likes,
    }
    const returnedBlog = await Blog.findByIdAndUpdate(id, newBlog, {
      new: true,
      runValidators: true,
      context: "query"
    })
    if (!returnedBlog) response.status(404).end()
    response.status(200).json(returnedBlog)
  } catch (err) {
    next(err)
  }
  
})

blogRouter.post('', async (request, response, next) => {
  try {
    const user =  request.user
    const blog = new Blog({...request.body, user: user._id})

    const result  = await blog.save()

    user.blogs = user.blogs.concat(result._id)
    await user.save()
    response.status(201).json(result)

  } catch (error) {
    next(error)
  }
})

blogRouter.delete('/:id', async (request, response, next) => {
  try {
    const blog = await Blog.findById(request.params.id)
    if (!blog) return response.status(204).end()
    const user = request.user
    if (blog.user.toString() != user._id.toString()) {
      return response.status(401).json({ error: 'token invalid' })
    }
    user.blogs = user.blogs.filter((blog) => blog.toString() !== request.params.id)
    await user.save()
    await Blog.findByIdAndDelete(request.params.id)
    response.status(204).end()
  } catch (err) {
    next(err)
  }
})

module.exports = blogRouter