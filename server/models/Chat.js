const { Schema, model } = require('mongoose');

const chatSchema = new Schema(
  {
    message: {
      type: String,
      required: true
    },
    user: {
      type: Schema.Types.ObjectId,
      ref: 'User',
      required: true
    }
  },
  {
    timestamps: true,
    get: time => time.toDateString(),
    toJSON: {
      virtuals: true,
    },
  }
);

const Chat = model('Chat', chatSchema);

module.exports = Chat;
