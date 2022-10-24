const {Schema,model} = require('mongoose')

//Como se guardan los datos a nivel de aplicacion
const profesorSchema = new Schema({ 
    idUsuario:{
        type:Schema.Types.ObjectId,
        ref:'User'
    },
    titulo:String,
    experiencia: String
})

profesorSchema.set('toJSON',{
    transform:(document,returnedObject)=>{
        returnedObject.id=returnedObject._id
        delete returnedObject._id
        delete returnedObject.__v
    }
})

const Profesor = model('profesor',profesorSchema)

module.exports=Profesor