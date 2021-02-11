const mongoose = require("mongoose");
const { ObjectId } = mongoose.Schema.Types;

const postSchema = mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  body: {
    type: String,
    required: true,
  },
  photo: {
    type: String,
    require: true,
  },
  likes: [{ type: ObjectId, ref: "User" }],
  comments: [{ text: String, postBy: { type: ObjectId, ref: "User" } }],
  postedBy: {
    type: ObjectId,
    ref: "User",
  },
});

mongoose.model("Post", postSchema);
