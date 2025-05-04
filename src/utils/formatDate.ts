export const formatDate = (date: Date = new Date()): string => {
  const offset = -3 * 60 * 60 * 1000
  return new Date(date.getTime() + offset).toISOString()
};

export const formatDueDate = (dueDate: string): string => {
  const date = new Date(dueDate);
  return date.toISOString();
};
