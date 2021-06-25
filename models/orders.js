const mongoose = require('mongoose')

const ordersSchema = new mongoose.Schema({
    customerId:{
        type: mongoose.SchemaTypes.ObjectId, // here, we use the builtin mongoDB ID from Customers servoce
        required:true
    },
    bookId: {
        type: mongoose.SchemaTypes.ObjectId, // here, we use a valid builtin mongoDB ID from Books servoce
        required:true
    },
    initialDate: {
        type: Date, //js format - YY-MM-DD
        required:true
    }, 
    deliveryDate:{
        type: Date, //js format - YY-MM-DD
        required:true
    }
})
const Orders = mongoose.model("Orders", ordersSchema)
module.exports = Orders;

//4msJglzx8IgqjPBR