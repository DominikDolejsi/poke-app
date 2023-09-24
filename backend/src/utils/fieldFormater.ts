const StringToArray = (value: string) => {
  const parsedValue = parseFloat(value);
  if (isNaN(parsedValue)) return null;
  return parsedValue;
};

export const isArrayinString = (value: string) => {
  if (!value) return true;
  const formatedToArray = value.split(" ").map(StringToArray);
  if (formatedToArray.includes(null)) return false;
  return true;
};
