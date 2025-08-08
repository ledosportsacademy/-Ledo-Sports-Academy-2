const express = require('express');
const router = express.Router();
const WeeklyFee = require('../models/WeeklyFee');
const Member = require('../models/Member');

// Get all weekly fees
router.get('/', async (req, res) => {
  try {
    const weeklyFees = await WeeklyFee.find();
    res.json(weeklyFees);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Get weekly fees for a specific member
router.get('/member/:memberId', async (req, res) => {
  try {
    const weeklyFee = await WeeklyFee.findOne({ memberId: req.params.memberId });
    if (!weeklyFee) return res.status(404).json({ message: 'Weekly fee record not found for this member' });
    res.json(weeklyFee);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Create a weekly fee record
router.post('/', async (req, res) => {
  try {
    // Check if member exists
    const member = await Member.findById(req.body.memberId);
    if (!member) return res.status(404).json({ message: 'Member not found' });

    // Check if weekly fee record already exists for this member
    const existingRecord = await WeeklyFee.findOne({ memberId: req.body.memberId });
    if (existingRecord) return res.status(400).json({ message: 'Weekly fee record already exists for this member' });

    const weeklyFee = new WeeklyFee({
      memberId: req.body.memberId,
      memberName: member.name,
      payments: req.body.payments || []
    });

    const newWeeklyFee = await weeklyFee.save();
    res.status(201).json(newWeeklyFee);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// Add a payment to a member's weekly fee record
router.post('/:id/payments', async (req, res) => {
  try {
    const weeklyFee = await WeeklyFee.findById(req.params.id);
    if (!weeklyFee) return res.status(404).json({ message: 'Weekly fee record not found' });

    weeklyFee.payments.push({
      date: req.body.date,
      amount: req.body.amount,
      status: req.body.status || 'pending'
    });

    const updatedWeeklyFee = await weeklyFee.save();
    res.json(updatedWeeklyFee);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// Update a payment status
router.put('/:id/payments/:paymentId', async (req, res) => {
  try {
    const weeklyFee = await WeeklyFee.findById(req.params.id);
    if (!weeklyFee) return res.status(404).json({ message: 'Weekly fee record not found' });

    const payment = weeklyFee.payments.id(req.params.paymentId);
    if (!payment) return res.status(404).json({ message: 'Payment not found' });

    if (req.body.status) payment.status = req.body.status;
    if (req.body.amount) payment.amount = req.body.amount;
    if (req.body.date) payment.date = req.body.date;

    const updatedWeeklyFee = await weeklyFee.save();
    res.json(updatedWeeklyFee);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// Delete a weekly fee record
router.delete('/:id', async (req, res) => {
  try {
    const weeklyFee = await WeeklyFee.findById(req.params.id);
    if (!weeklyFee) return res.status(404).json({ message: 'Weekly fee record not found' });

    await weeklyFee.deleteOne();
    res.json({ message: 'Weekly fee record deleted' });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Get payment statistics
router.get('/stats/payments', async (req, res) => {
  try {
    const weeklyFees = await WeeklyFee.find();
    
    let stats = {
      paid: 0,
      pending: 0,
      overdue: 0,
      totalAmount: 0,
      paidAmount: 0,
      pendingAmount: 0,
      overdueAmount: 0
    };
    
    weeklyFees.forEach(fee => {
      fee.payments.forEach(payment => {
        stats.totalAmount += payment.amount;
        
        if (payment.status === 'paid') {
          stats.paid++;
          stats.paidAmount += payment.amount;
        } else if (payment.status === 'pending') {
          stats.pending++;
          stats.pendingAmount += payment.amount;
        } else if (payment.status === 'overdue') {
          stats.overdue++;
          stats.overdueAmount += payment.amount;
        }
      });
    });
    
    res.json(stats);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

module.exports = router;