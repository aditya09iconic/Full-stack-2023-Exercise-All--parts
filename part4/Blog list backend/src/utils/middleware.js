import logger from './logger.js'

const unknownEndpoint = (_, response) => {
  response.status(404).send({
    'error': 'unknown endpoint'
  })
}

const errorHandler = (error, _, response, next) => {
  logger.info(error.message)

  if (error.name === 'CastError' && error.kind === 'ObjectId') {
    return response.status(400).send({ "error": 'malformatted id' })
  } else if (error.name === 'ValidationError') {
    return response.status(400).json({ "error": error.message })
  } else if (error.name === 'JsonWebTokenError') {
    return response.status(401).json({ "error": 'invalid token' })
  }

  next(error)
}

const tokenExtractor = (request, _, next) => {
  const authorization = request.get('authorization')

  request.token = null
  if (authorization && authorization.toLowerCase().startsWith('bearer ')) {
    request.token = authorization.substring(7)
  }

  next()
}

export {
  unknownEndpoint,
  errorHandler,
  tokenExtractor
}
