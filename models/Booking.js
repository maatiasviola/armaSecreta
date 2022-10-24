//contrataciones
const {Schema,model} = require('mongoose')

//Como se guardan los datos a nivel de aplicacion
const bookingSchema = new Schema({ 
    idClase:{
        type:Schema.Types.ObjectId,
        ref:'Class'
    },
    email:String,
    nroTelefono:String,
    horarioReferencia:String,
    motivoInteres:String,
    estado:String
})

bookingSchema.set('toJSON',{
    transform:(document,returnedObject)=>{
        returnedObject.id=returnedObject._id
        delete returnedObject._id
        delete returnedObject.__v
    }
})

const Booking = model('booking',bookingSchema)

module.exports=Booking