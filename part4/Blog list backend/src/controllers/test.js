import express from 'express'

import { Blog } from '../models/blog.js'
import { User } from '../models/user.js'

const testRouter = express.Router()

testRouter.post('/reset', async (_, response) => {
  await Blog.deleteMany({})
  await User.deleteMany({})

  response.status(204).end()
})

export { testRouter }
