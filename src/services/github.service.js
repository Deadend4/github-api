import { Octokit } from 'octokit';
import { ghAuthToken } from '../configs/dotenv.config.js';

const MINUTES_TO_MS_MULTIPLIER = 60000;

export const octokit = new Octokit({
  auth: ghAuthToken,
});

export default class GithubService {
  static #instance;
  #interval;
  #delay = null;
  #callback;
  constructor() {
    if (GithubService.#instance) {
      return GithubService.#instance;
    }
    GithubService.#instance = this;
    Object.freeze(this);
  }
  reposPolling = {
    /**
     * @param callback {(data) => void} - A function that accepts a list of popular repositories
     * @param delayMinutes {number} - Time interval in minutes
     * @returns {void}
     * @description Gets a list of popular repositories every `delayMinutes` minutes and passes it to the `callback` function as an argument
     */
    start: (callback, delayMinutes = 2) => {
      const delayMS = delayMinutes * MINUTES_TO_MS_MULTIPLIER;
      async function check() {
        const result = await octokit.rest.search.repos({
          q: 'stars:>1',
          sort: 'stars',
          order: 'desc',
          per_page: 100,
        });
        const data = result.data;
        callback?.(data);
      }
      if (this.#interval) {
        throw new Error('Process is already running!');
      }

      check();
      this.#delay = delayMinutes;
      this.#callback = callback;
      this.#interval = setInterval(() => check(), delayMS);
    },

    /**
     * @returns {void}
     * @description If the process was started by calling the `start` method, restarts it
     */
    restart: () => {
      if (!this.#interval) {
        throw new Error('Process is not running!');
      }
      const delay = this.#delay;
      this.reposPolling.stop();
      this.reposPolling.start(this.#callback, delay);
    },

    /**
     * @returns {void}
     * @description If the process was started by calling the `start` method, stops it
     */
    stop: () => {
      clearInterval(this.#interval);
      this.#delay = null;
      this.#interval = null;
    },
  };
}
