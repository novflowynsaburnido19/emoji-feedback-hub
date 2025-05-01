import { connectToDatabase } from './_db';
import Feedback from './feedbackModel';

export default async function handler(req, res) {
  // ✅ Set CORS headers
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, DELETE, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  // ✅ Respond to OPTIONS preflight request
  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }

  await connectToDatabase();

  if (req.method === 'GET') {
    try {
      const feedback = await Feedback.find();
      return res.status(200).json(feedback);
    } catch (error) {
      return res.status(500).json({ error: 'Failed to fetch feedback' });
    }
  } else if (req.method === 'POST') {
    try {
      const { emoji, comment } = req.body;
      const newFeedback = await Feedback.create({ emoji, comment });
      return res.status(201).json(newFeedback);
    } catch (error) {
      return res.status(400).json({ error: 'Failed to save feedback' });
    }
  } else {
    res.setHeader('Allow', ['GET', 'POST']);
    return res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}
