CREATE TABLE IF NOT EXISTS `users` (
  `id`            TEXT PRIMARY KEY NOT NULL,
  `email`         TEXT UNIQUE,
  `name`          TEXT,
  `role`          TEXT NOT NULL DEFAULT 'member',
  `emailVerified` INTEGER,
  `image`         TEXT,
  `createdAt`     TEXT NOT NULL,
  `updatedAt`     TEXT NOT NULL
);

CREATE TABLE IF NOT EXISTS `accounts` (
  `id`                TEXT PRIMARY KEY NOT NULL,
  `userId`            TEXT NOT NULL REFERENCES `users`(`id`) ON DELETE CASCADE,
  `type`              TEXT NOT NULL,
  `provider`          TEXT NOT NULL,
  `providerAccountId` TEXT NOT NULL,
  `refresh_token`     TEXT,
  `access_token`      TEXT,
  `expires_at`        INTEGER,
  `token_type`        TEXT,
  `scope`             TEXT,
  `id_token`          TEXT,
  `session_state`     TEXT
);

CREATE TABLE IF NOT EXISTS `sessions` (
  `id`           TEXT PRIMARY KEY NOT NULL,
  `sessionToken` TEXT NOT NULL UNIQUE,
  `userId`       TEXT NOT NULL REFERENCES `users`(`id`) ON DELETE CASCADE,
  `expires`      TEXT NOT NULL
);

CREATE TABLE IF NOT EXISTS `verificationTokens` (
  `identifier` TEXT NOT NULL,
  `token`      TEXT NOT NULL,
  `expires`    TEXT NOT NULL,
  PRIMARY KEY (`identifier`, `token`)
);

CREATE TABLE IF NOT EXISTS `favorites` (
  `id`          TEXT PRIMARY KEY NOT NULL,
  `userId`      TEXT NOT NULL REFERENCES `users`(`id`) ON DELETE CASCADE,
  `contentId`   TEXT NOT NULL,
  `contentType` TEXT NOT NULL,
  `title`       TEXT NOT NULL,
  `addedAt`     TEXT NOT NULL
);

CREATE TABLE IF NOT EXISTS `pathProgress` (
  `id`             TEXT PRIMARY KEY NOT NULL,
  `userId`         TEXT NOT NULL REFERENCES `users`(`id`) ON DELETE CASCADE,
  `pathSlug`       TEXT NOT NULL,
  `completedDays`  TEXT NOT NULL DEFAULT '[]',
  `startedAt`      TEXT NOT NULL,
  `lastActivityAt` TEXT NOT NULL
);

CREATE TABLE IF NOT EXISTS `webinarEvents` (
  `id`          TEXT PRIMARY KEY NOT NULL,
  `title`       TEXT NOT NULL,
  `slug`        TEXT NOT NULL UNIQUE,
  `description` TEXT,
  `startsAt`    TEXT NOT NULL,
  `durationMin` INTEGER NOT NULL,
  `host`        TEXT NOT NULL,
  `language`    TEXT NOT NULL DEFAULT 'pl',
  `capacity`    INTEGER,
  `status`      TEXT NOT NULL DEFAULT 'upcoming',
  `tags`        TEXT NOT NULL DEFAULT '[]',
  `featured`    INTEGER NOT NULL DEFAULT 0,
  `draft`       INTEGER NOT NULL DEFAULT 0,
  `createdAt`   TEXT NOT NULL
);

CREATE TABLE IF NOT EXISTS `webinarSignups` (
  `id`                TEXT PRIMARY KEY NOT NULL,
  `webinarId`         TEXT NOT NULL REFERENCES `webinarEvents`(`id`) ON DELETE CASCADE,
  `name`              TEXT NOT NULL,
  `email`             TEXT NOT NULL,
  `question`          TEXT,
  `privacyConsent`    INTEGER NOT NULL,
  `marketingConsent`  INTEGER NOT NULL DEFAULT 0,
  `disclaimerConsent` INTEGER NOT NULL,
  `createdAt`         TEXT NOT NULL
);
