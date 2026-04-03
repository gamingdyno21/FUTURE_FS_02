import express from 'express';
import {
  createLead,
  getLeads,
  getLeadById,
  updateLeadStatus,
  addLeadNote
} from '../controllers/leadController.js';
import { protect } from '../middleware/authMiddleware.js';

const router = express.Router();

// Public route to capture lead from contact form
router.post('/', createLead);

// Protected routes
router.use(protect); // Apply protect middleware to all routes below
router.get('/', getLeads);
router.get('/:id', getLeadById);
router.put('/:id', updateLeadStatus);
router.post('/:id/notes', addLeadNote);

export default router;
