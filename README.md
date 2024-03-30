# Workers,D1,Hono,Drizzle Template
---
### 1.Change wrangle configs
rename `wrangler.example.toml` to `wrangler.toml` and configure it based on your project

### 2.Migrate D1 database
```bash
pnpm run db:generate # to generate migration files
pnpm run db:apply <db-name> --local # for local db
pnpm run db:apply <db-name> --remote # for cf db
```
### 3. Run project locally
```bash
pnpm run dev
```

### 4. Deploy project to Workers
```bash
pnpm run deploy
```