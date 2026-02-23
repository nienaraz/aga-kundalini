import {
  sqliteTable,
  text,
  integer,
  primaryKey,
} from 'drizzle-orm/sqlite-core';
import { relations } from 'drizzle-orm';

// ---------------------------------------------------------------------------
// Auth: users
// ---------------------------------------------------------------------------
export const users = sqliteTable('users', {
  id: text('id').primaryKey(), // cuid
  email: text('email').unique(),
  name: text('name'),
  role: text('role', { enum: ['guest', 'member', 'admin'] })
    .notNull()
    .default('member'),
  emailVerified: integer('emailVerified', { mode: 'timestamp' }),
  image: text('image'),
  createdAt: text('createdAt')
    .notNull()
    .$defaultFn(() => new Date().toISOString()),
  updatedAt: text('updatedAt')
    .notNull()
    .$defaultFn(() => new Date().toISOString()),
});

// ---------------------------------------------------------------------------
// Auth: accounts (NextAuth adapter)
// ---------------------------------------------------------------------------
export const accounts = sqliteTable('accounts', {
  id: text('id').primaryKey(),
  userId: text('userId')
    .notNull()
    .references(() => users.id, { onDelete: 'cascade' }),
  type: text('type').notNull(),
  provider: text('provider').notNull(),
  providerAccountId: text('providerAccountId').notNull(),
  refresh_token: text('refresh_token'),
  access_token: text('access_token'),
  expires_at: integer('expires_at'),
  token_type: text('token_type'),
  scope: text('scope'),
  id_token: text('id_token'),
  session_state: text('session_state'),
});

// ---------------------------------------------------------------------------
// Auth: sessions
// ---------------------------------------------------------------------------
export const sessions = sqliteTable('sessions', {
  id: text('id').primaryKey(),
  sessionToken: text('sessionToken').notNull().unique(),
  userId: text('userId')
    .notNull()
    .references(() => users.id, { onDelete: 'cascade' }),
  expires: text('expires').notNull(),
});

// ---------------------------------------------------------------------------
// Auth: verification tokens
// ---------------------------------------------------------------------------
export const verificationTokens = sqliteTable(
  'verificationTokens',
  {
    identifier: text('identifier').notNull(),
    token: text('token').notNull(),
    expires: text('expires').notNull(),
  },
  (table) => ({
    pk: primaryKey({ columns: [table.identifier, table.token] }),
  }),
);

// ---------------------------------------------------------------------------
// App: favorites
// ---------------------------------------------------------------------------
export const favorites = sqliteTable('favorites', {
  id: text('id').primaryKey(),
  userId: text('userId')
    .notNull()
    .references(() => users.id, { onDelete: 'cascade' }),
  contentId: text('contentId').notNull(),
  contentType: text('contentType').notNull(),
  title: text('title').notNull(),
  addedAt: text('addedAt')
    .notNull()
    .$defaultFn(() => new Date().toISOString()),
});

// ---------------------------------------------------------------------------
// App: path progress
// ---------------------------------------------------------------------------
export const pathProgress = sqliteTable('pathProgress', {
  id: text('id').primaryKey(),
  userId: text('userId')
    .notNull()
    .references(() => users.id, { onDelete: 'cascade' }),
  pathSlug: text('pathSlug').notNull(),
  completedDays: text('completedDays').notNull().default('[]'), // JSON array
  startedAt: text('startedAt')
    .notNull()
    .$defaultFn(() => new Date().toISOString()),
  lastActivityAt: text('lastActivityAt')
    .notNull()
    .$defaultFn(() => new Date().toISOString()),
});

// ---------------------------------------------------------------------------
// App: webinar events
// ---------------------------------------------------------------------------
export const webinarEvents = sqliteTable('webinarEvents', {
  id: text('id').primaryKey(),
  title: text('title').notNull(),
  slug: text('slug').notNull().unique(),
  description: text('description'),
  startsAt: text('startsAt').notNull(),
  durationMin: integer('durationMin').notNull(),
  host: text('host').notNull(),
  language: text('language').notNull().default('pl'),
  capacity: integer('capacity'),
  status: text('status', { enum: ['upcoming', 'live', 'ended'] })
    .notNull()
    .default('upcoming'),
  tags: text('tags').notNull().default('[]'), // JSON array
  featured: integer('featured', { mode: 'boolean' }).notNull().default(false),
  draft: integer('draft', { mode: 'boolean' }).notNull().default(false),
  createdAt: text('createdAt')
    .notNull()
    .$defaultFn(() => new Date().toISOString()),
});

// ---------------------------------------------------------------------------
// App: webinar signups
// ---------------------------------------------------------------------------
export const webinarSignups = sqliteTable('webinarSignups', {
  id: text('id').primaryKey(),
  webinarId: text('webinarId')
    .notNull()
    .references(() => webinarEvents.id, { onDelete: 'cascade' }),
  name: text('name').notNull(),
  email: text('email').notNull(),
  question: text('question'),
  privacyConsent: integer('privacyConsent', { mode: 'boolean' }).notNull(),
  marketingConsent: integer('marketingConsent', { mode: 'boolean' })
    .notNull()
    .default(false),
  disclaimerConsent: integer('disclaimerConsent', { mode: 'boolean' }).notNull(),
  createdAt: text('createdAt')
    .notNull()
    .$defaultFn(() => new Date().toISOString()),
});

// ---------------------------------------------------------------------------
// Relations
// ---------------------------------------------------------------------------
export const usersRelations = relations(users, ({ many }) => ({
  accounts: many(accounts),
  sessions: many(sessions),
  favorites: many(favorites),
  pathProgress: many(pathProgress),
}));

export const accountsRelations = relations(accounts, ({ one }) => ({
  user: one(users, { fields: [accounts.userId], references: [users.id] }),
}));

export const sessionsRelations = relations(sessions, ({ one }) => ({
  user: one(users, { fields: [sessions.userId], references: [users.id] }),
}));

export const favoritesRelations = relations(favorites, ({ one }) => ({
  user: one(users, { fields: [favorites.userId], references: [users.id] }),
}));

export const pathProgressRelations = relations(pathProgress, ({ one }) => ({
  user: one(users, {
    fields: [pathProgress.userId],
    references: [users.id],
  }),
}));

export const webinarEventsRelations = relations(webinarEvents, ({ many }) => ({
  signups: many(webinarSignups),
}));

export const webinarSignupsRelations = relations(webinarSignups, ({ one }) => ({
  webinar: one(webinarEvents, {
    fields: [webinarSignups.webinarId],
    references: [webinarEvents.id],
  }),
}));
