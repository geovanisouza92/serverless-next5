const authn = require("../lib/common/authentication");

export async function handler(event, context, callback) {
  const credentials = JSON.parse(event.body);
  const token = authn.authenticate(credentials.username, credentials.password);

  if (token) {
    callback(null, {
      statusCode: 200,
      body: JSON.stringify({ token })
    });
  } else {
    callback(null, {
      statusCode: 401,
      body: JSON.stringify({
        error: "Username or password invalid"
      })
    });
  }
}
