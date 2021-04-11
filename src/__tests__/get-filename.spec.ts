import getFilename from "../get-filename";

describe("Test for GetFilename", () => {
  it("Should return a new filename with number (1)", () => {
    const value = getFilename("C:\\path\\to\\file.txt");
    const expected = "C:\\path\\to\\file (1).txt";

    expect(value).toBe(expected);
  });

  it.each`
    number | expectedNumber
    ${1}   | ${2}
    ${2}   | ${3}
    ${9}   | ${10}
    ${10}  | ${11}
    ${99}  | ${100}
    ${100} | ${101}
  `(
    "Should return ($expectedNumber) for filename numbered with ($number)",
    ({ number, expectedNumber }) => {
      const value = getFilename(`C:\\path\\to\\file (${number}).txt`);
      const expected = `C:\\path\\to\\file (${expectedNumber}).txt`;

      expect(value).toBe(expected);
    }
  );
});
