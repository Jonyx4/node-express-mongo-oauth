export const findById = (model) => async (req, res) => {
  const doc = await model.findById(req.params.id).lean().exec();

  if (!doc) {
    const notFoundError = new Error(`Data not found`);
    notFoundError.status = 404;
    throw notFoundError;
  }

  return res.status(200).json({ data: doc });
};

export const find = (model) => async (req, res) => {
  const docs = await model.find().lean().exec();

  if (docs.length === 0) {
    const notFoundError = new Error(`Data not found`);
    notFoundError.status = 404;
    throw notFoundError;
  }

  return res.status(200).json({ data: docs });
};

export const create = (model) => async (req, res) => {
  const doc = await model.create(req.body);
  res.status(201).json({ data: doc });
};

export const updateOne = (model) => async (req, res) => {
  const updatedDoc = await model
    .findOneAndUpdate(
      {
        _id: req.params.id
      },
      req.body,
      { new: true }
    )
    .lean()
    .exec();

  if (!updatedDoc) {
    const notFoundError = new Error(`Data not found`);
    notFoundError.status = 404;
    throw notFoundError;
  }

  return res.status(200).json({ data: updatedDoc });
};

export const removeOne = (model) => async (req, res) => {
  const removed = await model.findOneAndRemove({
    _id: req.params.id
  });

  if (!removed) {
    const notFoundError = new Error(`Data not found`);
    notFoundError.status = 404;
    throw notFoundError;
  }

  return res.status(200).json({ data: removed });
};

export const crudControllers = (model) => ({
  removeOne: removeOne(model),
  updateOne: updateOne(model),
  find: find(model),
  findById: findById(model),
  create: create(model)
});
