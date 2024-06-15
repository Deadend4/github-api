import express from 'express';
import GithubChecker from './utils/githubChecker.js';
import { pool } from './configs/postgres-config.js';
import { port } from './configs/dotenv.js';
import getUserAndRepoInsertQuery from './queries/getUserAndRepoInsertQuery.js';

const app = express();

const githubChecker = new GithubChecker();

app.listen(port, () => {
  console.log('Server is listening on port: ', port);
  githubChecker.start((data) => {
    const query = data.items.reduce(
      (acc, item) => acc + getUserAndRepoInsertQuery(item),
      ''
    );
    pool.query(query);
  }, 2);
});

app.get('/force-update', (req, res) => {
  githubChecker.restart();
  res.status(204).end();
});
app.get('/stop', (req, res) => {
  githubChecker.stop();
  res.status(204).end();
});
