import mongoose from 'mongoose';

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

// Static methods on the User Model (that is class)
userSchema.statics.build = (attrs: UserAttrs) => new User(attrs);

// In the generic typing, first one is Document interface, and the second one is Model interface (that is User itself)
const User = mongoose.model<UserDoc, UserModel>('User', userSchema);

export { User };
