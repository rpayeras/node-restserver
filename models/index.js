const Category = require("./category");
const Role = require("./role");
const Server = require("./server");
const User = require("./user");
const Product = require("./product");

module.exports = {
  Category,
  categories: Category,
  Product,
  products: Product,
  Role,
  roles: Role,
  Server,
  User,
  users: User,
};
