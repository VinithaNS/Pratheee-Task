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

// Search employees by name and address
employeeRouter.get('/searchemployee', async (req, res) => {
  try {
    const { name, address } = req.query;
    
   
    const query = {};
    if (name) {
      query.name = { $regex: new RegExp(name, 'i') }; 
    }
    if (address) {
      query.address = { $regex: new RegExp(address, 'i') }; 
    }

    const employees = await EmployeeModel.find(query);
    res.status(200).send(employees);
  } catch (error) {
    res.status(500).json(error);
  }
});

export default employeeRouter;
