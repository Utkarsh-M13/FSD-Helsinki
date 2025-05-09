const { test, after, beforeEach, describe } = require('node:test')
const assert = require('node:assert')
const mongoose = require('mongoose')
const supertest = require('supertest')
const helper = require('../utils/blog_test_helpers');
const app = require('../app')
const Blog = require('../models/blog');
const User = require('../models/user')

const api = supertest(app)

describe('user add tests', () => {
  beforeEach(async () => {
    await User.deleteMany({})
  })
  
  test('a user can be added to the database', async () => {
    const user = {
      username: "test_user",
      name: "Mr Tester",
      password: "test1234"
    }

    const res = await api.post('/api/users').send(user).expect(201)
    assert.strictEqual(res.body.username, "test_user")
    assert(!res.body.hasOwnProperty("password"))
    assert(res.body.hasOwnProperty('id'))
  })

  test('a user with no usernanme cannot be added to the database', async () => {
    const user = {
      name: "Mr Tester",
      password: "test1234"
    }

    const res = await api.post('/api/users').send(user).expect(400)
  })

  test('a user with a short usernanme cannot be added to the database', async () => {
    const user = {
      username: "te",
      name: "Mr Tester",
      password: "test1234"
    }

    const res = await api.post('/api/users').send(user).expect(400)
  })

  test('a user with no password cannot be added to the database', async () => {
    const user = {
      username: "test",
      name: "Mr Tester",
    }

    const res = await api.post('/api/users').send(user).expect(400)
  })

  test('a user with a short password cannot be added to the database', async () => {
    const user = {
      username: "test",
      name: "Mr Tester",
      password: "te"
    }

    const res = await api.post('/api/users').send(user).expect(400)
  })
})

after(async () => {
  await mongoose.connection.close()
})