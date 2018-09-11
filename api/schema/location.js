const mongoose = require('mongoose')

module.exports = new mongoose.Schema({
  type: { $type: String, default: 'Point' },
  coordinates: { $type: [Number], required: true, index: '2dsphere' }
}, {typeKey: '$type'})
