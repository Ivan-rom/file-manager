import { readdir } from "node:fs";

export function logDirectory() {
  readdir(process.cwd(), { withFileTypes: true }, (err, elements) => {
    if (err) return console.log(err);

    const files = elements
      .filter((el) => el.isFile())
      .map((file) => ({ Name: file.name, Type: "file" }))
      .sort(function (a, b) {
        if (a.Name < b.Name) return -1;
        if (a.Name > b.Name) return 1;
        return 0;
      });

    const folders = elements
      .filter((el) => el.isDirectory())
      .map((file) => ({ Name: file.name, Type: "directory" }))
      .sort(function (a, b) {
        if (a.Name < b.Name) return -1;
        if (a.Name > b.Name) return 1;
        return 0;
      });

    console.table([...folders, ...files]);
  });
}

export function changeDirectory(directory) {
  try {
    process.chdir(directory);
    console.log(`You are currently in ${process.cwd()}`);
  } catch {
    console.log("There is no such directory");
  }
}
