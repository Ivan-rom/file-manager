import { createReadStream, createWriteStream } from "node:fs";
import { createBrotliCompress, createBrotliDecompress } from "zlib";

export function compressFile(decompressedName, compressedName) {
  const readStream = createReadStream(decompressedName);
  const writeStream = createWriteStream(compressedName);
  const brotli = createBrotliCompress();

  readStream.pipe(brotli).pipe(writeStream);
}

export function decompressFile(decompressedName, compressedName) {
  const readStream = createReadStream(decompressedName);
  const writeStream = createWriteStream(compressedName);
  const brotli = createBrotliDecompress();

  readStream.pipe(brotli).pipe(writeStream);
}
