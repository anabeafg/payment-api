export const toBrasiliaISOString = (date: Date = new Date()): string => {
  const offset = -3 * 60 * 60 * 1000;
  return new Date(date.getTime() + offset).toISOString();
};
