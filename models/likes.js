const { Schema, model } = require("mongoose");

const LikeSchema = Schema({
  userid: {
    type: Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  movieid: [
    {
      type: Schema.Types.ObjectId,
      ref: "Movie",
      required: true,
    },
  ],
});

module.exports = model("Like", LikeSchema);
