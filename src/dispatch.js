import process from "node:process";
import nwd from "./nwd/index.js";
import logDirectory from "./helpers/logDirectory.js";

export default function dispatch(data) {
  const [command, ...args] = data.split(" ");

  switch (command) {
    case ".exit":
      process.exit();

    case "up":
    case "ls":
    case "cd":
      nwd(command, args[0]);
      logDirectory();
      break;

    default:
      console.log("Invalid input");
      break;
  }
}
