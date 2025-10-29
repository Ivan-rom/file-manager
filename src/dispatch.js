import process from "node:process";
import nwd from "./navigation/index.js";
import logDirectory from "./helpers/logDirectory.js";

export default async function dispatch(data) {
  try {
    const [command, ...args] = data.split(" ");

    switch (command) {
      case ".exit":
        process.exit();

      // Navigation & working directory
      case "up":
      case "ls":
      case "cd":
        await navigation(command, args[0]);
        logDirectory();
        break;

      default:
        console.log("Invalid input");
        break;
    }
  } catch {
    console.log("Operation failed");
  }
}
