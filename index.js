import { homedir } from "node:os";

import { changeDirectory, logDirectory } from "./nwd.js";
import { greeting, close } from "./prompts.js";
import { osInfo } from "./os.js";

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

    default:
      break;
  }
});
