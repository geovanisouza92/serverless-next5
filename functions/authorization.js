const authz = require("../lib/common/authorization");
const policies = require("../lib/aws/policy");

export async function handler(event, context, handler) {
  const token =
    event.authorizationToken && event.authorizationToken.split(" ")[1];
  const effect = authz.isAuthorized(token) ? "Allow" : "Deny";
  const context = authz.getSession(token);
  const policy = policies.createUserPolicy(effect, event.methodArn, context);
  callback(null, policy);
}
