const express = require('express');
const Art = require('../models/Art');
const router = express.Router();

// Get all arts
router.get('/', async (req, res) => {
  try {
    const arts = await Art.find();
    res.json(arts);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Add new art
router.post('/', async (req, res) => {
  try {
    // Extract the image and creatorImage from the request body
    const { image, creatorImage, title, description, price, creatorName } = req.body;

    // Create new Art object with base64 encoded images
    const art = new Art({
      image: image, // Assuming image is sent as a base64 string
      title: title,
      description: description,
      price: price,
      creatorName: creatorName,
      creatorImage: creatorImage // Assuming creatorImage is sent as a base64 string
    });

    // Save the art object to MongoDB
    const newArt = await art.save();
    res.status(201).json(newArt);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

module.exports = router;
