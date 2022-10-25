const {Schema,model} = require('mongoose')

//Como se guardan los datos a nivel de aplicacion
const classSchema = new Schema({ 
    nombre: String,
    descripcion: String,
    tipoClase: String,
    frecuencia: String,
    calificacion: Number,
    esNueva: Boolean,
    duracion: Number,
    costo: Number,
    idProfesor: {
        type:Schema.Types.ObjectId,
        ref:'Profesor'
    },
    srcImagen: String,
    materia:{
        type:Schema.Types.ObjectId,
        ref:'Materia'
    }
})

classSchema.set('toJSON',{
    transform:(document,returnedObject)=>{
        returnedObject.id=returnedObject._id
        delete returnedObject._id
        delete returnedObject.__v
    }
})

const Class = model('Class',classSchema)

module.exports=Class