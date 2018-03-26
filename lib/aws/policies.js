/**
 * This creates a API Gateway policy, allowing or negating invocation
 *
 * @param {String} Effect
 * @param {String} Resource
 * @param {Object} context
 */
export function createUserPolicy(Effect, Resource, context) {
  return {
    principalId: "user",
    policyDocument: {
      Version: "2012-10-17",
      Statement: [
        {
          Action: "execute-api:Invoke",
          Effect,
          Resource
        }
      ]
    },
    context
  };
}
