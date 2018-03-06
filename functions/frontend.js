const adapter = require("aws-serverless-express");
const next = require("next");

const app = next({ dev: process.env.NODE_ENV !== "production" });
const server = adapter.createServer(app.getRequestHandler());

export async function handler(event, context, callback) {
  await app.prepare();

  const fakeContext = {
    succeed(res) {
      callback(null, res);
    }
  };

  adapter.proxy(server, event, fakeContext);
}
