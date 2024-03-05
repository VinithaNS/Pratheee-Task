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
// Get employee by ID
employeeRouter.get('/getemployee/:id', async (req, res) => {
  try {
    const employee = await EmployeeModel.findById(req.params.id);
    if (!employee) {
      return res.status(404).json({ message: 'Employee not found' });
    }
    res.status(200).send(employee);
  } catch (error) {
    res.status(500).json(error);
  }
});

// Update employee by ID
employeeRouter.put('/updateemployee/:id', async (req, res) => {
  try {
    const updatedEmployee = await EmployeeModel.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );
    if (!updatedEmployee) {
      return res.status(404).json({ message: 'Employee not found' });
    }
    res.status(200).json(updatedEmployee);
  } catch (error) {
    res.status(500).json(error);
  }
});

// Delete employee by ID
employeeRouter.delete('/deleteemployee/:id', async (req, res) => {
  try {
    const deletedEmployee = await EmployeeModel.findByIdAndDelete(req.params.id);
    if (!deletedEmployee) {
      return res.status(404).json({ message: 'Employee not found' });
    }
    res.status(200).json({ message: 'Employee deleted successfully' });
  } catch (error) {
    res.status(500).json(error);
  }
});




export default employeeRouter;
