const mongoose = require('mongoose');

const MemberSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  contact: {
    type: String,
    required: true
  },
  phone: {
    type: String,
    required: true
  },
  joinDate: {
    type: Date,
    required: true
  },
  role: {
    type: String,
    required: true
  },
  image: {
    type: String,
    required: true
  }
}, {
  timestamps: true
});

module.exports = mongoose.model('Member', MemberSchema);