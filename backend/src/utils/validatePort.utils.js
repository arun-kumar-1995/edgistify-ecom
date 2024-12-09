export const ValidateServerPort = (appPort) => {
  const port = parseInt(appPort, 10);

  if (isNaN(port) || port > 65535 || port < 1024) {
    throw new Error("Invalid App Port number");
  }
  return port;
};
