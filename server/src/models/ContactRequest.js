import mongoose from 'mongoose';

const contactRequestSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    email: { type: String, required: true },
    phone: { type: String },
    service: { type: String, required: true },
    message: { type: String, required: true },
    source: { type: String, default: 'website' },
  },
  { timestamps: true },
);

export default mongoose.model('ContactRequest', contactRequestSchema);


