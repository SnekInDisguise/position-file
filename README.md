# Position file
---
Basically it has the same functionality as `fs.writeFile`, except that it does not replace an existing file, would it exist already, but creates a new one with a number at the end as a counter.


Example of usage:


```ts
const filename = "C:/path/to/file.txt";
positionFile(filename, "debug logs for my program"); // Creates file with name `file.txt`
positionFile(filename, "more debug logs for my program"); // Creates file with name `file (1).txt`
positionFile(filename, "and more debug logs for my program"); // Creates file with name `file (2).txt`
```


## Common use cases:
- Logging debug data into files without overwritting it
