import { escapeQuotes } from '../utils/database.js';

export default function getUserAndRepoInsertQuery(item) {
  return `INSERT INTO users (github_id, login, url, avatar)
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
            stars_count = ${item.stargazers_count};\n`;
}
