// Prisma CLI config (migrations, generate). Next.js loads .env files itself;
// the CLI does not, so load them here — .env.local first, matching Next's precedence.
import { config } from "dotenv";
import { defineConfig } from "prisma/config";

config({ path: ".env.local", quiet: true });
config({ quiet: true });

export default defineConfig({
  schema: "prisma/schema.prisma",
  migrations: {
    path: "prisma/migrations",
  },
  datasource: {
    // Migrations need the direct (non-pooled) connection.
    url: process.env.DIRECT_URL || process.env.DATABASE_URL,
  },
});
