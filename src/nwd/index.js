import process from "node:process";
import fs from "node:fs";

import getDirentType from "./getDirentType.js";

export default function nwd(command, path) {
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
      fs.readdir(process.cwd(), { withFileTypes: true }, (err, dirent) => {
        if (err) throw err;

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
