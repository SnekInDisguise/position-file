import { writeFileSync, existsSync, WriteFileOptions } from "fs";

import getFilename from "./get-filename";

const positionFile = (
  path: string,
  // eslint-disable-next-line no-undef
  data: string | NodeJS.ArrayBufferView,
  options?: WriteFileOptions | undefined
) => {
  const fileExists = existsSync(path);

  let filepath = path;
  if (fileExists) {
    filepath = getFilename(filepath);
    positionFile(filepath, data, options);
  } else {
    writeFileSync(filepath, data, options);
  }
};

export = positionFile;
