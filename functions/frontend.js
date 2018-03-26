const adapter = require("aws-serverless-express");
const next = require("next");

// Here we create the next app instance and wrap it
const app = next({ dev: process.env.NODE_ENV !== "production" });
const server = adapter.createServer(app.getRequestHandler());

// The handler function prepare the app and proxy the event (HTTP) to the app
export async function handler(event, context, callback) {
  await app.prepare();

  const fakeContext = {
    succeed(res) {
      callback(null, res);
    }
  };

  adapter.proxy(server, event, fakeContext);
}
