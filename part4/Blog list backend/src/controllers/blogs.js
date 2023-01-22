import 'express-async-errors'
import express from 'express'
import jwt from 'jsonwebtoken'

import { Blog } from '../models/blog.js'
import { User } from '../models/user.js'

const blogsRouter = express.Router()

const verify = (request, response) => {
  const decodedToken = jwt.verify(request.token, process.env.SECRET)
  if (!request.token || !decodedToken.id) {
    response.status(401).json({ error: 'token missing or invalid' })
  }

  return decodedToken
}

blogsRouter.get('/', async (request, response) => {
  const decodedToken = verify(request, response)
  const blogs = await Blog.find({ 'user': decodedToken.id }).populate(
    'user', { 'username': 1, 'name': 1 }
  )
  response.json(blogs)
})

blogsRouter.post('/', async (request, response) => {
  const decodedToken = verify(request, response)
  const user = await User.findById(decodedToken.id)
  const body = request.body

  const blog = new Blog({
    "title": body.title,
    "author": body.author,
    "url": body.url,
    "likes": body.likes,
    "user": user._id
  })

  const savedBlog = await blog.save()
  user.blogs = user.blogs.concat(savedBlog._id)
  await user.save()

  response.status(201).json(savedBlog)
})


blogsRouter.get('/:id', async (request, response) => {
  verify(request, response)
  const blog = await Blog.findById(request.params.id)
  if (blog) {
    response.json(blog.toJSON())
  }

  response.status(404).end()
})

blogsRouter.put('/:id', async (request, response) => {
  verify(request, response)

  if (await Blog.findById(request.params.id)) {
    const body = request.body
    const blog = {
      "title": body.title,
      "author": body.author,
      "url": body.url,
      "likes": body.likes
    }
    const updatedBlog = await Blog.findByIdAndUpdate(
      request.params.id, blog, { new: true }
    )
    response.json(updatedBlog.toJSON())
  }

  response.status(404).end()
})

blogsRouter.post('/:id/comments', async (request, response) => {
  verify(request, response)

  const blog = await Blog.findById(request.params.id)
  if (blog) {
    const comment = request.body.comment
    const newBlog = {
      "title": blog.title,
      "author": blog.author,
      "url": blog.url,
      "likes": blog.likes,
      "comments": blog.comments.concat(comment)
    }
    const updatedBlog = await Blog.findByIdAndUpdate(
      request.params.id, newBlog, { new: true }
    )
    response.json(updatedBlog.toJSON())
  }

  response.status(404).end()
})

blogsRouter.delete('/:id', async (request, response) => {
  verify(request, response)
  const user = await User.findById(request.params.id)
  const blog = await Blog.findById(request.params.id)

  if (blog.user.toString() !== user.id.toString()) {
    return response.status(401).json({ error: 'only the creator can delete blogs' })
  }

  user.blogs = user.blogs.filter(
    b => b.toString() !== blog.id.toString()
  )
  await blog.remove()
  await user.save()
  response.status(204).end()
})

export { blogsRouter }
