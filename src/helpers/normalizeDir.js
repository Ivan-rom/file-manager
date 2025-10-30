import path from "node:path";

export default function normalizeDir(dir) {
  const directory = dir.startsWith(".")
    ? `${process.cwd()}${path.sep}${dir}`
    : dir.startsWith("/") || dir.startsWith("\\")
    ? `${process.cwd()}${path.sep}${dir.slice(1)}`
    : dir;

  return path.normalize(directory);
}
