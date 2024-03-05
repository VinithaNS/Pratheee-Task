import mongoose from "mongoose";

const Schema = mongoose.Schema;

const employeeSchema = new Schema(
  {
    empname: {
      type: String,
      required: true,
    },
    empcode: {
      type: String,
      required: true,
    },

    department: {
      type: String,
      required: true,
    },
    role: {
      type: String,
      required: true,
    },
    mobilenumber: {
      type: Number,
      required: true,
    },
    email: {
      type: String,
      required: true,
    },
    address: {
      type: String,
      required: true,
    },
  },
  { timestamps: true }
);

export default mongoose.model("Employee", employeeSchema);
