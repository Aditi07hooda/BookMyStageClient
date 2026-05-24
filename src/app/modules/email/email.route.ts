import express from 'express';
import upload from '../../../middleware/upload'; // Assuming you have a middleware for file uploads

const emailRouter = express.Router();

// emailRouter.post('/send-test', upload.array('images', 5), sendTestEmail);    
export default emailRouter;