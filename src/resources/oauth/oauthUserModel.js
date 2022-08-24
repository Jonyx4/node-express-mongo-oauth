import mongoose from 'mongoose';
import bcrypt from 'bcrypt';

const oauthUserSchema = new mongoose.Schema(
  {
    email: { type: String, required: true },
    firstname: { type: String, required: true },
    lastname: { type: String, required: true },
    password: { type: String, required: true },
    username: { type: String, required: true, unique: true }
  },
  { timestamps: true }
);

oauthUserSchema.pre('save', function hashPass(next) {
  const hash = bcrypt.hashSync(this.password, 10);
  this.password = hash;
  next();
});

oauthUserSchema.pre('findOneAndUpdate', function hashPass(next) {
  if (this._update.password) {
    const hash = bcrypt.hashSync(this._update.password, 10);
    this._update.password = hash;
  }
  next();
});

oauthUserSchema.methods.checkPassword = function checkPassword(password) {
  return bcrypt.compareSync(password, this.password);
};

const oauthUserModel = mongoose.model('oauth-user', oauthUserSchema);
export default oauthUserModel;
