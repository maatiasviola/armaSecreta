require('./mongo')

const express = require('express')
const app = express()
const usersRouter = require('./controllers/users')

//app.*** indica el tipo de la peticion
app.get('/', function (req, res) {
  res.send('Hello World')
})

app.use('./api/users',usersRouter)

const PORT = process.env.PORT
app.listen(PORT,()=>console.log(`servidor corriendo en puerto ${PORT}`))