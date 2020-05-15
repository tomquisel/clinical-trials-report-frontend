import React from 'react';
import { PercentWithValue } from './PercentWithValue';
import { PercentBar, BarType } from './PercentBar';
import { numericValue } from 'utils/displayUtils';

export function PercentageTableCell({ type, fraction, total, decimalPlaces }: {
  type: BarType,
  fraction: string | number,
  total: number,
  decimalPlaces: number
}) {
  const val = numericValue(fraction);
  return (
    <>
      <PercentWithValue
        rawTotal={total}
        fraction={val}
        decimalPlaces={decimalPlaces}
      ></PercentWithValue>
      <PercentBar
        type={type}
        fraction={val}
      ></PercentBar>
    </>
  )  
}
