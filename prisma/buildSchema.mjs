import fs from 'fs/promises';
import path from 'path';

const __dirname = path.dirname(new URL(import.meta.url).pathname);

async function buildSchemas() {
  console.log('Building Prisma schemas...');

  const modelsPath = path.join(__dirname, 'models', '_models.prisma');
  const basePath = path.join(__dirname, 'base.prisma');
  const testBasePath = path.join(__dirname, 'test.base.prisma');

  try {
    const modelsContent = await fs.readFile(modelsPath, 'utf-8');
    const baseContent = await fs.readFile(basePath, 'utf-8');
    const testBaseContent = await fs.readFile(testBasePath, 'utf-8');

    const finalSchema = `${baseContent}\n\n${modelsContent}`;
    const finalTestSchema = `${testBaseContent}\n\n${modelsContent}`;

    await fs.writeFile(path.join(__dirname, 'schema.prisma'), finalSchema);
    await fs.writeFile(path.join(__dirname, 'test.schema.prisma'), finalTestSchema);

    console.log('Schemas built successfully!');
  } catch (error) {
    console.error('Error building schemas:', error);
    process.exit(1);
  }
}

buildSchemas();
