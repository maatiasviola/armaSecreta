const classRatingsRouter = require('express').Router()
const Class = require('../models/Class')
const ClassRating = require('../models/ClassRating')
const jwt = require('jsonwebtoken')
const User = require('../models/User')
require('dotenv').config()
//El path es ahora relativo al indicado en el indice

classRatingsRouter.post('/',async(request,response)=>{
    const {body}= request
    const { 
        idClase,
        calificacion
    }=body

    console.log("idClase ",idClase)

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
    console.log("usuario encontrado: ",user)
    
    const clase = await Class.findOne({idClase})    
    console.log("clase encontrada: ",clase)

    const classRating = new ClassRating({
        idClase:clase._id,
        idUsuario:user._id,
        calificacion
       })
    
    try{
        const savedClassRating=await classRating.save()
        clase.calificaciones=clase.calificaciones.concat(savedClassRating._id)
        await clase.save()
        response.json(savedClassRating)
    }catch(error){
        console.log(error)
    }
})


module.exports=classRatingsRouter