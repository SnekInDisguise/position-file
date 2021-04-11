import { writeFileSync, existsSync } from "fs";
import getFilename from "./get-filename";

const positionFile = (path: string, content: string) => {
  const fileExists = existsSync(path);

  let filepath = path;
  if (fileExists) {
    filepath = getFilename(filepath);
    positionFile(filepath, content);
  } else {
    writeFileSync(filepath, content);
  }
};

export = positionFile;
