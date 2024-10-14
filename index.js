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
import { separateCommandAndParams } from "./utils.js";

greeting();
changeDirectory(homedir());

process.stdin.on("data", async (data) => {
  const dataString = data.toString().trim();

  const [command, params] = separateCommandAndParams(dataString);

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
      changeDirectory(params);
      break;

    case "os":
      osInfo(params);
      break;

    case "hash":
      calculateHash(params);
      break;

    case "cat":
      readFile(params);
      break;

    case "add":
      createFile(params);
      break;

    case "rn":
      renameFile(...params.split(" "));
      break;

    case "cp":
      copyFile(...params.split(" "));
      break;

    case "rm":
      deleteFile(params);
      break;

    case "mv":
      moveFile(...params.split(" "));
      break;

    case "compress":
      compressFile(...params.split(" "));
      break;

    case "decompress":
      decompressFile(...params.split(" "));
      break;

    default:
      console.log("Unknown command");
      break;
  }
});
