import { octokit } from '../configs/github-config.js';
import { MINUTES_TO_MS_MULTIPLIER } from '../constants.js';

export default class GithubChecker {
  static #instance;
  #interval;
  #delay = null;
  #callback;
  constructor() {
    if (GithubChecker.#instance) {
      return GithubChecker.#instance;
    }
    GithubChecker.#instance = this;
    Object.freeze(this);
  }

  /**
   * @param callback {(data) => void} - A function that accepts a list of popular repositories
   * @param delayMinutes {number} - Time interval in minutes
   * @returns {void}
   * @description Gets a list of popular repositories every `delayMinutes` minutes and passes it to the `callback` function as an argument
   */
  start(callback, delayMinutes = 1) {
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
    this.#delay = delayMS;
    this.#callback = callback;
    this.#interval = setInterval(() => check(), delayMS);
  }

  /**
   * @returns {void}
   * @description If the process was started by calling the `start` method, restarts it
   */
  restart() {
    if (!this.#interval) {
      throw new Error('Process is not running!');
    }
    const delay = this.#delay;
    this.stop();
    this.start(this.#callback, delay);
  }

  /**
   * @returns {void}
   * @description If the process was started by calling the `start` method, stops it
   */
  stop() {
    clearInterval(this.#interval);
    this.#delay = null;
    this.#interval = null;
  }
}
