const express = require('express');
const router = express.Router();
const Donation = require('../models/Donation');

// Get all donations
router.get('/', async (req, res) => {
  try {
    const donations = await Donation.find().sort({ date: -1 });
    res.json(donations);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Get a single donation
router.get('/:id', async (req, res) => {
  try {
    const donation = await Donation.findById(req.params.id);
    if (!donation) return res.status(404).json({ message: 'Donation not found' });
    res.json(donation);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Create a donation
router.post('/', async (req, res) => {
  const donation = new Donation({
    donorName: req.body.donorName,
    amount: req.body.amount,
    date: req.body.date,
    purpose: req.body.purpose
  });

  try {
    const newDonation = await donation.save();
    res.status(201).json(newDonation);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// Update a donation
router.put('/:id', async (req, res) => {
  try {
    const donation = await Donation.findById(req.params.id);
    if (!donation) return res.status(404).json({ message: 'Donation not found' });

    if (req.body.donorName) donation.donorName = req.body.donorName;
    if (req.body.amount) donation.amount = req.body.amount;
    if (req.body.date) donation.date = req.body.date;
    if (req.body.purpose) donation.purpose = req.body.purpose;

    const updatedDonation = await donation.save();
    res.json(updatedDonation);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// Delete a donation
router.delete('/:id', async (req, res) => {
  try {
    const donation = await Donation.findById(req.params.id);
    if (!donation) return res.status(404).json({ message: 'Donation not found' });

    await donation.deleteOne();
    res.json({ message: 'Donation deleted' });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Get total donations
router.get('/stats/total', async (req, res) => {
  try {
    const result = await Donation.aggregate([
      {
        $group: {
          _id: null,
          total: { $sum: '$amount' }
        }
      }
    ]);
    
    const total = result.length > 0 ? result[0].total : 0;
    res.json({ total });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

module.exports = router;