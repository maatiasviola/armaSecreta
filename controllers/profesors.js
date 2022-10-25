const profesorsRouter = require('express').Router()
const Profesor = require('../models/Profesor')
const User = require('../models/User')

profesorsRouter.get('/',async (request,response)=>{
    const profesors = await Profesor.find({})
    console.log(profesors)
    response.json(profesors)
})

profesorsRouter.post('/',async(request,response)=>{
    const {body} = request
    const {
        idUsuario,
        titulo,
        experiencia
    }=body

    console.log(body)
    const user = await User.findById(idUsuario)
    
    const profesor = new Profesor({
        idUsuario:user._id,
        titulo,
        experiencia
    })

    const savedProfesor = await profesor.save()
    response.json(savedProfesor)

})

module.exports=profesorsRouter