const express = require('express');
const router = express.Router();
const Experience = require('../models/Experience');

// Get all experiences
router.get('/', async (req, res) => {
  try {
    const experiences = await Experience.find().sort({ date: -1 });
    res.json(experiences);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Get a single experience
router.get('/:id', async (req, res) => {
  try {
    const experience = await Experience.findById(req.params.id);
    if (!experience) return res.status(404).json({ message: 'Experience not found' });
    res.json(experience);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Create an experience
router.post('/', async (req, res) => {
  const experience = new Experience({
    title: req.body.title,
    date: req.body.date,
    description: req.body.description,
    image: req.body.image
  });

  try {
    const newExperience = await experience.save();
    res.status(201).json(newExperience);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// Update an experience
router.put('/:id', async (req, res) => {
  try {
    const experience = await Experience.findById(req.params.id);
    if (!experience) return res.status(404).json({ message: 'Experience not found' });

    if (req.body.title) experience.title = req.body.title;
    if (req.body.date) experience.date = req.body.date;
    if (req.body.description) experience.description = req.body.description;
    if (req.body.image) experience.image = req.body.image;

    const updatedExperience = await experience.save();
    res.json(updatedExperience);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// Delete an experience
router.delete('/:id', async (req, res) => {
  try {
    const experience = await Experience.findById(req.params.id);
    if (!experience) return res.status(404).json({ message: 'Experience not found' });

    await experience.deleteOne();
    res.json({ message: 'Experience deleted' });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

module.exports = router;