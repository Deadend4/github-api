import reposService from '../../services/repos.service.js';

const get = async (req, res) => {
  try {
    const { page = 1, per_page = 100 } = req.query;
    const result = await reposService.getRepos(page, per_page);
    res.json({
      page: page,
      per_page: per_page,
      ...result,
    });
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

const reposController = { get };
export default reposController;
