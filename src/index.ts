import { writeFileSync, existsSync } from "fs";
import { format, parse } from "path";

const positionFile = (path: string, content: string) => {
  const fileExists = existsSync(path);

  let filepath = path;
  if (fileExists) {
    const parsedFile = parse(filepath);
    let { name } = parsedFile;
    const { dir, ext } = parsedFile;

    let index = 1;
    const matchesRegex = name.match(/^(.+) \((\d+)\)$/);
    if (matchesRegex) {
      const matchedString = matchesRegex.slice(1);
      [name] = matchedString;
      const i = matchedString[1];
      index = parseInt(i, 10) + 1;
    }

    name = `${name} (${index})`;
    filepath = format({ dir, name, ext });

    positionFile(filepath, content);
  } else {
    writeFileSync(filepath, content);
  }
};

export = positionFile;
