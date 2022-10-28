const jwt = require('jsonwebtoken')
const bcrypt = require('bcrypt')
const loginRouter = require('express').Router()
const User = require('../models/User')
require('dotenv').config()

loginRouter.post('/',async (request,response)=>{
    //obtenemos email y password
    const {body}=request
    const {email,password}=body

    const user = await User.findOne({email})
    
    console.log(password,user.passwordHash)
       //indica si password es correcto
    const passwordCorrect = user ===null
    ? false
    : await bcrypt.compare(password,user.passwordHash)

    if(!(user && passwordCorrect)){
        response.status(401).json({
            error:'invalid user or password'
        })
    }

    const userForToken={
        id:user._id,
        email:user.email
    }

    const token = jwt.sign(userForToken,process.env.SECRETWORD)

    response.send({
        id:user.id,
        token
    })

})

module.exports=loginRouter