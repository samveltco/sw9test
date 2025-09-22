// ©2024 Austin App House. All rights reserved.
export default function getLocalTime(timeZone) {
  if(!timeZone) {
    return new Date();
  }
  const localDate = new Date();
  return new Date(localDate.toLocaleString('en-US', { timeZone }));
}
