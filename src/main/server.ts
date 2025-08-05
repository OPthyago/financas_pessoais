import { setupApolloServer } from "./config/apollo.server";
import { setupApp } from "./config/app";
import env from "./config/env";

async function bootstrap() {
  const app = await setupApp();
  await setupApolloServer(app);
  await new Promise<void>((resolve) => app.listen({ port: env.port }, resolve));
  console.log(`🚀 Server ready at http://localhost:${env.port}`);
}

bootstrap();
