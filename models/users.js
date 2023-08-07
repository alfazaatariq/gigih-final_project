import mongoose from 'mongoose';

const usersSchema = new mongoose.Schema({
  username: { type: String, required: true, unique: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
});

const user = mongoose.model('User', usersSchema);

export default user;
