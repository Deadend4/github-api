import db from './db.service.js';
import GithubService from './github.service.js';
import { escapeQuotes } from '../../utils/database.util.js';

async function getRepos(page = 1, per_page = 100) {
  const countResponse = await db.query('SELECT COUNT(*) FROM top_repositories');
  const response = await db.query(
    'SELECT * FROM top_repositories ORDER BY stars_count LIMIT $1 OFFSET $2',
    [per_page, (page - 1) * per_page]
  );
  return { totalCount: countResponse.rows[0].count, items: response.rows };
}

async function getRepoByIdOrName(id) {
  const textID = id;
  const numberID = isNaN(textID) ? -1 : +textID;
  const response = await db.query(
    'SELECT * FROM top_repositories WHERE name=$1 OR github_id=$2',
    [textID, numberID]
  );
  return response.rows[0];
}

function syncRepos() {
  const ghService = new GithubService();
  ghService.reposPolling.restart();
}

function saveRepos(data) {
  const query = data.items.reduce(
    (acc, item) =>
      acc +
      `INSERT INTO users (github_id, login, url, avatar)
          VALUES (
            ${item.owner.id},
            '${item.owner.login}',
            '${item.html_url}',
            '${item.owner.avatar_url}'
          ) 
          ON CONFLICT (github_id)
          DO UPDATE SET
            login = '${item.owner.login}',
            url = '${item.html_url}',
            avatar = '${item.owner.avatar_url}';\n
        INSERT INTO top_repositories (github_id, name, url, owner_id, description, language, disabled, stars_count)
          VALUES (
            ${item.id},
            '${item.name}',
            '${item.html_url}',
            (SELECT id FROM users WHERE github_id=${item.owner.id}),
            '${escapeQuotes(item.description)}',
            '${item.language}',
            ${item.disabled},
            ${item.stargazers_count}
          )
          ON CONFLICT (github_id)
          DO UPDATE SET
            name = '${item.name}',
            description = '${escapeQuotes(item.description)}',
            language = '${item.language}',
            disabled = ${item.disabled},
            stars_count = ${item.stargazers_count};\n`,
    ''
  );
  db.query(query);
}

const reposService = { getRepos, getRepoByIdOrName, syncRepos, saveRepos };
export default reposService;
