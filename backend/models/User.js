import mongoose from "mongoose";
import mongooseRole from "mongoose-role";
import { MASTER, ADMIN } from "../constants/roles.js";

const UserSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
  date: {
    type: Date,
    default: Date.now,
  },
  lastLogin: {
    type: Date,
  },
});

UserSchema.plugin(mongooseRole, {
  roles: [MASTER, ADMIN],
  accessLevels: {
    master: [MASTER, ADMIN],
    admin: [ADMIN],
  },
});

export default mongoose.model("user", UserSchema);
