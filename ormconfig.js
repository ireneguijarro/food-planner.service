module.exports = {
  type: 'mysql',
  host: process.env.DB_HOST || 'localhost',
  username: process.env.DB_USER || 'root',
  // password: process.env.DB_PASSWORD || 'scout',
  database: process.env.DB_NAME || 'food-planner',
  charset: 'utf8',
  driver: 'mysql',
  synchronize: process.env.NODE_ENV !== 'production',
  entities: [
    '**/**.entity.ts',
    // '**/**.entity.js'
  ],
  logging: process.env.NODE_ENV !== 'production' ? 'all' : 'error',
  migrations: ['migration/*.ts'],
  cli: {
    migrationsDir: 'migration',
  },
  connectTimeout: 30000,
  acquireTimeout: 30000,
};
