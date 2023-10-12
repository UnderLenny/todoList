import mongoose, { Document, Schema } from "mongoose";
import validator from "validator";

interface IUser extends Document {
  email: string;
}

const userSchema: Schema = new mongoose.Schema({
  email: {
    type: String,
    validate: [validator.isEmail, "Please provide a valid email"],
  },
});

const User = mongoose.model<IUser>("User", userSchema);

export default User;
