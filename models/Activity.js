const mongoose = require('mongoose');

const ActivitySchema = new mongoose.Schema({
  title: {
    type: String,
    required: true
  },
  date: {
    type: Date,
    required: true
  },
  time: {
    type: String,
    required: true
  },
  description: {
    type: String,
    required: true
  },
  image: {
    type: String,
    required: true
  },
  status: {
    type: String,
    enum: ['upcoming', 'recent', 'completed', 'cancelled'],
    default: 'upcoming'
  },
  type: {
    type: String,
    enum: ['match', 'event', 'training', 'trial', 'tournament', 'workshop'],
    required: true
  },
  priority: {
    type: String,
    enum: ['high', 'medium', 'low'],
    default: 'medium'
  },
  redirectUrl: {
    type: String,
    default: ''
  },
  openNewTab: {
    type: Boolean,
    default: false
  }
}, {
  timestamps: true
});

module.exports = mongoose.model('Activity', ActivitySchema);