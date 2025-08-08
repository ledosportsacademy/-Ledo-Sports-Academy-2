const mongoose = require('mongoose');

const ExpenseSchema = new mongoose.Schema({
  description: {
    type: String,
    required: true
  },
  amount: {
    type: Number,
    required: true
  },
  date: {
    type: Date,
    required: true
  },
  category: {
    type: String,
    required: true
  },
  vendor: {
    type: String,
    required: true
  },
  paymentMethod: {
    type: String,
    required: true
  }
}, {
  timestamps: true
});

module.exports = mongoose.model('Expense', ExpenseSchema);