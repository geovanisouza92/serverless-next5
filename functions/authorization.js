const authz = require("../lib/common/authorization");
const policies = require("../lib/aws/policies");

// The handler function pick the JWT token, check its validity and return the
// policy for API Gateway allowing (or not) subsequent requests
export async function handler(event, context, handler) {
  const token =
    event.authorizationToken && event.authorizationToken.split(" ")[1];
  const effect = authz.isAuthorized(token) ? "Allow" : "Deny";
  const session = authz.getSession(token);
  const policy = policies.createUserPolicy(effect, event.methodArn, session);
  callback(null, policy);
}
