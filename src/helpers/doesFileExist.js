import fsPromises from "node:fs/promises";

export default async function doesFileExist(file) {
  try {
    await fsPromises.access(file);
    return true;
  } catch {
    return false;
  }
}
