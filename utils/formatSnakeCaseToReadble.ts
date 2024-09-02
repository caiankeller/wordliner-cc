export default function formatSnakeCaseToReadble(str: string): string {
  return str.split(/[\s_]+/).join(" ");
}
