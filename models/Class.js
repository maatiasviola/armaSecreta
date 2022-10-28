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
    usuario: {
        type:Schema.Types.ObjectId,
        ref:'User'
    },
    profesor:{
        type:Schema.Types.ObjectId,
        ref:'Profesor'
    },
    srcImagen: String,
    materia:Number,
    calificaciones:[{
        type:Schema.Types.ObjectId,
        ref:'ClassRating'
    }],
    comentarios:[{
        type:Schema.Types.ObjectId,
        ref:'ClassComment'
    }]
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