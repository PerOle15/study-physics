const express = require('express')
const path = require('path')
const dotenv = require('dotenv')
const colors = require('colors')

dotenv.config({ path: './config/config.env' })

const users = require('./routes/users')

const app = express()

app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*')
  next()
})

app.use(express.json())

app.use('/', users)

const PORT = process.env.PORT || 5000
const server = app.listen(PORT, () => {
  console.log(`Server running on port ${PORT} in ${process.env.NODE_ENV} mode`)
})

server.on('unhandledRejection', (err, promise) => {
  console.log(`Error: ${err.message}`.red)
  // Close server & exit process
  server.close(() => process.exit(1))
})
