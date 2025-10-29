import process from "node:process";
import os from "node:os";
import fs from "node:fs";

function initializeApp() {
  const USERNAME = parseUsername();

  process.chdir(os.homedir());

  console.log(`Welcome to the File Manager, ${USERNAME}!`);
  logDir();
  console.log("Please input a command");

  process.stdin.on("data", (buffer) => {
    const data = buffer.toString().trim();
    const [command, ...args] = data.split(" ");

    try {
      switch (command) {
        case ".exit":
          process.exit();

        case "up":
          process.chdir("..");
          logDir();
          break;

        case "cd":
          const rawPath = args.join(" ");
          const path =
            rawPath.startsWith("/") || rawPath.startsWith("\\")
              ? `${process.cwd()}/${rawPath}`
              : rawPath;

          process.chdir(path);
          logDir();
          break;

        case "ls":
          fs.readdir(process.cwd(), { withFileTypes: true }, (err, dirent) => {
            if (err) throw err;

            console.table(
              dirent.map((d) => ({
                name: d.name,
                type: getType(d),
              }))
            );
          });

        default:
          console.log("Invalid input");
          break;
      }
    } catch {
      console.log("Operation failed");
    }
  });

  process.on("SIGINT", () => process.exit());
  process.on("exit", () => {
    console.log(`Thank you for using File Manager, ${USERNAME}, goodbye!`);
  });
}

function getType(dirent) {
  if (dirent.isFile()) return "file";
  if (dirent.isDirectory()) return "directory";
  return "other";
}

function parseUsername() {
  return (
    process.argv
      .slice(2)
      .find((arg) => arg.toLowerCase().startsWith("--username"))
      ?.split("=")[1] || "guest"
  );
}

function logDir() {
  console.log(`You are currently in: ${process.cwd()}`);
}

initializeApp();
