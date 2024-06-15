import reposService from '../../services/repos.service.js';

const get = async (req, res) => {
  try {
    const response = await reposService.getRepoByIdOrName(
      req.params.identifier
    );
    if (!response) {
      res.status(404).json({ message: 'Repository not found' });
      return;
    }
    res.json(response);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

const repoByIdOrNameController = { get };
export default repoByIdOrNameController;
