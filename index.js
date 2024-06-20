import express from 'express';
import cors from 'cors';
import GithubService from './src/services/github.service.js';
import { port } from './src/configs/dotenv.config.js';
import reposRouter from './src/routes/repos.route.js';
import reposService from './src/services/repos.service.js';
import pollingRouter from './src/routes/polling.route.js';
import { corsOptions } from './src/configs/cors.config.js';

const app = express();

const ghService = new GithubService();

app.use(cors(corsOptions));

app.use('/repos', reposRouter);
app.use('/polling', pollingRouter);

app.listen(port, () => {
  console.log('Server is listening on port: ', port);
  ghService.reposPolling.start(reposService.saveRepos, 5);
});
