const adapter = require("aws-serverless-express");
const middleware = require("aws-serverless-express/middleware");
const api = require("../lib/common/api");
const dynamodb = require("../lib/aws/dynamodb");

// Here we create our repository implementation, backed by DynamoDB
const repository = dynamodb.createRepository();

// Here we declare additional middlewares that adapt data from API Gateway
// allowing the code to be agnostic
const middlewares = [];

// Here we create the Express app and wrap it
const handler = api.createApi(middlewares, repository);
const server = adapter.createServer(handler);

// The handler function, just proxy the event (HTTP request) to Express
export async function handler(event, context, callback) {
  const fakeContext = {
    succeed(res) {
      callback(null, res);
    }
  };

  adapter.proxy(server, event, fakeContext);
}
