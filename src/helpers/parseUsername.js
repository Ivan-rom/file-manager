import process from "node:process";

export default function parseUsername() {
  return (
    process.argv
      .slice(2)
      .find((arg) => arg.toLowerCase().startsWith("--username"))
      ?.split("=")[1] || "guest"
  );
}
