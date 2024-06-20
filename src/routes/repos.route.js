import express from 'express';
import reposController from '../controllers/repos/repos.controller.js';
import repoByIdOrNameController from '../controllers/repos/repoByIdOrName.controller.js';
import { corsOptions } from '../configs/cors.config.js';

const reposRouter = express.Router();

reposRouter.get('/:identifier', repoByIdOrNameController.get);

reposRouter.get('/', reposController.get);

export default reposRouter;
