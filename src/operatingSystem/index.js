import os from "node:os";

export default function operatingSystem(command, arg) {
  switch (arg) {
    case "--EOL":
      console.log(JSON.stringify(os.EOL).slice(1, -1));
      break;

    case "--cpus":
      const cpus = os.cpus();
      console.table(
        cpus.map((cpu) => ({
          Model: cpu.model.trim(),
          Speed: `${cpu.speed / 1000}GHz`,
        }))
      );
      console.log(`Overall cores: ${cpus.length}`);
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
      console.log("Operation failed");
      break;
  }
}
