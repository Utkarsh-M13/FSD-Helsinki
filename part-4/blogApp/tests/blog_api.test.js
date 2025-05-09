const { test, after, beforeEach, describe, before } = require('node:test')
const assert = require('node:assert')
const mongoose = require('mongoose')
const supertest = require('supertest')
const helper = require('../utils/blog_test_helpers');
const app = require('../app')
const bcrypt = require('bcrypt')
const Blog = require('../models/blog');
const User = require('../models/user')

const api = supertest(app)

const initialBlogs = helper.initialBlogs

before(async () => {
  const saltRounds = 10;
  const passwordHash = await bcrypt.hash("root", saltRounds)
  const newUser = new User({
    username: "admin",
    name: "test-admin",
    passwordHash
  })
  await newUser.save()
})

beforeEach(async () => {
  const {token, id} = await helper.getAdminToken()
  const completeBlogs  = initialBlogs.map(b => {return {...b, user:id}})
  await Blog.deleteMany({})
  await Blog.insertMany(completeBlogs)
})

describe('general tests', () => {

  test('blogs are returned as json', async () => {
    const {token, id} = await helper.getAdminToken()
    await api
      .get('/api/blogs')
      .set('Authorization', `Bearer ${token}`)
      .expect(200)
      .expect('Content-Type', /application\/json/)
  })
  
  test('all blogs are returned', async () => {
    const {token, id} = await helper.getAdminToken()
    const response = await api.get('/api/blogs')
    .set('Authorization', `Bearer ${token}`)
  
    assert.strictEqual(response.body.length, initialBlogs.length)
  })

  test('all blogs have an id', async () => {
    const allBlogs = await helper.blogsInDb()
  
    for (let b of allBlogs) {
      assert(b.hasOwnProperty('id'))
    }
  })

  test('blogs cannot be accessed without a token', async () => {
    await api
      .get('/api/blogs')
      .expect(401)
  })
})



describe('post tests', () => {
  test('a valid blog can be added', async () => {
    const {token, id}  = await helper.getAdminToken()
    const newBlog = {
        title: "A new blog",
        author: "Mike Ross",
        url: "https://the.com/",
        likes: 700,
    }
    const error = await api.post('/api/blogs').set('Authorization', `Bearer ${token}`).send(newBlog).expect(201).expect('Content-Type', /application\/json/)
    const res = await api.get('/api/blogs').set('Authorization', `Bearer ${token}`)
    const titles = res.body.map((e) => e.title)
    assert.strictEqual(res.body.length, initialBlogs.length + 1)
    assert(titles.includes("A new blog"))
    
  })

  test('a blog without likes defaults to 0', async () => {
    const {token, id}  = await helper.getAdminToken()
    const newBlog = {
      title: "A new blog",
      author: "Mike Ross",
      url: "https://the.com/",
      
    }
  
    const res = await api.post('/api/blogs').set('Authorization', `Bearer ${token}`).send(newBlog).expect(201).expect('Content-Type', /application\/json/)
    const returnedBlog = res.body
  
    assert(returnedBlog.hasOwnProperty("likes"))
    assert.strictEqual(returnedBlog.likes, 0)
  })
  
  test('a blog without a title throws a 400 error', async () => {
    const {token, id}  = await helper.getAdminToken()
    const newBlog = {
      author: "Mike Ross",
      url: "https://the.com/",
    }
  
    await api.post('/api/blogs').set('Authorization', `Bearer ${token}`).send(newBlog).expect(400)
  })
  
  test('a blog without a URL throws a 400 error', async () => {
    const {token, id}  = await helper.getAdminToken()
    const newBlog = {
      title: "A new blog",
      author: "Mike Ross",
    }
  
    await api.post('/api/blogs').set('Authorization', `Bearer ${token}`).send(newBlog).expect(400)
  })
  
  
})

describe('test put', () => {

  test('a blog can be altered with PUT', async () => {
    const {token, id} = await helper.getAdminToken()
    const allBlogs = await helper.blogsInDb();
    const blog = {...allBlogs[0]}
    const blogId = blog.id
    blog.title = "Brand New Title"
  
    const response = await api.put(`/api/blogs/${blogId}`).set('Authorization', `Bearer ${token}`).send(blog).expect(200).expect('Content-Type', /application\/json/)
    const result = response.body
    const checkBlog = {...blog, user: blog.user.toString()}
    assert.deepStrictEqual(checkBlog, result)
  })

  test('a blog with an invalid ID returns 404 on PUT', async () => {
    const {token, id}  = await helper.getAdminToken()
    const newBlog = {
      title: "A new blog",
      author: "Mike Ross",
      url: "https://the.com/",
      user:id
    }
    const blogID = await helper.fakeID()
  
    await api.put(`/api/blogs/${blogID}`).set('Authorization', `Bearer ${token}`).send(newBlog).expect(404)
  })
})


describe('test delete', () => {
  test('an existing blog can be deleted', async () => {
    const {token, id}  = await helper.getAdminToken()
    const allBlogs = await helper.blogsInDb()
    const blog = allBlogs[0]
    const title = blog.title
    const blogID = blog.id
  
    await api.delete(`/api/blogs/${blogID}`).set('Authorization', `Bearer ${token}`).expect(204)
    const res = await helper.blogsInDb();
    const titles = res.map((e) => e.title)
    assert.strictEqual(res.length, initialBlogs.length - 1)
    assert(!titles.includes(title))
  })

  test('a blog can be created and deleted', async () => {
    const {token, id}  = await helper.getAdminToken()
    const newBlog = {
      title: "A new blog",
      author: "Mike Ross",
      url: "https://the.com/",
      user: id
    }
    const res = await api.post('/api/blogs').set('Authorization', `Bearer ${token}`).send(newBlog).expect(201)
    const blogID = res.body.id
    let allBlogs = await helper.blogsInDb()
    assert.strictEqual(initialBlogs.length + 1, allBlogs.length)
  
    await api.delete(`/api/blogs/${blogID}`).set('Authorization', `Bearer ${token}`).expect(204)
    allBlogs = await helper.blogsInDb()
    assert.strictEqual(initialBlogs.length, allBlogs.length)
  })
})

after(async () => {
  await User.deleteMany()
  await mongoose.connection.close()
})