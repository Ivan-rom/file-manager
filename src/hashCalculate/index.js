import fs from "node:fs";
import crypto from "node:crypto";
import normalizeDir from "../helpers/normalizeDir.js";
import doesFileExist from "../helpers/doesFileExist.js";

export default async function hashCalculate(command, filePath) {
  const correctedSrcDir = normalizeDir(filePath || "");

  if (!(await doesFileExist(correctedSrcDir))) {
    throw new Error("Source file does not exist");
  }

  try {
    const hash = crypto.createHash("sha256");
    fs.createReadStream(correctedSrcDir).pipe(hash);
    console.log(hash.digest("hex"));
  } catch {
    throw new Error("Hash calculation failed");
  }
}
