import { Schema, model } from "mongoose";
import { handleSaveError, setUpdateSettings } from "./hooks.js";

const recipesSchema = new Schema(
  {
    owner: {
      type: Schema.Types.ObjectId,
      ref: "user",
    },
  },
  {
    versionKey: false,
  },
);

recipesSchema.post("save", handleSaveError);

recipesSchema.pre("findOneAndUpdate", setUpdateSettings);

recipesSchema.post("findOneAndUpdate", handleSaveError);

const Recipe = model("contact", recipesSchema);

export default Recipe;
