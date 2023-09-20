import app from "./utils/Server";
import errorHandler from "./middlewares/errorHandler";
import * as https from 'https';
import * as fs from 'fs';

const options: https.ServerOptions = {
  key: fs.readFileSync('/etc/ssl/private.key'),
  cert: fs.readFileSync('/etc/ssl/certificate.crt')
};
app.use(errorHandler);
const httpsServer = https.createServer(options, app);
const PORT = process.env.APP_PORT || 443;


httpsServer.listen(PORT, () => {
  console.log(`Node.js server is running on HTTPS port ${PORT}`);

});