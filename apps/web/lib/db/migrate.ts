import { drizzle } from 'drizzle-orm/better-sqlite3';
import { migrate } from 'drizzle-orm/better-sqlite3/migrator';
import Database from 'better-sqlite3';
import { existsSync, mkdirSync } from 'node:fs';
import { dirname, resolve } from 'node:path';

const dbPath = process.env.DATABASE_URL || './data/local.db';

// Ensure the data directory exists
const dir = dirname(dbPath);
if (!existsSync(dir)) {
  mkdirSync(dir, { recursive: true });
}

console.log(`[migrate] Opening database at ${resolve(dbPath)}`);

const sqlite = new Database(dbPath);
sqlite.pragma('journal_mode = WAL');
sqlite.pragma('foreign_keys = ON');

const db = drizzle(sqlite);

const migrationsFolder = resolve(__dirname, 'migrations');
console.log(`[migrate] Running migrations from ${migrationsFolder}`);

migrate(db, { migrationsFolder });

console.log('[migrate] Migrations applied successfully.');
sqlite.close();
