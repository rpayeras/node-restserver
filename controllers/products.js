const { request, response } = require("express");
const Model = require("../models/product");

const getAll = async (req = request, res = response) => {
  const { limit = 5, offset = 0 } = req.query;
  const where = { state: true };

  const [total, data] = await Promise.all([
    Model.countDocuments(),
    Model.find(where)
      .populate("user", "name")
      .populate("category", "name")
      .skip(offset)
      .limit(limit),
  ]);

  res.json({
    total,
    data,
  });
};

const getById = async (req = request, res = response) => {
  const { id } = req.params;

  const data = await Model.findById(id).populate("user").populate("category");

  res.json(data);
};

const create = async (req = request, res = response) => {
  const { name, price, description, category, available } = req.body;

  try {
    const data = await Model.findOne({ name: name });

    if (data)
      return res.status(400).json({
        msg: "This resource exists",
      });

    const newData = {
      name,
      user: req.user.id,
      price,
      description,
      category,
      available,
    };

    const newModel = new Model(newData);
    await newModel.save();

    res.status(201).json({
      newModel,
    });
  } catch (err) {
    console.log(err);
    return res.status(500).json({
      msg: "Error on save db",
    });
  }
};

const update = async (req, res = response) => {
  const { id } = req.params;
  const { _id, ...restData } = req.body;

  restData.user = req.user.id;

  await Model.findByIdAndUpdate(id, restData, { new: true });

  res.json(restData);
};

const deleteRecord = async (req, res = response) => {
  const { id } = req.params;

  try {
    const model = await Model.findByIdAndUpdate(id, {
      status: false,
    });

    res.json({
      model,
    });
  } catch (err) {
    console.log(err);
    res.status(401).json({ msg: "This model not exists" });
  }
};

module.exports = {
  getAll,
  getById,
  create,
  update,
  deleteRecord,
};
