const {Schema,model} = require('mongoose')

//Como se guardan los datos a nivel de aplicacion
const userSchema = new Schema({ 
    nombre:String,
    apellido:String,
    srcImagen:String,
    email:String,
    password:String,
    preguntaVerificacion:String,
    respuestaVerificacion:String,
    nroTelefono:String,
    rol:String,
    clases:[{
        type:Schema.Types.ObjectId,
        ref:'Class'
    }] 
})

userSchema.set('toJSON',{
    transform:(document,returnedObject)=>{
        returnedObject.id=returnedObject._id
        delete returnedObject._id
        delete returnedObject.__v
        delete returnedObject.password
    }
})

//permite crear instancias de este modelo
const User = model('user',userSchema)

module.exports=User