import app from './index';

// Express Server Connection
const server = app.listen(app.get('port'), () =>
  console.log(`PMF team web-server Listening on PORT ${app.get('port')}`),
);

export default server;