import type { Environment } from 'vitest';
import { execSync } from 'node:child_process';
import { PrismaClient } from '@prisma/client';
import 'dotenv/config';
import { v4 as uuidv4 } from 'uuid';

function generateDatabaseURL(schema: string) {
  if (!process.env.DATABASE_URL) {
    throw new Error('Please provide a DATABASE_URL environment variable.');
  }
  const url = new URL(process.env.DATABASE_URL);
  url.searchParams.set('schema', schema);
  return url.toString();
}

export default <Environment>{
  name: 'prisma',
  transformMode: 'ssr',
  async setup() {
    const schema = uuidv4();
    const databaseURL = generateDatabaseURL(schema);

    process.env.DATABASE_URL = databaseURL;

    execSync('npx prisma migrate dev');

    return {
      async teardown() {
        const client = new PrismaClient({
          datasources: {
            db: {
              url: databaseURL,
            },
          },
        });
        await client.$connect();
        await client.$executeRawUnsafe(`DROP SCHEMA IF EXISTS "${schema}" CASCADE`);
        await client.$disconnect();
      }
    };
  }
};
