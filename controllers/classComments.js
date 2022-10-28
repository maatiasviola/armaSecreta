const classCommentsRouter = require('express').Router()
const Class = require('../models/Class')
const ClassComment = require('../models/ClassComment')
const jwt = require('jsonwebtoken')
const User = require('../models/User')
require('dotenv').config()
//El path es ahora relativo al indicado en el indice

classCommentsRouter.post('/',async(request,response)=>{
    const {body}= request
    const { 
        idClase,
        texto
    }=body

    console.log("idClase ",idClase)
    console.log("texto ",texto)

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

    const classComment = new ClassComment({
        idClase:clase._id,
        idUsuario:user._id,
        texto,
        bloqueado:false
       })
    
    try{
        const savedClassComment=await classComment.save()
        clase.comentarios=clase.comentarios.concat(savedClassComment._id)
        await clase.save()
        response.json(savedClassComment)
    }catch(error){
        console.log(error)
    }
})


module.exports=classCommentsRouter