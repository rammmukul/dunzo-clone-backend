const mongoose = require('mongoose')
const coord = require('../schema/location')

const runnerSchema = new mongoose.Schema({
  name: { type: String, required: true },
  emailID: { type: String, required: true },
  profilePicture: { type: String, default: null },
  currentOrder: { type: mongoose.Schema.Types.ObjectId, ref: 'Order' },
  pastOrders: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Order' }],
  jwt: { type: Array, default: null },
  firstSignedIn: { type: Date, default: null },
  recentSignedIn: { type: Date, default: null },
  location: {type: coord}
})

module.exports = mongoose.model('Runner', runnerSchema)
