import { Router } from 'express';
import { createNote, getAllNotes, getNote, updateNote, deleteNote } from '../controllers/notesController';
import { authenticateJWT } from '../middlewares/authMiddleware';

const router = Router();

// Protect these routes with authentication middleware
router.post('/', authenticateJWT, createNote);
router.get('/', authenticateJWT, getAllNotes);
router.get('/:id', authenticateJWT, getNote);
router.put('/:id', authenticateJWT, updateNote);
router.delete('/:id', authenticateJWT, deleteNote);

export default router;
