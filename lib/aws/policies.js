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
