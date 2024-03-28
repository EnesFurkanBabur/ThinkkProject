import express from 'express';
import { createMessage, updateMessage, deleteMessage } from '../controllers/messageController.js';

const router = express.Router();

router.post('/', createMessage);
router.put('/:id', updateMessage);
router.delete('/:id', deleteMessage);

export default router;
