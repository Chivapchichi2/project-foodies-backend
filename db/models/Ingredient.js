import { Schema, model } from 'mongoose';

const ingredientSchema = new Schema(
  {
    name: String,
    desc: String,
    img: String,
  },
  { versionKey: false, timestamps: false }
);

const Ingredient = model('ingredient', ingredientSchema);

export default Ingredient;
