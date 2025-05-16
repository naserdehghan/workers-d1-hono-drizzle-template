# Workers,D1,Hono,Drizzle Template
---
### 1.Update wrangle configs and .dev.vars
update `wrangler.jsonc` and configure it based on your project

copy `.dev.vars.example` to `.dev.vars` and update the values

### 2.Create D1 database
```bash
pnpm run db:create <db-name> # for local db
pnpm run db:create <db-name> --local # for cf db
```

then update `wrangler.jsonc` and add the database binding
```json
{
  "d1_databases": [
        {
			"binding": "DB",
			"database_name": "<db-name>",
			"database_id": "<db-id>"
	    }
  ]
}
```

### 3.Migrate D1 database
```bash
pnpm run db:generate # to generate migration files
pnpm run db:apply <db-name> --local # for local db
pnpm run db:apply <db-name>         # for cf db
```
### 4. Run project locally
```bash
pnpm run dev
```

### 5. Deploy project to Workers
```bash
pnpm run deploy
```