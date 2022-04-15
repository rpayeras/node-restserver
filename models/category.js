// {
//   name: 'robert',
//   mail: 'rob@mail.com',
//   password: '123456',
//   role: '123qwe',
//   status: false,
//   google: false
// }
const { Schema, model } = require("mongoose");

const CategorySchema = Schema({
  name: {
    type: String,
    required: [true, "Name mandatory"],
  },
  status: {
    type: Boolean,
    default: true,
    required: true,
  },
  user: {
    type: Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
});

// Deleting innecessary data
CategorySchema.methods.toJSON = function () {
  const { __v, ...data } = this.toObject();
  return data;
};

module.exports = model("Category", CategorySchema);
