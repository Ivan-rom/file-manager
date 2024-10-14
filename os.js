import os from "node:os";

export function osInfo(option) {
  switch (option) {
    case "--EOL":
      const EOLstring = JSON.stringify(os.EOL);
      console.log(EOLstring.slice(1, EOLstring.length - 1));
      break;
    case "--cpus":
      console.log(os.cpus());
      break;
    case "--homedir":
      console.log(os.homedir());
      break;
    case "--username":
      console.log(os.userInfo().username);
      break;
    case "--architecture":
      console.log(os.arch());
      break;

    default:
      console.log("There is no such command");
      break;
  }
}
