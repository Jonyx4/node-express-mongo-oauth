import mongoose from 'mongoose';

const listSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
      maxlength: 50
    },
    description: String
  },
  { timestamps: true }
);

listSchema.index({ name: 1 }, { unique: true });

const listModel = mongoose.model('list', listSchema);
export default listModel;
