// /server.js
import app from "./app.js";
import appConfig from "./config/app.config.js";
import { log } from "./utils/logger.js";

const port = appConfig.port || 4000;

app.listen(port, () => {
  log.info(`Server listening on port ${port} (${appConfig.env})`);
});
