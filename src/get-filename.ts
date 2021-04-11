import { format, parse } from "path";

const getFilename = (filepath: string) => {
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
  const newFilepath = format({ dir, name, ext });
  return newFilepath;
};

export = getFilename;
