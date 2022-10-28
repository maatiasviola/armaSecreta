//crear un router de forma separada a lo que tenemos en el indice para usarlo despues
const usersRouter = require('express').Router()
const User = require('../models/User')

const bcrypt=require('bcrypt')

//El path es ahora relativo al indicado en el indice

usersRouter.get('/',async(request,response)=>{
    const users= await User.find({})
    console.log(users)
    response.json(users)
})

usersRouter.post('/',async(request,response)=>{
    const {body}= request
    const { 
        nombre,
        apellido,
        srcImagen,
        email,
        password,
        preguntaVerificacion,
        respuestaVerificacion,
        nroTelefono,
        rol
    }=body

    //hasheo la password, el segundo param indica la complejidad algoritmica con que hasheo
    const passwordHash=await bcrypt.hash(password,10)

    const user = new User({
        nombre,
        apellido,
        srcImagen,
        email,
        passwordHash,
        preguntaVerificacion,
        respuestaVerificacion,
        nroTelefono,
        rol  
       })

    const savedUser=await user.save()
    response.json(savedUser)
})

usersRouter.get('/:id',async(request,response)=>{
    const {id}=request.params
    const user= await User.findById(id).populate('clases')
    console.log(user)
    response.json(user)
})

usersRouter.delete('/:id',async(request,response)=>{
    const {id}=request.params
    const user= await User.findByIdAndDelete(id)
    console.log(user)
    response.json(user)
})


module.exports=usersRouter