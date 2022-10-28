const {Schema,model} = require('mongoose')

//Como se guardan los datos a nivel de aplicacion
const commentSchema = new Schema({ 
    idClase:{
        type:Schema.Types.ObjectId,
        ref:'Class'
    },
    idAlumno:{
        type:Schema.Types.ObjectId,
        ref:'Student'
    },
    texto:String,
    bloqueado:Boolean
})

commentSchema.set('toJSON',{
    transform:(document,returnedObject)=>{
        returnedObject.id=returnedObject._id
        delete returnedObject._id
        delete returnedObject.__v
    }
})

const ClassComment = model('ClassComment',commentSchema)

module.exports=ClassComment