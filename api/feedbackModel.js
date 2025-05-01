
import mongoose from 'mongoose';

const FeedbackSchema = new mongoose.Schema({
  emoji: String,
  comment: String,
}, { timestamps: true });

export default mongoose.models.Feedback || mongoose.model('Feedback', FeedbackSchema);
