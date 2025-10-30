import zlib from "node:zlib";
import fs from "node:fs";
import path from "node:path";
import doesFileExist from "../helpers/doesFileExist.js";
import normalizeDir from "../helpers/normalizeDir.js";

export default async function brotli(command, srcDir, destDir) {
  const correctedSrcDir = normalizeDir(srcDir || "");
  const correctedDestDir = normalizeDir(destDir || "");

  switch (command) {
    case "compress":
      if (!path.parse(correctedSrcDir).ext) {
        throw new Error("Source file must have an extension");
      }

      const brotliFilename = correctedDestDir.endsWith(".br")
        ? correctedDestDir
        : `${correctedDestDir}.br`;

      if (!(await doesFileExist(correctedSrcDir))) {
        throw new Error("Source file does not exist");
      }
      if (await doesFileExist(brotliFilename)) {
        throw new Error("File already exists");
      }

      try {
        await fs.promises.writeFile(brotliFilename, "");
        const brotliStream = zlib.createBrotliCompress();
        const readStream = fs.createReadStream(correctedSrcDir);
        const writeStream = fs.createWriteStream(brotliFilename);
        readStream.pipe(brotliStream).pipe(writeStream);
        readStream.on("end", () => readStream.close());
      } catch {
        throw new Error("Compression failed");
      }
      break;

    case "decompress":
      if (!correctedDestDir.endsWith(".br")) {
        throw new Error("Destination file must have .br extension");
      }
      if (!(await doesFileExist(correctedSrcDir))) {
        throw new Error("Source file does not exist");
      }
      if (await doesFileExist(correctedDestDir)) {
        throw new Error("File already exists");
      }

      try {
        await fs.promises.writeFile(correctedDestDir, "");
        const brotliStream = zlib.createBrotliDecompress();
        const readStream = fs.createReadStream(correctedSrcDir);
        const writeStream = fs.createWriteStream(correctedDestDir);
        readStream.pipe(brotliStream).pipe(writeStream);
        readStream.on("end", () => readStream.close());
      } catch {
        throw new Error("Decompression failed");
      }
      break;

    default:
      break;
  }
}
