import express from "express";

import EmployeeModel from "../models/EmployeeModel.js";



const employeeRouter = express.Router();

employeeRouter.post("/create", async (req, res) => {
  try {
    const newemployee = new EmployeeModel(req.body);
    const savedemployee = await newemployee.save();
    if (savedemployee) {
      res.status(200).json(savedemployee);
    } else {
      res.status(401).send({ error: "Company details Is not found" });
    }
  } catch (error) {
    res.status(500).json(error);
  }
});
employeeRouter.get("/getemployee", async (req, res) => {
  try {
    const getEmployee = await EmployeeModel.find();
    res.status(200).send(getEmployee);
  } catch (error) {
    res.status(500).json(error);
  }
});

export default employeeRouter;
