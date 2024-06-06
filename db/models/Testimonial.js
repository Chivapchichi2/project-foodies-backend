import { Schema, model } from 'mongoose';

const testimonialSchema = new Schema(
  {
    owner: String,
    testimonial: String,
  },
  { versionKey: false, timestamps: true }
);

const Testimonial = model('testimonial', testimonialSchema);

export default Testimonial;
