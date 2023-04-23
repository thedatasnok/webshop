/**
 * Generates a unique name based on the prefix and existing names.
 *
 * @param prefix the prefix to user for the name
 * @param existingNames the other names to check for uniqueness against
 *
 * @returns the unique name
 */
export const generateUniqueName = (prefix: string, existingNames: string[]) => {
  let index = 0;
  let name = prefix;

  while (existingNames.includes(name)) {
    index++;
    name = `${prefix} ${index}`;
  }

  return name;
};
