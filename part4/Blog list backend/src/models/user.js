import mongoose from 'mongoose'
import uniqueValidator from 'mongoose-unique-validator'

const userSchema = mongoose.Schema({
  "username": { "type": String, "required": true, "unique": true },
  "name": { "type": String, "required": true },
  "passwordHash": String,
  "blogs": [
    {
      "type": mongoose.Schema.Types.ObjectId,
      "ref": "Blog"
    }
  ],
})

userSchema.set('toJSON', {
  transform: (_, returnedObject) => {
    returnedObject.id = returnedObject._id.toString()
    delete returnedObject._id
    delete returnedObject.__v
    delete returnedObject.passwordHash
  }
})

userSchema.plugin(uniqueValidator)

const User = mongoose.model('User', userSchema)

export { User }
