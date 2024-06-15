import express from 'express';
import syncController from '../controllers/polling/sync.controller.js';

const pollingRouter = express.Router();

pollingRouter.post('/sync', syncController.post);

export default pollingRouter;
