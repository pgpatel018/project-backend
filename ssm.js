// ssm.js
const { SSMClient, GetParameterCommand } = require("@aws-sdk/client-ssm");

const client = new SSMClient({ region: process.env.AWS_REGION || "us-east-1" });

async function getParameter(name, withDecryption = false) {
  try {
    const command = new GetParameterCommand({
      Name: name,
      WithDecryption: withDecryption,
    });
    const response = await client.send(command);
    return response.Parameter.Value;
  } catch (err) {
    console.error(`❌ Failed to get SSM parameter ${name}:`, err);
    throw err;
  }
}

module.exports = { getParameter };
