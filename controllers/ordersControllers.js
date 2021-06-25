const mongoose = require('mongoose')
const Orders = require("../models/orders");
const axios = require('axios')


exports.createOrder = async (req, res) => {
  try {
    const payload = {
      customerId: mongoose.Types.ObjectId(req.body.customerId), //needs to be a valid existing customerId created in 'customer service'
      bookId: mongoose.Types.ObjectId(req.body.bookId),
      initialDate: req.body.initialDate,
      deliveryDate: req.body.deliveryDate,
    };
    const order = new Orders(payload);
    await order.save();
    res.send(order);
  } catch (e) {
    res.status(500).send(e);
  }
};

exports.getAllOrders = async (req, res) => {
    try{
        const orders = await Orders.find({})
        res.send(orders)

    }catch(e){
        res.status(500).send(e)
    }
}

exports.getOrderById = async (req, res) => {
    try{
        const id = req.params.id; //valid order id passed as param
        const order = await Orders.findById(id)
        if(!order){
           return res.status(404).send()
        }

        const {customerId, bookId} = order;
        //construct order object by getting customer name and book title from 'Customers' and 'Books' service
        //make req to customers service with the customerId gotten from 'Orders' service
        const customerByIdUrl = `http://localhost:8000/customer/${customerId}`;
        const customer = await axios.get(customerByIdUrl)
        const orderObj = {customerName :customer.data.name, bookTitle:''}

        //make req to books service with the bookId gotten from 'Orders' service
        const bookByIdUrl = `http://localhost:4545/book/${bookId}`;
        const book = await axios.get(bookByIdUrl)
        orderObj.bookTitle = book.data.title;
        res.send(orderObj)
    }catch(e){
        res.status(500).send(e)
    }
   
}


