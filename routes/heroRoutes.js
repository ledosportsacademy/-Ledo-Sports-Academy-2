const express = require('express');
const router = express.Router();
const Hero = require('../models/Hero');

// Get all hero slides
router.get('/', async (req, res) => {
  try {
    const heroes = await Hero.find().sort({ createdAt: -1 });
    res.json(heroes);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Get a single hero slide
router.get('/:id', async (req, res) => {
  try {
    const hero = await Hero.findById(req.params.id);
    if (!hero) return res.status(404).json({ message: 'Hero slide not found' });
    res.json(hero);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Create a hero slide
router.post('/', async (req, res) => {
  const hero = new Hero({
    title: req.body.title,
    subtitle: req.body.subtitle,
    description: req.body.description,
    backgroundImage: req.body.backgroundImage,
    ctaText: req.body.ctaText,
    ctaLink: req.body.ctaLink,
    redirectUrl: req.body.redirectUrl,
    openNewTab: req.body.openNewTab
  });

  try {
    const newHero = await hero.save();
    res.status(201).json(newHero);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// Update a hero slide
router.put('/:id', async (req, res) => {
  try {
    const hero = await Hero.findById(req.params.id);
    if (!hero) return res.status(404).json({ message: 'Hero slide not found' });

    if (req.body.title) hero.title = req.body.title;
    if (req.body.subtitle) hero.subtitle = req.body.subtitle;
    if (req.body.description) hero.description = req.body.description;
    if (req.body.backgroundImage) hero.backgroundImage = req.body.backgroundImage;
    if (req.body.ctaText) hero.ctaText = req.body.ctaText;
    if (req.body.ctaLink) hero.ctaLink = req.body.ctaLink;
    if (req.body.redirectUrl !== undefined) hero.redirectUrl = req.body.redirectUrl;
    if (req.body.openNewTab !== undefined) hero.openNewTab = req.body.openNewTab;

    const updatedHero = await hero.save();
    res.json(updatedHero);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// Delete a hero slide
router.delete('/:id', async (req, res) => {
  try {
    const hero = await Hero.findById(req.params.id);
    if (!hero) return res.status(404).json({ message: 'Hero slide not found' });

    await hero.deleteOne();
    res.json({ message: 'Hero slide deleted' });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

module.exports = router;