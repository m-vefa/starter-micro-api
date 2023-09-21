const mongoose = require('mongoose');

const Schema = mongoose.Schema;
const OrdersSchema = new Schema({
  email: {
    type: String,
    required: true,
  },
  phone: {
    type: String,
    required: true,
  },
  product: {
    type: String,
    required: true,
  },
  quantity: {
    type: String,
    required: true,
  },
});
module.exports = mongoose.model('orders', OrdersSchema);