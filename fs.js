import {
  createReadStream,
  createWriteStream,
  writeFile,
  rename,
  unlink,
} from "node:fs";

export function readFile(path) {
  const stream = createReadStream(path, "utf-8");
  stream.on("data", (chunk) => {
    console.log(chunk);
  });
}

export function createFile(fileName) {
  writeFile(fileName, "", (err) => {
    if (err) console.log(err);
  });
}

export function renameFile(oldName, newName) {
  rename(oldName, newName, (err) => {
    if (err) console.log(err);
  });
}

export function copyFile(sourceFile, distFile) {
  return new Promise((res, rej) => {
    createFile(distFile, "", (err) => {
      if (err) console.log(err);
      rej();
    });

    const readStream = createReadStream(sourceFile, "utf-8");
    const writeStream = createWriteStream(distFile);

    readStream.pipe(writeStream);

    res();
  });
}

export function deleteFile(fileName) {
  unlink(fileName, (err) => {
    if (err) console.log(err);
  });
}

export function moveFile(initialPath, distPath) {
  copyFile(initialPath, distPath).then(() => {
    deleteFile(initialPath);
  });
}
