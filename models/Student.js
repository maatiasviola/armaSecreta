const {Schema,model} = require('mongoose')

//Como se guardan los datos a nivel de aplicacion
const studentSchema = new Schema({ 
    idUsuario:{
        type:Schema.Types.ObjectId,
        ref:'User'
    },
    fechaNacimiento:Date,
    mayorEstudioCursado:String,
    mayorEstudioFinalizado:String
})

studentSchema.set('toJSON',{
    transform:(document,returnedObject)=>{
        returnedObject.id=returnedObject._id
        delete returnedObject._id
        delete returnedObject.__v
    }
})

const Student = model('Student',studentSchema)

module.exports=Student