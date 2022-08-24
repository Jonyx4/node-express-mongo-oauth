import OauthClient from './oauthClientModel.js';
import OauthToken from './oauthTokenModel.js';
import OauthUser from './oauthUserModel.js';

export const getAccessToken = (accessToken) => OauthToken.findOne({ accessToken }).lean().exec();
export const getClient = (clientId, clientSecret) => OauthClient.findOne({ clientId, clientSecret }).lean().exec();
export const getRefreshToken = (refreshToken) => OauthToken.findOne({ refreshToken }).lean().exec();
export const revokeToken = (token) => OauthToken.deleteOne(token).lean().exec();
export const saveToken = async (token, client, user) => OauthToken.create({ ...token, client, user });

export const getUser = async (username, password) => {
  const user = await OauthUser.findOne({ username }).exec();

  if (user) {
    if (await user.checkPassword(password)) {
      return user;
    }
    return null;
  }
  return user;
};

export const createUser = async (req, res) => {
  let doc = await OauthUser.create(req.body);
  doc = doc.toJSON();
  delete doc.password;
  res.status(201).json({ data: doc });
};

export const findById = async (req, res) => {
  const doc = await OauthUser.findById(req.params.id).select('-password').lean().exec();

  if (!doc) {
    const notFoundError = new Error(`Data not found`);
    notFoundError.status = 404;
    throw notFoundError;
  }
  return res.status(200).json({ data: doc });
};

export const find = async (req, res) => {
  const docs = await OauthUser.find().select('-password').lean().exec();

  if (docs.length === 0) {
    const notFoundError = new Error(`Data not found`);
    notFoundError.status = 404;
    throw notFoundError;
  }
  return res.status(200).json({ data: docs });
};

export const deleteById = async (req, res) => {
  await OauthUser.deleteOne({ _id: req.params.id }).lean().exec();
  return res.status(204).json({});
};

export const updateById = async (req, res) => {
  const updatedDoc = await OauthUser.findOneAndUpdate(
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
  delete updatedDoc.password;
  return res.status(200).json({ data: updatedDoc });
};
