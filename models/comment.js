const { Schema, models, model } = require("mongoose");

const commentSchema = new Schema({
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
      required: [true,"Number of likes required"],
    },
    dateCreated: {
      type: Date,
      required: [true, "Date is required"],
    },
    replies: [{
      type: Schema.Types.ObjectId,
      ref: "Reply",
    }],
});

const Comment = models.Comment || model("Comment", commentSchema);

export default Comment