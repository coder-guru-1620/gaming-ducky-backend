# Gaming Ducky Backend

## Installation

```bash
$ npm install
```

## Running the app

```bash
# development
$ npm run start

# watch mode
$ npm run start:dev

# production mode
$ npm run start:prod
```

## Database

Make sure you have a PostgreSQL database running and update `.env` file with credentials.

```bash
# Generate migration
$ npm run migration:generate -- -n InitialMigration

# Run migration
$ npm run migration:run
```

## Test

```bash
# unit tests
$ npm run test

# e2e tests
$ npm run test:e2e
```
# gaming-ducky-backend
