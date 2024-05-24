// agent schema modal for mongoose
import mongoose from 'mongoose';

const AgentSchema = new mongoose.Schema({
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
  badgeNumber: {
    type: String,
    required: true,
  },
  city: {
    type: String,
    required: true,
  },
  assignedCrime: {
    type: String,
    required: true,
  },
  department: {
    type: String,
    required: true,
  },
});

export default mongoose.models.Agent || mongoose.model('Agent', AgentSchema);
