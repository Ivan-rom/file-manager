import fs from "node:fs";
import fsPromises from "node:fs/promises";
import path from "node:path";

export default async function filesOperations(command, srcDir, destDir) {
  switch (command) {
    case "cat":
      await new Promise((res, rej) => {
        const stream = fs.createReadStream(srcDir, {
          encoding: "utf8",
        });
        stream.on("data", (chunk) => {
          console.log(chunk);
          res();
        });
        stream.on("error", (err) => rej(err));
      });
      break;

    case "add":
      try {
        await fsPromises.access(srcDir);
        throw new Error("File already exists");
      } catch {
        await fsPromises.writeFile(srcDir, "");
        console.log("File created");
      }
      break;

    case "mkdir":
      await fsPromises.mkdir(srcDir);
      console.log("Directory created");
      break;

    case "rn":
      await fsPromises.rename(srcDir, destDir);
      console.log("File renamed");
      break;

    case "rm":
      await fsPromises.unlink(srcDir);
      break;

    case "cp":
      await new Promise(async (resolve, reject) => {
        const correctedDir = destDir.startsWith(".")
          ? `${process.cwd()}${path.sep}${destDir}`
          : destDir.startsWith("/") || destDir.startsWith("\\")
          ? `${process.cwd()}${path.sep}${destDir.slice(1)}`
          : destDir;

        try {
          await fsPromises.access(srcDir);
        } catch {
          return reject("Source file does not exist");
        }

        try {
          await fsPromises.access(correctedDir);
          return reject("File with the same name already exists");
        } catch {
          try {
            await fsPromises.writeFile(correctedDir, "");
            const readStream = fs.createReadStream(srcDir);
            const writeStream = fs.createWriteStream(correctedDir);
            readStream.pipe(writeStream);
            readStream.on("error", (err) => {
              readStream.close();
              reject(err);
            });
            readStream.on("end", () => {
              readStream.close();
              resolve();
            });
          } catch (err) {
            reject(err);
          }
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
