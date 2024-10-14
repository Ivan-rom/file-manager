const userName = getUsername();

export function greeting() {
  console.log(`Welcome to the File Manager, ${userName}!`);
}

function farewell() {
  console.log(`Thank you for using File Manager, ${userName}, goodbye!`);
}

export function close() {
  process.exit();
}

function getUsername() {
  const usernameVariableName = "username";

  try {
    const argv = process.argv.slice(2);
    const usernameArgv = argv.find((arg) =>
      arg.startsWith(`--${usernameVariableName}=`)
    );
    const usernameValue = usernameArgv.split("=")[1];

    return usernameValue;
  } catch {
    return;
  }
}

process.on("exit", farewell);
process.on("SIGINT", close);
process.on("SIGUSR1", close);
process.on("SIGUSR2", close);
