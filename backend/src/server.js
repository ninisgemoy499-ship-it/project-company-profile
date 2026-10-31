import app from './app.js'
import { env } from './config/env.js'
import { checkDatabaseConnection, disconnectDatabase } from './database/prisma.js'

async function startServer() {
  await checkDatabaseConnection()
  app.listen(env.PORT, () => {
    console.log(`API running at http://localhost:${env.PORT}`)
  })
}

startServer().catch(async (error) => {
  console.error('Unable to start API:', error)
  await disconnectDatabase()
  process.exit(1)
})
