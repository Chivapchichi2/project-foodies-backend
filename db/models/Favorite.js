import { Schema, model } from 'mongoose';
import { handleSaveError, setUpdateSettings } from './hooks.js';

const favoriteRecipeSchema = new Schema(
  {
    user: {
      type: Schema.Types.ObjectId,
      ref: 'user',
    },
    recipe: {
      type: Schema.Types.ObjectId,
      ref: 'recipe',
    },
  },
  { versionKey: false, timestamps: true }
);

favoriteRecipeSchema.post('save', handleSaveError);

favoriteRecipeSchema.pre('findOneAndUpdate', setUpdateSettings);

favoriteRecipeSchema.post('findOneAndUpdate', handleSaveError);

const Favorite = model('favorite', favoriteRecipeSchema);

export default Favorite;
