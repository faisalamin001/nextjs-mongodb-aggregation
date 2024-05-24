import mongoose from 'mongoose';

const CrimeSchema = new mongoose.Schema({
  id: {
    type: String,
    required: true,
    unique: true,
  },
  crimeName: {
    type: String,
    required: true,
  },
  city: {
    type: String,
    required: true,
  },
  date: {
    type: Date,
    default: Date.now,
    required: true,
  },
  status: {
    type: String,
    required: true,
  },
});

export default mongoose.models.Crime || mongoose.model('Crime', CrimeSchema);
