import express from 'express';
import { createComment, updateComment, deleteComment } from '../controllers/commentController.js';

const router = express.Router();

router.post('/', createComment);
router.put('/:id', updateComment);
router.delete('/:id', deleteComment);

export default router;
