import zlib from "node:zlib";
import fs from "node:fs";

export default async function brotli(command, srcDir, destDir) {
  switch (command) {
    case "compress":
      const brotliFilename = destDir.endsWith(".br")
        ? destDir
        : `${destDir}.br`;
      try {
        await fs.promises.access(brotliFilename);
        throw new Error("Dest file already exists");
      } catch {
        try {
          await fs.promises.access(srcDir);
        } catch {
          throw new Error("Source file does not exist");
        }
        try {
          await fs.promises.writeFile(brotliFilename, "");
          const brotliStream = zlib.createBrotliCompress();
          const readStream = fs.createReadStream(srcDir);
          const writeStream = fs.createWriteStream(brotliFilename);
          readStream.pipe(brotliStream).pipe(writeStream);
          readStream.on("end", () => readStream.close());
        } catch {
          throw new Error("Compression failed");
        }
      }
      break;

    case "decompress":
      try {
        await fs.promises.access(destDir);
        throw new Error("Dest file already exists");
      } catch {
        try {
          await fs.promises.access(srcDir);
        } catch {
          throw new Error("Source file does not exist");
        }
        try {
          await fs.promises.writeFile(destDir, "");
          const brotliStream = zlib.createBrotliDecompress();
          const readStream = fs.createReadStream(srcDir);
          const writeStream = fs.createWriteStream(destDir);
          readStream.pipe(brotliStream).pipe(writeStream);
          readStream.on("end", () => readStream.close());
        } catch {
          throw new Error("Decompression failed");
        }
      }
      break;

    default:
      break;
  }
}
