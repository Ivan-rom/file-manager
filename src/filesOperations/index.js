import fs from "node:fs";
import fsPromises from "node:fs/promises";
import normalizeDir from "../helpers/normalizeDir.js";
import doesFileExist from "../helpers/doesFileExist.js";

export default async function filesOperations(command, srcDir, destDir) {
  const correctedSrcDir = normalizeDir(srcDir || "");
  const correctedDestDir = normalizeDir(destDir || "");

  switch (command) {
    case "cat":
      await new Promise((res, rej) => {
        const stream = fs.createReadStream(correctedSrcDir, {
          encoding: "utf8",
        });
        stream.on("data", (chunk) => console.log(chunk));
        stream.on("end", () => res());
        stream.on("error", (err) => rej(err));
      });
      break;

    case "add":
      if (await doesFileExist(correctedSrcDir)) {
        throw new Error("File already exists");
      }
      await fsPromises.writeFile(correctedSrcDir, "");
      break;

    case "mkdir":
      await fsPromises.mkdir(correctedSrcDir);
      break;

    case "rn":
      if (await doesFileExist(correctedDestDir)) {
        throw new Error("File already exists");
      }
      await fsPromises.rename(correctedSrcDir, correctedDestDir);
      break;

    case "rm":
      await fsPromises.unlink(correctedSrcDir);
      break;

    case "cp":
      await new Promise(async (resolve, reject) => {
        if (!(await doesFileExist(correctedSrcDir))) {
          return reject("Source file does not exist");
        }
        if (await doesFileExist(correctedDestDir)) {
          return reject("File with the same name already exists");
        }
        try {
          await fsPromises.writeFile(correctedDestDir, "");
          const readStream = fs.createReadStream(correctedSrcDir);
          const writeStream = fs.createWriteStream(correctedDestDir);
          readStream.pipe(writeStream);
          readStream.on("error", (err) => {
            readStream.close();
            writeStream.close();
            reject(err);
          });
          readStream.on("end", () => {
            readStream.close();
            writeStream.close();
            resolve();
          });
        } catch (err) {
          reject(err);
        }
      });
      break;

    case "mv":
      await filesOperations("cp", srcDir, destDir).then(() =>
        filesOperations("rm", srcDir)
      );
      break;

    default:
      break;
  }
}
