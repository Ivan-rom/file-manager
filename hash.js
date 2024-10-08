import { createReadStream } from "node:fs";
import { createHash } from "node:crypto";

export function calculateHash(filePath) {
  const hash = createHash("sha256");

  const stream = createReadStream(filePath);

  stream
    .pipe(hash)
    .setEncoding("hex")
    .on("data", (data) => {
      console.log(data);
    });
}
