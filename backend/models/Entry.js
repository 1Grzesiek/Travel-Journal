import mongoose from "mongoose";

const entrySchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, required: true },

  title: String,
  desc: String,
  date: String,

  image: {
    data: Buffer,       
    contentType: String,
  },

  gallery: [
    {
      data: Buffer, 
      contentType: String,
    }
  ],

  location: String,
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now }
});

export default mongoose.model("Entry", entrySchema);
