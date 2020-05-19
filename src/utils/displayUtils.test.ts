import { fracToPercent, formatDate, numericValue } from "utils/displayUtils";

describe("displayUtils", () => {
  describe("numericValue", () => {
    it("converts a string to a numeric value", () => {
      expect(numericValue("4.3563")).toEqual(4.3563);
    });
    it("returns a numeric value unchanged", () => {
      expect(numericValue(4.3563)).toEqual(4.3563);
    });
  });
  describe("fracToPercent", () => {
    it("converts a floating point string value to a percentage", () => {
      expect(fracToPercent("0.356352")).toEqual("36");
      expect(fracToPercent("0.356352", 0)).toEqual("36");
      expect(fracToPercent("0.356352", 1)).toEqual("35.6");
      expect(fracToPercent("0.356352", 2)).toEqual("35.64");
      expect(fracToPercent("0.356352", 3)).toEqual("35.635");
      expect(fracToPercent("0.356352", 4)).toEqual("35.6352");
      expect(fracToPercent("0.356352", 5)).toEqual("35.63520");
      expect(fracToPercent("4.356352")).toEqual("436");
      expect(fracToPercent("4.356352", 0)).toEqual("436");
      expect(fracToPercent("4.356352", 1)).toEqual("435.6");
      expect(fracToPercent("4.356352", 2)).toEqual("435.64");
      expect(fracToPercent("4.356352", 3)).toEqual("435.635");
      expect(fracToPercent("4.356352", 4)).toEqual("435.6352");
      expect(fracToPercent("4.356352", 5)).toEqual("435.63520");
    });
  });
  describe("formatDate", () => {
    it("formats dates in year-month-date format", () => {
      const d = new Date(1982, 3, 7);
      expect(formatDate(d)).toEqual("1982-04-07");
    });
  });
});
