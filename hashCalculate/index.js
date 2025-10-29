import fs from "node:fs";
import crypto from "node:crypto";

export default async function hashCalculate(command, filePath) {
  try {
    await fs.promises.access(filePath);
    const hash = crypto.createHash("sha256");
    fs.createReadStream(filePath).pipe(hash);
    console.log(hash.digest("hex"));
  } catch {
    throw new Error("File does not exist");
  }
}
