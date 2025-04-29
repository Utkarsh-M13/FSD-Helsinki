const { test, after, beforeEach, describe } = require('node:test')
const assert = require('node:assert')
const mongoose = require('mongoose')
const supertest = require('supertest')
const helper = require('../utils/blog_test_helpers');
const app = require('../app')
const Blog = require('../models/blog');

const api = supertest(app)

const initialBlogs = helper.initialBlogs

beforeEach(async () => {
  await Blog.deleteMany({})
  await Blog.insertMany(initialBlogs)
})

describe('general tests', () => {
  

  test('blogs are returned as json', async () => {
    await api
      .get('/api/blogs')
      .expect(200)
      .expect('Content-Type', /application\/json/)
  })
  
  test('all blogs are returned', async () => {
    const response = await api.get('/api/blogs')
  
    assert.strictEqual(response.body.length, initialBlogs.length)
  })

  test('all blogs have an id', async () => {
    const allBlogs = await helper.blogsInDb()
  
    for (let b of allBlogs) {
      assert(b.hasOwnProperty('id'))
    }
  })
})



describe('post tests', () => {
  test('a valid blog can be added', async () => {
    const newBlog = {
        title: "A new blog",
        author: "Mike Ross",
        url: "https://the.com/",
        likes: 700,
    }
    await api.post('/api/blogs').send(newBlog).expect(201).expect('Content-Type', /application\/json/)
    const res = await api.get('/api/blogs')
    const titles = res.body.map((e) => e.title)
    assert.strictEqual(res.body.length, initialBlogs.length + 1)
    assert(titles.includes("A new blog"))
    
  })

  test('a blog without likes defaults to 0', async () => {
    const newBlog = {
      title: "A new blog",
      author: "Mike Ross",
      url: "https://the.com/",
    }
  
    const res = await api.post('/api/blogs').send(newBlog).expect(201).expect('Content-Type', /application\/json/)
    const returnedBlog = res.body
  
    assert(returnedBlog.hasOwnProperty("likes"))
    assert.strictEqual(returnedBlog.likes, 0)
  })
  
  test('a blog without a title throws a 400 error', async () => {
    const newBlog = {
      author: "Mike Ross",
      url: "https://the.com/",
    }
  
    await api.post('/api/blogs').send(newBlog).expect(400)
  })
  
  test('a blog without a URL throws a 400 error', async () => {
    const newBlog = {
      title: "A new blog",
      author: "Mike Ross",
    }
  
    await api.post('/api/blogs').send(newBlog).expect(400)
  })
  
  
})

describe('test put', () => {

  test('a blog can be altered with PUT', async () => {
    const allBlogs = await helper.blogsInDb();
    const blog = {...allBlogs[0]}
    const id = blog.id
    blog.title = "Brand New Title"
  
    const response = await api.put(`/api/blogs/${id}`).send(blog).expect(200).expect('Content-Type', /application\/json/)
    const result = response.body
    assert.deepStrictEqual(blog, result)
  })

  test('a blog with an invalid ID returns 404 on PUT', async () => {
    const newBlog = {
      title: "A new blog",
      author: "Mike Ross",
      url: "https://the.com/",
    }
    const id = await helper.fakeID()
  
    await api.put(`/api/blogs/${id}`).send(newBlog).expect(404)
  })
})


describe('test delete', () => {
  test('an existing blog can be deleted', async () => {
    const allBlogs = await helper.blogsInDb()
    const blog = allBlogs[0]
    const title = blog.title
    const id = blog.id
  
    await api.delete(`/api/blogs/${id}`).expect(204)
    const res = await helper.blogsInDb();
    const titles = res.map((e) => e.title)
    assert.strictEqual(res.length, initialBlogs.length - 1)
    assert(!titles.includes(title))
  })

  test('a blog can be created and deleted', async () => {
    const newBlog = {
      title: "A new blog",
      author: "Mike Ross",
      url: "https://the.com/",
    }
    const res = await api.post('/api/blogs').send(newBlog).expect(201)
    const id = res.body.id
    let allBlogs = await helper.blogsInDb()
    assert.strictEqual(initialBlogs.length + 1, allBlogs.length)
  
    await api.delete(`/api/blogs/${id}`).expect(204)
    allBlogs = await helper.blogsInDb()
    assert.strictEqual(initialBlogs.length, allBlogs.length)
  })
})


after(async () => {
  await mongoose.connection.close()
})