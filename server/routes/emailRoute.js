import express from 'express';
import { sendContactEmail } from '../controllers/emailController.js';

const emailRouter = express.Router();

emailRouter.post('/contact', sendContactEmail);

export default emailRouter;