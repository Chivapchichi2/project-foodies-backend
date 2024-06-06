import Testimonial from '../db/models/Testimonial.js';

export const getAllTestimonials = () => Testimonial.find();
