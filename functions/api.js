const adapter = require("aws-serverless-express");
const middleware = require("aws-serverless-express/middleware");
const api = require("../lib/common/api");
const dynamodb = require("../lib/aws/dynamodb");

const middlewares = [];
const repository = dynamodb.createRepository();
const handler = api.createApi(middlewares, repository);
const server = adapter.createServer(handler);

export async function handler(event, context, callback) {
  const fakeContext = {
    succeed(res) {
      callback(null, res);
    }
  };

  adapter.proxy(server, event, fakeContext);
}
