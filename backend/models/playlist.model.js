const mongoose = require("mongoose");
const Schema = mongoose.Schema;
mongoose.set('strictQuery', false);
let PlaylistSchema = new Schema({
  link: {
    type: String,
    required: true,
    unique: true
  },
  isActive: {
    type: Boolean,
  },
  },
{
  timestamps: { createdAt: "created_at", updatedAt: "updated_at" },
})
// Export the model
module.exports = mongoose.model("Playlist", PlaylistSchema);
