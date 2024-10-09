export function separateCommandAndParams(data) {
  const [command, ...params] = data.trim().split(" ");
  return [command, params.join(" ")];
}
