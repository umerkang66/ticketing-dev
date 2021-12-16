import mongoose from 'mongoose';
import { Password } from '../services/password';

// An interface that describes the properties that are required to create a new
interface UserAttrs {
  email: string;
  password: string;
}

// An interface that describes the properties that a User Model has
interface UserModel extends mongoose.Model<UserDoc> {
  build(attrs: UserAttrs): UserDoc;
}

// An interface that describes the properties that a User Document has
interface UserDoc extends mongoose.Document {
  email: string;
  password: string;
}

const userSchema = new mongoose.Schema({
  email: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
});

userSchema.pre('save', async function (done) {
  // "this" is User document that we are trying to save
  // If we only change the email, we would not want to rehash the password
  if (this.isModified('password')) {
    // This will run if the password is modified (even if password is created first time, isModified will return true)
    const hashed = await Password.toHash(this.get('password'));
    // Update the password
    this.set('password', hashed);
  }

  // We have to call done becasue of the async await syntax we are using
  done();
});

// Static methods on the User Model (that is class)
userSchema.statics.build = (attrs: UserAttrs) => new User(attrs);

// In the generic typing, first one is Document interface, and the second one is Model interface (that is User itself)
const User = mongoose.model<UserDoc, UserModel>('User', userSchema);

export { User };
