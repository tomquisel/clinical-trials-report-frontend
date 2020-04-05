type Sorter = (a: string, b: string) => number;

export function nullStringSorterFunction(
  sorter: Sorter,
  nullAtEnd = true,
): Sorter {
  function newSorter(a: string, b: string) {
    const nullVal = nullAtEnd ? 1 : -1;
    if (a === null) {
      return nullVal;
    } else if (b === null) {
      return -nullVal;
    } else {
      return sorter(a, b);
    }
  }
  return newSorter;
}

export function compareStrings(a: string, b: string): number {
  return a.localeCompare(b);
}

export function compareDateStrings(a: string, b: string): number {
  return Date.parse(a) - Date.parse(b);
}
