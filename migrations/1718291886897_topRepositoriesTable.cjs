/**
 * @type {import('node-pg-migrate').ColumnDefinitions | undefined}
 */
exports.shorthands = undefined;

/**
 * @param pgm {import('node-pg-migrate').MigrationBuilder}
 * @param run {() => void | undefined}
 * @returns {Promise<void> | void}
 */
exports.up = (pgm) => {
  pgm.createTable('users', {
    id: 'id',
    github_id: { type: 'int', unique: true, notNull: true },
    login: { type: 'varchar(100)', notNull: true },
    url: { type: 'varchar(1000)', notNull: true },
    avatar: 'varchar(500)',
    createdAt: {
      type: 'timestamp',
      notNull: true,
      default: pgm.func('current_timestamp'),
    },
  });

  pgm.createTable('top_repositories', {
    id: 'id',
    github_id: { type: 'int', unique: true, notNull: true },
    name: { type: 'varchar(100)', notNull: true },
    url: { type: 'varchar(1000)', notNull: true },
    owner_id: { type: 'int', notNull: true },
    description: 'varchar(2000)',
    language: 'varchar(100)',
    disabled: 'bool',
    stars_count: 'int',
    createdAt: {
      type: 'timestamp',
      notNull: true,
      default: pgm.func('current_timestamp'),
    },
  });

  pgm.createConstraint('top_repositories', 'owner_id_fkey', {
    foreignKeys: {
      columns: 'owner_id',
      references: {
        schema: 'public',
        name: 'users',
      },
      onDelete: 'CASCADE',
      onUpdate: 'CASCADE',
    },
  });
};

/**
 * @param pgm {import('node-pg-migrate').MigrationBuilder}
 * @param run {() => void | undefined}
 * @returns {Promise<void> | void}
 */
exports.down = (pgm) => {
  pgm.dropTable('top_repositories');
  pgm.dropTable('users');
};
