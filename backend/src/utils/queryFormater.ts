export const queryFormater = (query: string, type: string) => {
  if (type === "number") {
    const outcome = Number(query);
    if (Number.isNaN(outcome)) return undefined;
  }
}