import { Request, Response } from 'express';
import Requests from '../models/request';

// Example: Get all users
const getRequests = async (req: Request, res: Response) => {
  try {
    const requests = await Requests.find();
    res.json(requests);
  } catch (error) {
    res.status(500).json({ message: 'Server Error' });
  }
};

const createRequest = async (req: Request, res: Response) => {
  try {
    const newReq = new Requests(req.body);
    const lastReq = await Requests.findOne().sort({ requestId: -1 }).limit(1);
    newReq.requestId = lastReq ? lastReq.requestId + 1 : 1;
    console.log(newReq);

    const savedReq = await newReq.save();
    res.status(201).json({
      success: true,
      message: 'Request created successfully!',
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: 'Error creating request',
      error: error,
    }); // Or a more specific error based on validation
  }
};

export default { getRequests, createRequest }; // Add more controller functions
