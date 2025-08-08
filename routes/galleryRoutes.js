const express = require('express');
const router = express.Router();
const Gallery = require('../models/Gallery');

// Get all gallery items
router.get('/', async (req, res) => {
  try {
    const gallery = await Gallery.find().sort({ createdAt: -1 });
    res.json(gallery);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Get top 5 gallery items
router.get('/top5', async (req, res) => {
  try {
    const topItems = await Gallery.find({ isTopFive: true }).sort({ order: 1 });
    res.json(topItems);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Get gallery items by album
router.get('/album/:album', async (req, res) => {
  try {
    const items = await Gallery.find({ album: req.params.album }).sort({ createdAt: -1 });
    res.json(items);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Get a single gallery item
router.get('/:id', async (req, res) => {
  try {
    const item = await Gallery.findById(req.params.id);
    if (!item) return res.status(404).json({ message: 'Gallery item not found' });
    res.json(item);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Create a gallery item
router.post('/', async (req, res) => {
  const item = new Gallery({
    title: req.body.title,
    url: req.body.url,
    album: req.body.album,
    isTopFive: req.body.isTopFive || false,
    order: req.body.order || 0
  });

  try {
    const newItem = await item.save();
    res.status(201).json(newItem);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// Update a gallery item
router.put('/:id', async (req, res) => {
  try {
    const item = await Gallery.findById(req.params.id);
    if (!item) return res.status(404).json({ message: 'Gallery item not found' });

    if (req.body.title) item.title = req.body.title;
    if (req.body.url) item.url = req.body.url;
    if (req.body.album) item.album = req.body.album;
    if (req.body.isTopFive !== undefined) item.isTopFive = req.body.isTopFive;
    if (req.body.order !== undefined) item.order = req.body.order;

    const updatedItem = await item.save();
    res.json(updatedItem);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// Update top 5 status and order
router.put('/:id/top5', async (req, res) => {
  try {
    const item = await Gallery.findById(req.params.id);
    if (!item) return res.status(404).json({ message: 'Gallery item not found' });

    // If adding to top 5, remove any existing item with the same order
    if (req.body.isTopFive && req.body.order) {
      await Gallery.updateOne(
        { order: req.body.order, isTopFive: true, _id: { $ne: req.params.id } },
        { isTopFive: false, order: 0 }
      );
    }

    item.isTopFive = req.body.isTopFive;
    item.order = req.body.isTopFive ? (req.body.order || 0) : 0;

    const updatedItem = await item.save();
    res.json(updatedItem);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// Delete a gallery item
router.delete('/:id', async (req, res) => {
  try {
    const item = await Gallery.findById(req.params.id);
    if (!item) return res.status(404).json({ message: 'Gallery item not found' });

    await item.deleteOne();
    res.json({ message: 'Gallery item deleted' });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

module.exports = router;