# Workflow

Stack:

- Apollo Server
- Prisma Client
- Prisma Migrate
- SQLite

## Bootstrap

### 1. Install Packages

```
npm install
```

or

```
yarn
```

### 2. Create Database

Create .env file with

```
DATABASE_URL="file:./dev.db"

JWT_SECRET="YOUR_JWT_SECRET_KEY"

ADMIN_EMAIL="admin@admin.com"
ADMIN_PASSWORD="admin"
```

Start Migration

```
npx prisma migrate dev
```

Seed Database

```
npx prisma db seed --preview-feature
```

### 3. Start the GrahpQL Server

```
npm run dev
```

or

```
yarn dev
```

## Using the GraphQL API

Navigate to [http://localhost:4000](http://localhost:4000) in your browser to explore the API of your GraphQL server in a GraphQL Playground.
