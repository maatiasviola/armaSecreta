const {Schema,model} = require('mongoose')

//Como se guardan los datos a nivel de aplicacion
const classRatingSchema = new Schema({ 
    idClase:{
        type:Schema.Types.ObjectId,
        ref:'Class'
    },
    idAlumno:{
        type:Schema.Types.ObjectId,
        ref:'Student'
    },
    calificacion:Number
})

classRatingSchema.set('toJSON',{
    transform:(document,returnedObject)=>{
        returnedObject.id=returnedObject._id
        delete returnedObject._id
        delete returnedObject.__v
    }
})

const ClassRating = model('ClassRating',classRatingSchema)

module.exports=ClassRating