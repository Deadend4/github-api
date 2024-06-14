import { Octokit } from 'octokit';
import express from 'express';
import dotenv from 'dotenv';

if (process.env.NODE_ENV !== 'production') {
  dotenv.config();
}

const app = express();
const port = process.env.PORT || 3001;
const authToken = process.env.GITHUB_AUTH_TOKEN || '';
const octokit = new Octokit({
  auth: authToken,
});

app.listen(port, () => {
  console.log('Server is listening on port: ', port);
});

app.get('/home', (req, res) => {
  res.send('Homepage');
});

app.get('/me', async (req, res) => {
  try {
    const result = await octokit.request('GET /users/{username}', {
      username: 'Deadend4',
      per_page: 2,
    });

    res.send(result.data);
  } catch (error) {
    console.log(
      `Error! Status: ${error.status}. Message: ${error.response.data.message}`
    );
  }
});
