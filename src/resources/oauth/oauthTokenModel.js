import mongoose from 'mongoose';

const oauthTokenSchema = new mongoose.Schema(
  {
    accessToken: { type: String, required: true },
    accessTokenExpiresAt: { type: Date, required: true },
    client: { type: Object, required: true },
    refreshToken: { type: String, required: true },
    refreshTokenExpiresAt: { type: Date, required: true },
    user: { type: Object, required: true }
  },
  { timestamps: true }
);

const oauthTokenModel = mongoose.model('oauth-token', oauthTokenSchema);
export default oauthTokenModel;
