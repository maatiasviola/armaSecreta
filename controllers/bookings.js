//crear un router de forma separada a lo que tenemos en el indice para usarlo despues
const usersRouter = require('express').Router()
const User = require('../models/User')

const bcrypt=require('bcrypt')

//El path es ahora relativo al indicado en el indice

usersRouter.get('/',async(request,response)=>{
    const users= awaitUser.find({})
    response.json(users)
})

usersRouter.post('/',async(request,response)=>{
    const {body}=request
    const {}=body

    //hasheo la password, el segundo param indica la complejidad algoritmica con que hasheo
    const passwordHash=await bcrypt.hash(password,10)

    const user = new User({
     passwordHash   
    })

    const savedUser=await user.save()
    response.json(savedUser)
})


module.exports=usersRouter