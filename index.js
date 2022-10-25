require('./mongo')

const express = require('express')
const app = express()
const usersRouter = require('./controllers/users')
const classesRouter = require('./controllers/classes')
const profesorsRouter = require('./controllers/profesors')
const studentsRouter=require('./controllers/students')

app.use(express.json())

//app.*** indica el tipo de la peticion
app.get('/', function (req, res) {
  res.send('Hello World')
})

app.use('/api/users',usersRouter)
app.use('/api/classes',classesRouter)
app.use('/api/profesors',profesorsRouter)
app.use('/api/students',studentsRouter)

const PORT = process.env.PORT
app.listen(PORT,()=>console.log(`servidor corriendo en puerto ${PORT}`))