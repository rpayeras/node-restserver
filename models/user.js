// {
//   name: 'robert',
//   mail: 'rob@mail.com',
//   password: '123456',
//   role: '123qwe',
//   status: false,
//   google: false
// }
const { Schema, model } = require("mongoose");

const UserSchema = Schema({
  name: {
    type: String,
    required: [true, "Name mandatory"],
  },
  email: {
    type: String,
    required: [true, "Email is mandatory"],
  },
  password: {
    type: String,
    required: [true, "Password mandatory"],
  },
  img: {
    type: String,
  },
  role: {
    type: String,
    required: true,
    enum: ["ADMIN_ROLE", "USER_ROLE"],
  },
  status: {
    type: Boolean,
    default: true,
  },
  google: {
    type: Boolean,
    default: false,
  },
});

// Deleting innecessary data
UserSchema.methods.toJSON = function () {
  const { __v, password, ...user } = this.toObject();
  return user;
};

module.exports = model("User", UserSchema);
