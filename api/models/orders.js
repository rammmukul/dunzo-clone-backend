const mongoose = require('mongoose')
const Coord = require('../schema/location')

const orderSchema = new mongoose.Schema({
  description: { type: String, required: true },
  fromAddr: {type: String, required: true},
  toAddr: {type: String, required: true},
  from: { type: Coord, required: true },
  to: { type: Coord, required: true },
  user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  runner: { type: mongoose.Schema.Types.ObjectId, ref: 'Runner' },
  status: { type: String, required: true, default: 'placed' },
  placedOn: { type: Date, default: Date() }
})

module.exports = mongoose.model('Order', orderSchema)
