-- SQLite

DROP TABLE IF EXISTS "Categories";

CREATE TABLE IF NOT EXISTS "Categories" (
    "id" INTEGER PRIMARY KEY AUTOINCREMENT,
    "title" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "userID" INTEGER NOT NULL,
    "type" TEXT NOT NULL
);
