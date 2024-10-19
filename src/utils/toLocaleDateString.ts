export const toLocaleDateString = (date: Date): string => {
  return date.toLocaleDateString('nl-NL', {
    day: 'numeric',
    month: 'numeric',
    year: 'numeric',
  });
};
