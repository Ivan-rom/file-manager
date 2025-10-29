import process from "node:process";
import os from "node:os";

import dispatch from "./dispatch.js";
import parseUsername from "./helpers/parseUsername.js";
import logDirectory from "./helpers/logDirectory.js";

function initializeApp() {
  const USERNAME = parseUsername();
  process.chdir(os.homedir());
  console.log(`Welcome to the File Manager, ${USERNAME}!`);
  logDirectory();
  console.log("Please input a command");

  process.stdin.on("data", (buffer) => {
    const data = buffer.toString().trim();
    dispatch(data);
  });

  process.on("SIGINT", () => process.exit());
  process.on("exit", () => {
    console.log(`Thank you for using File Manager, ${USERNAME}, goodbye!`);
  });
}

initializeApp();
