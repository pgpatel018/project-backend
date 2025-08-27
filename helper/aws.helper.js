export async function getSecureSSMParam(name) {
  const parameterPath = `/myapp/${name}`;
 
  const param = await ssm
    .getParameter({
      Name: parameterPath,
      WithDecryption: true,
    })
    .promise();
 
  if (!param.Parameter?.Value) {
    throw new Error(`Secure parameter "${parameterPath}" not found in SSM`);
  }
 
  return param.Parameter.Value;
}