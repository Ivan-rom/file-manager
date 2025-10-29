import process from "node:process";
import logDirectory from "./helpers/logDirectory.js";
import navigation from "./navigation/index.js";
import filesOperations from "./filesOperations/index.js";

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

      // Basic operations with files
      case "cat":
      case "add":
      case "mkdir":
      case "rn":
      case "cp":
      case "mv":
      case "rm":
        await filesOperations(command, ...args);
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
