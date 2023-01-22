import bcrypt from 'bcrypt'
import mongoose from 'mongoose'
import supertest from 'supertest'

import { app } from '../src/app.js'
import { Blog } from '../src/models/blog.js'
import { User } from '../src/models/user.js'
import helper from './test_helper.js'

const api = supertest(app)


beforeEach(async () => {
  await Blog.deleteMany({})
  await User.deleteMany({})

  const saltRounds = 10
  const passwordHash = await bcrypt.hash(helper.initialUser.password, saltRounds)

  const user = new User({
    "username": helper.initialUser.username,
    "name": helper.initialUser.name,
    passwordHash,
  })
  const savedUser = await user.save()

  const blogObjects = helper.initialBlogs.map(blog =>
    new Blog({ ...blog, "user": savedUser._id })
  )

  const promiseArray = blogObjects.map(blog => blog.save())
  await Promise.all(promiseArray)
})


test('blogs are returned as json', async () => {
  await api
    .get('/api/blogs')
    .expect(200)
    .expect('Content-Type', 'application/json; charset=utf-8')
})

test('length of the blogs are returned', async () => {
  const response = await api.get('/api/blogs')
  expect(response.body).toHaveLength(helper.initialBlogs.length)
})

test('check blog Schema have id attribute or not', async () => {
  const response = await api.get('/api/blogs')
  const result = response.body.map(r => r.id)

  expect(result[0]).toBeDefined()
})


describe('With logining status', () => {
  let token = null

  const newBlog = {
    "title": "Canonical string reduction",
    "author": "Edsger W. Dijkstra",
    "url": "http://www.cs.utexas.edu/~EWD/transcriptions/EWD08xx/EWD808.html",
    "likes": 12
  }

  beforeEach(async () => {
    const returnedBody = await api.post('/api/login').send({
      "username": "test1",
      "password": "test1"
    })

    token = returnedBody.body.token
  })

  test('a valid blog can be added', async () => {
    await api
      .post('/api/blogs')
      .set('Authorization', 'bearer ' + token)
      .send(newBlog)
      .expect(201)

    const response = await api.get('/api/blogs')
    const result = response.body.map(r => r.title)

    expect(response.body).toHaveLength(helper.initialBlogs.length + 1)
    expect(result).toContain('Canonical string reduction')
  })

  test('a blog missed likes attribute can be the default value', async () => {
    const newBlogPart = {
      "title": newBlog.title,
      "author": newBlog.author,
      "url": newBlog.url,
    }

    const response = await api
      .post('/api/blogs')
      .set('Authorization', 'bearer ' + token)
      .send(newBlogPart)
    expect(response.body.likes).toBe(0)
  })

  test('a invalid blog missed title and url can be returned 400 status', async () => {
    const newBlogPart = {
      "author": newBlog.author,
      "likes": 0,
    }

    await api
      .post('/api/blogs')
      .set('Authorization', 'bearer ' + token)
      .send(newBlogPart)
      .expect(400)
  })

  test('unauthorized blog can be returned 401 status', async () => {
    const newBlogPart = {
      "title": newBlog.title,
      "author": newBlog.author,
      "url": newBlog.url
    }

    await api
      .post('/api/blogs')
      .send(newBlogPart)
      .expect(401)
  })
})


afterAll(() => {
  mongoose.connection.close()
})
