export function getInitialLetterOfName(name: string) {
  return name.split(" ").map((name) => name.charAt(0).toUpperCase());
}
