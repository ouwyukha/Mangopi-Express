const express = require('express')
const { init } = require('./db')
const routes = require('./routes')

const port = 8081
const app = express()
app.use(express.json())
app.use(routes)
  
init().then(() => {
  app.listen(port, function () {
    console.log(`listening on ${port}`)
  })
})