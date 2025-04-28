import mongoose from "mongoose";
import userModel from "../models/user.js";

mongoose.set("debug", true);

// mongoose
//   .connect("mongodb://localhost:27017/users", {
//     useNewUrlParser: true,
//     useUnifiedTopology: true,
//   })
//   .catch((error) => console.log(error));

export function getUsers(name, job) {
    //will handle both queries
    const filter = {};
    if (name) filter.name = name;
    if (job ) filter.job  = job;
    return userModel.find(filter);
  }

function findUserById(_id) {
  return userModel.findById(_id);
}

function addUser(user) {
  const userToAdd = new userModel(user);
  const promise = userToAdd.save();
  return promise;
}

function findUserByName(name) {
  return userModel.find({ name: name });
}

function findUserByJob(job) {
  return userModel.find({ job: job });
}

function deleteUserById(_id) {
    return userModel.findByIdAndDelete(_id);
  }

export default {
  addUser,
  getUsers,
  findUserById,
  findUserByName,
  findUserByJob,
  deleteUserById,
};