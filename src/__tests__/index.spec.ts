import fs from "fs";
import { resolve } from "path";

import positionFile from "../index";

describe("Test for PositionFile", () => {
  let writeFileSync: jest.SpyInstance<
    void,
    [
      path: number | fs.PathLike,
      // eslint-disable-next-line no-undef
      data: string | NodeJS.ArrayBufferView,
      options?: fs.WriteFileOptions
    ]
  >;
  let existsSync: jest.SpyInstance<boolean, [path: fs.PathLike]>;

  beforeAll(() => {
    writeFileSync = jest.spyOn(fs, "writeFileSync").mockImplementation();

    existsSync = jest.spyOn(fs, "existsSync");
  });

  afterAll(() => {
    writeFileSync.mockReset();
    writeFileSync.mockRestore();

    existsSync.mockRestore();
  });

  afterEach(() => {
    existsSync.mockReset();
  });

  it("Should create file with no number if base filename does not exist", () => {
    const filepath = resolve("./my-file.txt");
    positionFile(filepath, "content of my file");

    expect(writeFileSync).toHaveBeenCalledWith(
      resolve("./my-file.txt"),
      "content of my file",
      undefined
    );
  });

  it.each`
    timesFileExist | expectedNumber
    ${1}           | ${1}
    ${2}           | ${2}
    ${9}           | ${9}
    ${10}          | ${10}
    ${99}          | ${99}
    ${100}         | ${100}
  `(
    "Should create file with number ($expectedNumber) if file exists $timesFileExist times",
    ({ timesFileExist, expectedNumber }) => {
      for (let i = 0; i < timesFileExist; i++) {
        existsSync.mockImplementationOnce(() => true);
      }

      existsSync.mockImplementationOnce(() => false);

      const filepath = resolve("./my-file.txt");
      positionFile(filepath, "content of my file");

      expect(writeFileSync).toHaveBeenCalledWith(
        resolve(`./my-file (${expectedNumber}).txt`),
        "content of my file",
        undefined
      );
    }
  );
});
