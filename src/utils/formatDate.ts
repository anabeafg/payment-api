export const formatDate = (date: Date = new Date()): string => {
  const offset = -3 * 60 * 60 * 1000
  return new Date(date.getTime() + offset).toISOString()
};

export const formatDueDate = (dueDate: string): string => {
  let dueDateObject: Date;

  if (/\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}(\.\d{3})?Z/.test(dueDate)) {
    dueDateObject = new Date(dueDate);
    dueDateObject.setUTCHours(0, 0, 0, 0);
  } else {
    const [year, month, day] = dueDate.split('-').map(Number);
    dueDateObject = new Date(year, month - 1, day, 0, 0, 0, 0);
  }

  return formatDate(dueDateObject);
};