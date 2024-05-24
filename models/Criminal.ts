import mongoose from 'mongoose';

const CriminalSchema = new mongoose.Schema({
  id: {
    type: String,
    required: true,
    unique: true,
  },
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
  city: {
    type: String,
    required: true,
  },
  crime: {
    type: String,
    required: true,
  },
  date: {
    type: Date,
    default: Date.now,
    required: true,
  },
  captured: {
    type: Boolean,
    default: false,
  },
});

export default mongoose.models.Criminal || mongoose.model('Criminal', CriminalSchema);
