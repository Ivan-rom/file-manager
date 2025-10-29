import process from "node:process";
import fs from "node:fs/promises";

import getDirentType from "./getDirentType.js";

export default async function navigation(command, path) {
  switch (command) {
    case "up":
      process.chdir("..");
      break;

    case "cd":
      const correctedPath =
        path.startsWith("/") || path.startsWith("\\")
          ? `${process.cwd()}/${path}`
          : path;

      process.chdir(correctedPath);
      break;

    case "ls":
      await fs
        .readdir(process.cwd(), { withFileTypes: true })
        .then((dirent) => {
          console.table(
            dirent.map((d) => ({
              name: d.name,
              type: getDirentType(d),
            }))
          );
        });
      break;

    default:
      break;
  }
}
