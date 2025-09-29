// models/Image.js
import mongoose from 'mongoose';

const ImageSchema = new mongoose.Schema({
  url: {
    type: String,
    required: true,
  },
  alt: {
    type: String,
    required: true,
  },
});

const Image = mongoose.models.Image || mongoose.model('Image', ImageSchema);

export default Image;
