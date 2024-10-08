const userName = getUsername();

console.log(`Welcome to the File Manager, ${userName}!`);

function farewell() {
  console.log(`Thank you for using File Manager, ${userName}, goodbye!`);
}

function close() {
  process.exit();
}

function getUsername() {
  const usernameVariableName = "username";

  const argv = process.argv.slice(2);
  const usernameArgv = argv.find((arg) =>
    arg.startsWith(`--${usernameVariableName}=`)
  );
  const usernameValue = usernameArgv.split("=")[1];

  return usernameValue;
}

process.stdin.on("data", (data) => {
  const dataString = data.toString().trim();

  if (dataString === ".exit") {
    close();
  }
});

process.on("exit", farewell);
process.on("SIGINT", close);
process.on("SIGUSR1", close);
process.on("SIGUSR2", close);
process.on("uncaughtException", close);
