import React from "react";
import { PercentWithValue } from "components/PercentWithValue";
import { PercentBar, BarType } from "components/PercentBar";
import { numericValue } from "utils/displayUtils";
import { IOrganization } from "graphql/queries";

export function PercentageTableCell({
  type,
  fraction,
  total,
  decimalPlaces,
}: {
  type: BarType;
  fraction: string | number;
  total: number;
  decimalPlaces: number;
}) {
  const val = numericValue(fraction);
  return (
    <>
      <PercentWithValue
        rawTotal={total}
        fraction={val}
        decimalPlaces={decimalPlaces}
      ></PercentWithValue>
      <PercentBar type={type} fraction={val}></PercentBar>
    </>
  );
}

type PercentColumnRenderer = (text: string, record: IOrganization) => React.ReactElement;

export function percentColumnRender (barType: BarType): PercentColumnRenderer {
  return function (text: string, record: IOrganization) {
    return (
      <PercentageTableCell
        type={barType}
        fraction={text}
        total={record.shouldHaveResultsCount}
        decimalPlaces={0}
      ></PercentageTableCell>
    );
  };
};
