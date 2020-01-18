
export function FracToPercent(fraction: string|number, decimal_places=1): string {
  const frac_as_number = (typeof fraction === 'string') ? parseFloat(fraction) : fraction;
  return (frac_as_number * 100).toFixed(decimal_places)
}
