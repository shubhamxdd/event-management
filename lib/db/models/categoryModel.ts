import mongoose from "mongoose";

export interface ICategory extends mongoose.Document {
  _id: string;
  name: string;
}

const categorySchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    unique: true,
  },
});

const category =
  mongoose.models.Category || mongoose.model("Category", categorySchema);

export default category;
