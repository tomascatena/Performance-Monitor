import os from 'os';

export const getMacAddress = () => {
  const networkInterfaces = os.networkInterfaces();

  const macAddressArray = Object.keys(networkInterfaces).map((key) => {
    const networkInterface = networkInterfaces[key];

    const foundInterface = networkInterface?.find(
      (nI) => nI.family === 'IPv4' && nI.internal === false
    );

    if (foundInterface) {
      return foundInterface.mac;
    }

    return null;
  });

  return macAddressArray.find((m) => m !== null);
};
