import express from 'express';
import Feedback from '../models/Feedback.js'; // Don’t forget the .js extension

const router = express.Router();

// GET all feedback
router.get('/', async (req, res) => {
  try {
    const feedback = await Feedback.find();
    res.json(feedback);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch feedback' });
  }
});

// POST new feedback
router.post('/', async (req, res) => {
  try {
    const { emoji, comment } = req.body;
    const newFeedback = new Feedback({ emoji, comment });
    await newFeedback.save();
    res.status(201).json(newFeedback);
  } catch (error) {
    res.status(400).json({ error: 'Failed to save feedback' });
  }
});

export default router;
