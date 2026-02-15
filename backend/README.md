# UAlly Backend

Node.js/Express backend for UAlly.

## Prerequisites

- Node.js (v16 or higher)
- npm or yarn

## Setup

```bash
npm install
node scripts/init-db.js
```

## Development

```bash
npm run dev
```

Server runs on `http://localhost:8080`.

## Notes

- Database is SQLite using the `sqlite3` package.
- SMTP settings live in `server/serverInfo.json`.
