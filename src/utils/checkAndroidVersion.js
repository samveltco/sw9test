// ©2024 Austin App House. All rights reserved.
const checkAndroidVersion = () => {
  const userAgent = window.navigator.userAgent.toLowerCase();
  const match = userAgent.match(/android\s([0-9.]*)/i);
  const androidVersion = match ? match[1] : undefined;
  // eslint-disable-next-line radix
  const andVersion = parseInt(androidVersion);
  if (!andVersion || andVersion >= 8) {
    return false;
  }
  return true;
};
export default checkAndroidVersion;
