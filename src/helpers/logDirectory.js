import process from "node:process";

export default function logDirectory() {
  console.log(`You are currently in: ${process.cwd()}`);
}
