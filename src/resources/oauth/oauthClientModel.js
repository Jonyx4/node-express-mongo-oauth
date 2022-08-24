import mongoose from 'mongoose';

const oauthClientSchema = new mongoose.Schema(
  {
    id: { type: String, required: true, unique: true },
    clientSecret: { type: String, required: true },
    redirectUris: { type: Array, required: true },
    grants: { type: Array, required: true }
  },
  { timestamps: true }
);

const oauthClientModel = mongoose.model('oauth-client', oauthClientSchema);
export default oauthClientModel;
