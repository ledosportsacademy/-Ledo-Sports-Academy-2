const mongoose = require('mongoose');

const PaymentSchema = new mongoose.Schema({
  date: {
    type: Date,
    required: true
  },
  amount: {
    type: Number,
    required: true
  },
  status: {
    type: String,
    enum: ['paid', 'pending', 'overdue'],
    default: 'pending'
  }
});

const WeeklyFeeSchema = new mongoose.Schema({
  memberId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Member',
    required: true
  },
  memberName: {
    type: String,
    required: true
  },
  payments: [PaymentSchema]
}, {
  timestamps: true
});

module.exports = mongoose.model('WeeklyFee', WeeklyFeeSchema);