import moment from "moment";

export function fracToPercent(
  fraction: string | number,
  decimalPlaces = 0,
): string {
  const value = typeof fraction === "string" ? parseFloat(fraction) : fraction;
  return (value * 100).toFixed(decimalPlaces);
}

export function formatDate(d: Date): string {
  return d ? moment(d).format("YYYY-MM-DD") : d;
}
