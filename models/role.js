const { Schema, model } = require("mongoose");

const RoleSchema = Schema({
  name: {
    type: String,
    required: [true, "Role is required"],
  },
});

module.exports = model("Role", RoleSchema);
