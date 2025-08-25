// Utility function to capitalize first letter while preserving the rest of the casing
export const capitalizeFirst = (str: string) => {
  if (!str) return str;
  return str.charAt(0).toUpperCase() + str.slice(1);
};
