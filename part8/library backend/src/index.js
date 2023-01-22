import { ApolloServer } from 'apollo-server'
import jwt from 'jsonwebtoken'
import mongoose from 'mongoose'

import config from './config.js'
import logger from './logger.js'
import resolvers from './graphqls/resolvers.js'
import typeDefs from './graphqls/typeDefs.js'
import User from './models/user.js'

logger.info('connecting to', config.MONGODB_URL)

mongoose.connect(config.MONGODB_URL, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useCreateIndex: true,
  useFindAndModify: false
}).then(() => {
  logger.info('connected to MongoDB')
}).catch((error) => {
  logger.info('error connecting to MongoDB:', error.message)
})

const server = new ApolloServer({
  typeDefs,
  resolvers,
  context: async ({ req }) => {
    const auth = req ? req.headers.authorization : null

    if (auth && auth.toLowerCase().startsWith('bearer ')) {
      const decodedToken = jwt.verify(
        auth.substring(7),
        config.JWT_SECRET
      )

      const currentUser = await User.findById(decodedToken.id)
      return { currentUser }
    }
  }
})

server.listen(config.PORT).then(({ url }) => {
  logger.info(`Server ready at ${url}`)
})
