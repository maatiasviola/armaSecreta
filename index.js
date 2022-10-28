require('./mongo')

const express = require('express')
const app = express()
const cors = require('cors')
const usersRouter = require('./controllers/users')
const classesRouter = require('./controllers/classes')
const profesorsRouter = require('./controllers/profesors')
const studentsRouter=require('./controllers/students')
const loginRouter = require('./controllers/login')
const classRatingsRouter = require('./controllers/classRatings')
const classCommentsRouter = require('./controllers/classComments')

app.use(cors())
app.use(express.json())

//app.*** indica el tipo de la peticion
app.get('/', function (req, res) {
  res.send('Hello World')
})

app.use('/api/users',usersRouter)
app.use('/api/login',loginRouter)
app.use('/api/classes',classesRouter)
app.use('/api/profesors',profesorsRouter)
app.use('/api/students',studentsRouter)
app.use('/api/ratings',classRatingsRouter)
app.use('/api/comments',classCommentsRouter)

const PORT = process.env.PORT
app.listen(PORT,()=>console.log(`servidor corriendo en puerto ${PORT}`))