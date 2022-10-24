const classesRouter = require('express').Router()
const Class = require('../models/Class')

//El path es ahora relativo al indicado en el indice

classesRouter.get('/',async(request,response)=>{
    const classes= await Class.find({})
    response.json(classes)
})

module.exports=classesRouter