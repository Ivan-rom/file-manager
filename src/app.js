import process from "node:process";

const USERNAME =
  process.argv
    .slice(2)
    .find((arg) => arg.toLowerCase().startsWith("--username"))
    ?.split("=")[1] || "guest";

console.log(`Welcome to the File Manager, ${USERNAME}!`);

process.stdin.on("data", (buffer) => {
  const data = buffer.toString().trim();

  if (data === ".exit") process.exit();
});

process.on("SIGINT", () => process.exit());
process.on("exit", () => {
  console.log(`Thank you for using File Manager, ${USERNAME}, goodbye!`);
});
