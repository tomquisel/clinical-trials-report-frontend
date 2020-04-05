export function fracToPercent(
  fraction: string | number,
  decimalPlaces = 1,
): string {
  const value = typeof fraction === "string" ? parseFloat(fraction) : fraction;
  return (value * 100).toFixed(decimalPlaces);
}
