import React from 'react';
import { numericValue } from '../utils/displayUtils';

export enum BarType {
  Success = '#027d11',
  Warning = '#c9bc2a',
  Danger = '#8a0b0b',
  Neutral = '#e8e4d8',
  LightGray = '#e3e3e3',
  Grey = '#9c9c9c',
  Black = '#000000'
}

export function PercentBar({ type, fraction }: {
  type: BarType,
  fraction: number
}) {
  const backStyles = {
    backgroundColor: `${BarType.Neutral}`,
    width: '100%',
    height: '6px'
  };
  const foreStyles = {
    backgroundColor: `${ type }`,
    width: `${(numericValue(fraction) * 100).toFixed(0)}%`,
    height: '100%',
    padding: 0,
    margin: 0,
    left: 0
  };
  return (
    <>
      <div
        className="percent-bar"
        style={backStyles}
      >
        <div style={foreStyles}></div>
      </div>
    </>
  )
}
