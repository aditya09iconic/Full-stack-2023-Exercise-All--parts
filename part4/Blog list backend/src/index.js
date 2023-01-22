import { app } from './app.js'
import config from './config.js'
import logger from './utils/logger.js'

const PORT = config.PORT || 3001
app.listen(PORT, () => {
  logger.info(`Server running on port ${PORT}`)
})
