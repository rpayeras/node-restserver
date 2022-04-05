const validationTools = require("./validation-tools");
const validateJwt = require("../middlewares/validate-jwt");
const validateRoles = require("../middlewares/validate-roles");

module.exports = {
  ...validationTools,
  ...validateJwt,
  ...validateRoles,
};
