export const isValidFile = (files: string[]) => {
  for (const file of files) {
    if (file !== "en.json" && file !== "fr.json") return false;
  }
  return true;
};
