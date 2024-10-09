import { homedir } from "node:os";

import { changeDirectory, logDirectory } from "./nwd.js";
import { greeting, close } from "./prompts.js";
import { osInfo } from "./os.js";
import { calculateHash } from "./hash.js";
import {
  copyFile,
  createFile,
  deleteFile,
  moveFile,
  readFile,
  renameFile,
} from "./fs.js";
import { compressFile, decompressFile } from "./brotli.js";

greeting();
changeDirectory(homedir());

process.stdin.on("data", async (data) => {
  const dataString = data.toString().trim();

  const command = dataString.split(" ")[0];

  switch (command) {
    case ".exit":
      close();
      break;

    case "up":
      changeDirectory("../");
      break;

    case "ls":
      logDirectory();
      break;

    case "cd":
      const newDirectory = dataString.split(" ").slice(1).join(" ").trim();
      changeDirectory(newDirectory);
      break;

    case "os":
      const option = dataString.split(" ").slice(1)[0];
      osInfo(option);
      break;

    case "hash":
      const hashPath = dataString.split(" ").slice(1).join(" ").trim();
      calculateHash(hashPath);
      break;

    case "cat":
      const readPath = dataString.split(" ").slice(1).join(" ").trim();
      readFile(readPath);
      break;

    case "add":
      const newFileName = dataString.split(" ").slice(1).join(" ").trim();
      createFile(newFileName);
      break;

    case "rn":
      const fileNames = dataString.split(" ").slice(1).join(" ").trim();
      const [oldName, newName] = fileNames.split(" ");
      renameFile(oldName, newName);
      break;

    case "cp":
      const copyFileNames = dataString.split(" ").slice(1).join(" ").trim();
      const [sourceName, distName] = copyFileNames.split(" ");
      copyFile(sourceName, distName);
      break;

    case "rm":
      const deleteFileName = dataString.split(" ").slice(1).join(" ").trim();
      deleteFile(deleteFileName);
      break;

    case "mv":
      const moveFileNames = dataString.split(" ").slice(1).join(" ").trim();
      const [moveSourceName, moveDistName] = moveFileNames.split(" ");
      moveFile(moveSourceName, moveDistName);
      break;

    case "compress":
      const compressFileNames = dataString.split(" ").slice(1).join(" ").trim();
      const [compressSourceName, compressDistName] =
        compressFileNames.split(" ");
      compressFile(compressSourceName, compressDistName);
      break;

    case "decompress":
      const decompressFileNames = dataString
        .split(" ")
        .slice(1)
        .join(" ")
        .trim();
      const [decompressSourceName, decompressDistName] =
        decompressFileNames.split(" ");
      decompressFile(decompressSourceName, decompressDistName);
      break;

    default:
      break;
  }
});
