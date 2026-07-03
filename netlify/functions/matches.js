exports.handler = async function(event) {
  const path = event.queryStringParameters && event.queryStringParameters.path 
    ? event.queryStringParameters.path 
    : "/competitions/WC/matches";

  const https = require("https");

  const data = await new Promise((resolve, reject) => {
    const options = {
      hostname: "api.football-data.org",
      path: "/v4" + path,
      method: "GET",
      headers: { "X-Auth-Token": "91e7f468692543228ac3b405867ecde9" }
    };
    const req = https.request(options, (res) => {
      let body = "";
      res.on("data", chunk => body += chunk);
      res.on("end", () => resolve(body));
    });
    req.on("error", reject);
    req.end();
  });

  return {
    statusCode: 200,
    headers: { "Content-Type": "application/json" },
    body: data,
  };
};
