const { Schema, models, model } = require("mongoose");

const likeSchema = new Schema({
    post: {
      type: Schema.Types.ObjectId,
      required: [true, "The post is required!"],
      ref: "Comment",
    },
    usersThatLiked: Array,
})

const Like = models.Like || model("Like", likeSchema);

export default Like;