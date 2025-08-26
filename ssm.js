const { SSMClient, GetParameterCommand } = require("@aws-sdk/client-ssm");

const ssm = new SSMClient({ region: "us-east-1" }); // change to your AWS region

async function getParameter(name, withDecryption = true) {
  const command = new GetParameterCommand({
    Name: name,
    WithDecryption: withDecryption
  });
  const response = await ssm.send(command);
  return response.Parameter.Value;
}

module.exports = { getParameter };