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
  createFile(distFile, "", (err) => {
    if (err) console.log(err);
  });

  const readStream = createReadStream(sourceFile, "utf-8");
  const writeStream = createWriteStream(distFile);

  readStream.on("data", (chunk) => {
    writeStream.write(chunk);
  });
}

export function deleteFile(fileName) {
  unlink(fileName, (err) => {
    if (err) console.log(err);
  });
}
