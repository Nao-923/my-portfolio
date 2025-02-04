import mongoose from "mongoose";

const ContentSchema = new mongoose.Schema({
  title: String,
  description: String,
  url: String,
  image: String,
  tags: [String],
});

export default mongoose.models.Content || mongoose.model("Content", ContentSchema);