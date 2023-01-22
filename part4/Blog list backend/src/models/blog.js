import mongoose from 'mongoose'

const blogSchema = new mongoose.Schema({
  'title': { 'type': String, 'required': true },
  'author': { 'type': String, 'required': true },
  'url': { 'type': String, 'required': true },
  'likes': { 'type': Number, 'default': 0 },
  'user': {
    'type': mongoose.Schema.Types.ObjectId,
    'ref': 'User'
  },
  'comments': []
})

blogSchema.set('toJSON', {
  transform: (_, returnedObject) => {
    returnedObject.id = returnedObject._id.toString()
    delete returnedObject._id
    delete returnedObject.__v
  }
})

const Blog = mongoose.model('Blog', blogSchema)

export { Blog }
