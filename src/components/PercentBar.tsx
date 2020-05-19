import React from "react";
import { numericValue } from "utils/displayUtils";

export enum BarType {
  Success = "#237804",   // antd @green-8
  Warning = "#d4b106",   // antd @yellow-7
  Danger = "#820014",    // antd @red-9
  Neutral = "#fffbe6",   // antd @gold-1
  LightGray = "#f0f0f0", // antd @gray-4
  Grey = "#8c8c8c",      // antd @gray-7
  Black = "#000000",     // antd @gray-13
}

export function PercentBar({
  type,
  fraction,
}: {
  type: BarType;
  fraction: number;
}) {
  const backStyles = {
    backgroundColor: `${BarType.Neutral}`,
    width: "100%",
    height: "6px",
  };
  const foreStyles = {
    backgroundColor: `${type}`,
    width: `${(numericValue(fraction) * 100).toFixed(0)}%`,
    height: "100%",
    padding: 0,
    margin: 0,
    left: 0,
  };
  return (
    <>
      <div className="percent-bar" style={backStyles}>
        <div style={foreStyles}></div>
      </div>
    </>
  );
}
