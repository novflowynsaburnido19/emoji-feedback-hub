import mongoose from 'mongoose';

const FeedbackSchema = new mongoose.Schema({
  emoji: {
    type: String,
    required: true,
  },
  comment: {
    type: String,
  },
  timestamp: {
    type: Date,
    default: Date.now,
  },
});

const Feedback = mongoose.model('Feedback', FeedbackSchema);

export default Feedback;
