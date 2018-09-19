const mongoose = require('mongoose')

const subscriptionSchema = new mongoose.Schema({
  subscription: { type: Object, required: true },
  userType: {type: String, required: true},
  userID: {type: String, required: true}
})

module.exports = mongoose.model('Subscription', subscriptionSchema)
