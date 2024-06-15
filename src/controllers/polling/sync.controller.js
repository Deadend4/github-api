import reposService from '../../services/repos.service.js';

const post = (req, res) => {
  reposService.syncRepos();
  res.status(204).end();
};

const syncController = { post };
export default syncController;
