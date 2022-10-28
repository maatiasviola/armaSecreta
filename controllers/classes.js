const classesRouter = require('express').Router()
const Class = require('../models/Class')
const Profesor = require('../models/Profesor')
const jwt = require('jsonwebtoken')
const User = require('../models/User')
require('dotenv').config()
//El path es ahora relativo al indicado en el indice

classesRouter.get('/',async(request,response)=>{
    const classes= await Class.find({})
    response.json(classes)
})

classesRouter.post('/',async(request,response)=>{
    const {body}= request
    const { 
        nombre,
        descripcion,
        tipoClase,
        frecuencia,
        duracion,
        costo,
        srcImagen,
        materia
    }=body

    //autorizacion
    const authorization = request.get('authorization')
    let token=null
    if(authorization && authorization.toLowerCase().startsWith('bearer')){
        token=authorization.substring(7)
    }

    //verifico que puedo abrir el token con la palabra secreta
    let decodedToken = {}
    decodedToken=jwt.verify(token,process.env.SECRETWORD)

    if(!token || !decodedToken.id){
        return response.status(401).json({error:'token missing or invalid'})
    }
    const {id:userId}=decodedToken

    const user=await User.findOne({userId})
    const profesor = await Profesor.findOne({userId})
    console.log(profesor)
    const clase = new Class({
        nombre,
        descripcion,
        tipoClase,
        frecuencia,
        duracion,
        costo,
        usuario:user._id,
        profesor:profesor._id,
        srcImagen,
        materia  
       })
    
    try{
        const savedClass=await clase.save()
        user.clases=user.clases.concat(savedClass._id)
        await user.save()
    }catch(error){
        console.log(error)
    }
})

classesRouter.get('/:id',async(request,response)=>{
    const {id}=request.params
    const clase= await Class.findById(id)
                            .populate("calificaciones")
                            .populate("comentarios")
                            .populate("profesor")
                            .populate("usuario")
    console.log(clase)
    response.json(clase)
})

classesRouter.delete('/:id',async(request,response)=>{
    const {id}=request.params
    const clase= await Class.findByIdAndDelete(id)
    console.log(clase)
    response.json(clase)
})


module.exports=classesRouter