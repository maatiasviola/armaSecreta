const studentsRouter = require('express').Router()
const Student = require('../models/Student')
const User = require('../models/User')

studentsRouter.get('/',async (request,response)=>{
    const students = await Student.find({})
    console.log(students)
    response.json(students)
})

studentsRouter.post('/',async(request,response)=>{
    const {body} = request
    const {
        idUsuario,
        fechaNacimiento,
        mayorEstudioCursado,
        mayorEstudioFinalizado
    }=body

    const user = await User.findById(idUsuario)
    
    const student = new Student({
        idUsuario:user._id,
        fechaNacimiento,
        mayorEstudioCursado,
        mayorEstudioFinalizado
    })

    const savedStudent = await student.save()
    response.json(savedStudent)

})

module.exports=studentsRouter