const { Schema, models, model } = require("mongoose");

const replySchema = new Schema({
  creator: {
    type: Schema.Types.ObjectId,
    required: [true, "Creator is required!"],
    ref: "User",
  },
  content: {
    type: String,
    required: [true, "Content is required!"],
  },
  likes: {
    type: Number,
    required: [true, "Number of likes required"],
  },
  dateCreated: {
    type: Date,
    required: [true, "Date is required"],
  },
  commentId: {
    type: Schema.Types.ObjectId,
    ref: "Comment",
    required: [true, "The comment Id is required!"],
  },
  replyingTo: {
    type: String,
    required: [true, "User you are replying to is required!"],
  },
})

const Reply = models.Reply || model("Reply", replySchema);

export default Reply;