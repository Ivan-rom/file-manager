import process from "node:process";
import logDirectory from "./helpers/logDirectory.js";
import navigation from "./navigation/index.js";
import filesOperations from "./filesOperations/index.js";
import operatingSystem from "./operatingSystem/index.js";
import hashCalculate from "../hashCalculate/index.js";

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

      // Operating system info
      case "os":
        operatingSystem(command, args[0]);
        logDirectory();
        break;

      // Hash calculation
      case "hash":
        await hashCalculate(command, args[0]);
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
