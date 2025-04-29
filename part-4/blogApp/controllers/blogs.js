const blogRouter = require("express").Router()
const Blog = require("../models/blog")

blogRouter.get('', async (request, response, next) => {
  try {
    const blogs = await Blog.find({})
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
    const blog = new Blog(request.body)

    const result  = await blog.save()
    response.status(201).json(result)

  } catch (error) {
    next(error)
  }
})

blogRouter.delete('/:id', async (request, response, next) => {
  try {
    const res = await Blog.findByIdAndDelete(request.params.id)
    response.status(204).end()
  } catch (err) {
    next(err)
  }
})


module.exports = blogRouter