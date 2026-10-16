import { createApp } from "./app.js";
import { ConfigurationError, readEnv } from "./config/env.js";
import { connectDatabase, disconnectDatabase } from "./config/database.js";
import { logger } from "./lib/logger.js";

async function start() {
  const env = readEnv();
  await connectDatabase(env.DATABASE_URL);
  const server = createApp(env.FRONTEND_ORIGIN).listen(env.PORT, () => {
    logger.info(`Solara API listening on port ${env.PORT}`);
  });

  let stopping = false;
  function shutdown(exitCode = 0) {
    if (stopping) return;
    stopping = true;
    const deadline = setTimeout(() => process.exit(1), 10000);
    deadline.unref();
    server.close(() => {
      void disconnectDatabase().then(() => {
        clearTimeout(deadline);
        process.exitCode = exitCode;
      }).catch(() => process.exit(1));
    });
  }
  process.on("SIGINT", () => shutdown());
  process.on("SIGTERM", () => shutdown());
  server.on("error", () => {
    logger.error("HTTP server failed. Check the configured port.");
    shutdown(1);
  });
}

start().catch(async (error: unknown) => {
  logger.error(error instanceof ConfigurationError
    ? error.message
    : "Backend startup failed. Check PostgreSQL availability and DATABASE_URL.");
  await disconnectDatabase();
  process.exitCode = 1;
});
