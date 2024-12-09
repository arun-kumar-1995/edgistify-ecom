export const getEnvVariable = (key, errorMessage) => {
  const value = process.env[key];
  if (!value) throw new Error(errorMessage);
  return value;
};
