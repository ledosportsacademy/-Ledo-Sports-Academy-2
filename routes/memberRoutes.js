const express = require('express');
const router = express.Router();
const Member = require('../models/Member');

// Get all members
router.get('/', async (req, res) => {
  try {
    const members = await Member.find().sort({ name: 1 });
    res.json(members);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Get a single member
router.get('/:id', async (req, res) => {
  try {
    const member = await Member.findById(req.params.id);
    if (!member) return res.status(404).json({ message: 'Member not found' });
    res.json(member);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Create a member
router.post('/', async (req, res) => {
  const member = new Member({
    name: req.body.name,
    contact: req.body.contact,
    phone: req.body.phone,
    joinDate: req.body.joinDate,
    role: req.body.role,
    image: req.body.image
  });

  try {
    const newMember = await member.save();
    res.status(201).json(newMember);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// Update a member
router.put('/:id', async (req, res) => {
  try {
    const member = await Member.findById(req.params.id);
    if (!member) return res.status(404).json({ message: 'Member not found' });

    if (req.body.name) member.name = req.body.name;
    if (req.body.contact) member.contact = req.body.contact;
    if (req.body.phone) member.phone = req.body.phone;
    if (req.body.joinDate) member.joinDate = req.body.joinDate;
    if (req.body.role) member.role = req.body.role;
    if (req.body.image) member.image = req.body.image;

    const updatedMember = await member.save();
    res.json(updatedMember);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// Delete a member
router.delete('/:id', async (req, res) => {
  try {
    const member = await Member.findById(req.params.id);
    if (!member) return res.status(404).json({ message: 'Member not found' });

    await member.deleteOne();
    res.json({ message: 'Member deleted' });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

module.exports = router;