export function escapeOrFilterValue(value: string): string {
  return value.replace(/[\\,()%_]/g, "\\$&");
}