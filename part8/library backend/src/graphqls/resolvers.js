import { PubSub } from 'apollo-server'
import { UserInputError, AuthenticationError } from 'apollo-server'
import jwt from 'jsonwebtoken'

import Author from '../models/author.js'
import Book from '../models/book.js'
import config from '../config.js'
import User from '../models/user.js'

const pubsub = new PubSub()

const resolvers = {
  Query: {
    bookCount: async () => {
      const res = await Book.find()
      return res.length
    },
    authorCount: async () => {
      const res = await Author.find()
      return res.length
    },
    allBooks: async (_, args) => {
      let res = await Book.find()

      if (args.author) {
        res = res.filter(book => book.author.name === args.author)
      }

      if (args.genre) {
        res = res.filter(book => book.genres.includes(args.genre))
      }

      return res
    },
    allAuthors: async () => await Author.find(),
    me: (_root, _args, context) => {
      return context.currentUser
    }
  },
  Author: {
    bookCount: async (root) => {
      const books = await Book.find({ author: root.id })
      return books.length
    }
  },
  Book: {
    author: async (root) => {
      const author = await Author.findById(root.author)
      return {
        id: author.id,
        name: author.name,
        born: author.born
      }
    }
  },
  Mutation: {
    addBook: async (_, args, context) => {
      const currentUser = context.currentUser
      if (!currentUser) {
        throw new AuthenticationError("not authenticated")
      }

      let author = await Author.findOne({ name: args.author })

      if (!author) {
        author = await new Author({ name: args.author }).save()
      }

      const book = new Book({
        title: args.title,
        published: args.published,
        author,
        genres: args.genres
      })

      try {
        await book.save()
      } catch (error) {
        throw new UserInputError(error.message, { invalidArgs: args })
      }

      pubsub.publish('BOOK_ADDED', { bookAdded: book })

      return book
    },
    editAuthor: async (_, args, context) => {
      const currentUser = context.currentUser
      if (!currentUser) {
        throw new AuthenticationError("not authenticated")
      }

      let author = await Author.findOne({ name: args.name })

      if (author) {
        author.born = args.born
        await author.save()
      }

      return author
    },
    createUser: async (_, args) => {
      return await new User({ ...args }).save().catch(error => {
        throw new UserInputError(error.message, {
          invalidArgs: args
        })
      })
    },
    login: async (_, args) => {
      const user = await User.findOne({ username: args.username })

      if (!user || args.password !== config.USER_COMMON_PASSWORD) {
        throw new UserInputError("wrong credentials")
      }

      const userForToken = {
        username: user.username,
        id: user._id,
      }

      return { value: jwt.sign(userForToken, config.JWT_SECRET) }
    }
  },
  Subscription: {
    bookAdded: {
      subscribe: () => pubsub.asyncIterator(['BOOK_ADDED'])
    }
  }
}

export default resolvers
