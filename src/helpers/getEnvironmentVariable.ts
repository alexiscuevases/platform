export const getEnvironmentVariable = variable => {
  const environmentVariable = process.env[variable];
  if (!environmentVariable) throw new Error(`Environment variable '${variable}' is not defined`);

  return environmentVariable;
};
