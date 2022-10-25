const classesRouter = require('express').Router()
const Class = require('../models/Class')

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
        idProfesor,
        srcImagen,
        materia
    }=body
    
    const clase = new Class({
        nombre,
        descripcion,
        tipoClase,
        frecuencia,
        duracion,
        costo,
        idProfesor,
        srcImagen,
        materia  
       })

    const savedClass=await clase.save()
    response.json(savedClass)
})

classesRouter.get('/:id',async(request,response)=>{
    const {id}=request.params
    const clase= await Class.findById(id)
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