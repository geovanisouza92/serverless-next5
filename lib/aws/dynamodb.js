const aws = require("aws-sdk");
const cuid = require("cuid");

/**
 * @typedef {Object} Repository
 * @property {Function} create
 * @property {Function} get
 * @property {Function} list
 * @property {Function} update
 * @property {Function} destroy
 */

/**
 * Creates a repository backed by DynamoDB
 *
 * @returns {Repository}
 */
export function createRepository() {
  const options = { region: "us-east-1" };
  if (process.env.NODE_ENV !== "production") {
    // Offline test backend using "localstack"
    options.endpoint = new aws.Endpoint("http://0.0.0.0:4569");
  }

  const client = new aws.DynamoDB.DocumentClient(options);

  const TableName = "notes";

  return {
    async create(Item) {
      Item.nodeId = cuid();
      Item.updatedAt = Item.createdAt = new Date().getTime();
      return client
        .put({
          TableName,
          Item
        })
        .promise();
    },
    async get(userId, nodeId) {
      return client
        .get({
          TableName,
          Key: {
            userId,
            noteId
          }
        })
        .promise();
    },
    async list(userId) {
      return client
        .query({
          TableName,
          KeyConditionExpression: "userId = :userId",
          ExpressionAttributeValues: {
            ":userId": userId
          }
        })
        .promise();
    },
    async update(userId, noteId, data) {
      return client
        .update({
          TableName,
          Key: {
            userId,
            noteId
          },
          UpdateExpression: "SET content = :content, updatedAt = :updatedAt",
          ExpressionAttributeValues: {
            ":content": data.content,
            ":updatedAt": new Date().getTime()
          },
          ReturnValues: "ALL_NEW"
        })
        .promise();
    },
    async destroy(userId, noteId) {
      return client
        .delete({
          TableName,
          Key: {
            userId,
            noteId
          }
        })
        .promise();
    }
  };
}
