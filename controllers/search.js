const allowedCollections = ["users", "products", "categories"];
const allowedFieldType = ["String"];

const models = require("../models");

const search = async (req, res) => {
  const { collection, term } = req.params;

  if (!allowedCollections.includes(collection) && !models[collection]) {
    return res.status(401).send({
      msg: "Collection not allowed",
    });
  }

  const model = models[collection];
  const fields = Object.entries(model.schema.paths);

  const regex = new RegExp(term, "i");
  const where = [{ _id: term }];

  fields.forEach((field) => {
    if (allowedFieldType.includes(field[1].instance)) {
      where.push({
        [field[0]]: regex,
      });
    }
  });

  console.log(where);

  try {
    const data = await model.find({
      $and: [{ $or: where }, { status: true }],
    });

    res.json({
      count: data,
    });
  } catch (err) {
    console.log(err);

    res.status(500).send({
      msg: "Error on querying database",
    });
  }
};

module.exports = {
  search,
};
