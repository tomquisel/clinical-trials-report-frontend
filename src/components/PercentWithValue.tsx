import React from 'react';
import { numericValue, fracToPercent } from '../utils/displayUtils';

export function PercentWithValue({ rawTotal, fraction, decimalPlaces }: {
  rawTotal: number | undefined
  fraction: string | number,
  decimalPlaces: number,
}) {
  const percentage = fracToPercent(fraction, decimalPlaces);
  const raw = rawTotal ?
    (numericValue(fraction) * rawTotal).toFixed(0) :
    undefined;
  const textDisplay =  raw ?
    <span><strong>{ percentage } %</strong> ( { raw } )</span> :
    <span><strong>{ percentage } %</strong></span>;
  return textDisplay;
}
