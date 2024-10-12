export const generateId = () => {
  return Math.floor(Math.random() * 10001);
};

export const displayTime = (date: string): string => {
  return new Date(date).toLocaleString('en-US', {
    hour: 'numeric',
    minute: 'numeric',
    hour12: false
  });
};

export const displayDate = (date: string): string => {
  return new Date(date).toLocaleString('en-US', {
    day: '2-digit',
    month: '2-digit',
    year: '2-digit'
  });
};
