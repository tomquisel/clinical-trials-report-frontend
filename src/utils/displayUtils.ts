import moment from "moment";

export function numericValue(fraction: string | number) {
  return typeof fraction === "string" ? parseFloat(fraction) : fraction;
}

export function fracToPercent(
  fraction: string | number,
  decimalPlaces = 0,
): string {
  return (numericValue(fraction) * 100).toFixed(decimalPlaces);
}

export function formatDate(d: Date): string {
  return d ? moment(d).format("YYYY-MM-DD") : d;
}
