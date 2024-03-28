import express from 'express';
import { createTopic, getTopic, updateTopic, deleteTopic } from '../controllers/topicController.js';

const router = express.Router();

router.post('/', createTopic);
router.get('/:id', getTopic);
router.put('/:id', updateTopic);
router.delete('/:id', deleteTopic);

export default router;
