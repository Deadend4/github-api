import { Octokit } from 'octokit';
import { ghAuthToken } from './dotenv.js';

export const octokit = new Octokit({
  auth: ghAuthToken,
});
