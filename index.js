#!/usr/bin/env node

const yargs = require("yargs");
const fs = require("fs");
const { join } = require("path");
const { readdirSync, statSync } = require("fs");

class Component {
  constructor(fullyQualifiedName, files) {
    this.fullyQualifiedName = fullyQualifiedName;
    this.files = files;
  }
}

const getAllFiles = (dir, extn, files, result, regex, flag) => {
  files = files || readdirSync(dir);
  result = result || [];
  regex = regex || new RegExp(/^[A-Z]+/i);
  flag = flag || 0;
  for (let i = 0; i < files.length; i++) {
    let file = join(dir, files[i]);
    if (statSync(file).isDirectory()) {
      try {
        result = getAllFiles(
          file,
          extn,
          readdirSync(file),
          result,
          regex,
          flag
        );
      } catch (error) {
        continue;
      }
    } else {
      if (regex.test(file)) {
        result.push(file);
      }
    }
  }
  return result;
};

const options = yargs
  .usage("Usage: cesplugin --of <outputFile> --ftg <filesToGroup>")
  .option("of", {
    alias: "outputFile",
    describe: "Output file to write your results to",
    type: "string",
    demandOption: true,
  })
  .option("ftg", {
    alias: "filesToGroup",
    describe:
      "The path to the file which contains all the files in the project",
    type: "string",
    demandOption: true,
  }).argv;

/**
 * Gets all files from the project path
 * Default functionality for this is to match filePaths against a regex that contains all c extensions
 * So this one here checks for the files to start with a letter, for the path letter in windows
 */
// const allFiles = getAllFiles(options.ftg).map((element) =>
//   element.replace(/\\/g, "/").substring(65)
// );

const allFiles = fs
  .readFileSync(options.ftg, { encoding: "UTF-8" })
  .toString()
  .split("\n")
  .filter((file) => file.length !== 0);

const cppRegex = new RegExp(/.*\.(c|cpp|hpp|cc|h|hh|cxx|hxx)$/i);
const cppFiles = allFiles.filter((file) => cppRegex.test(file));

// fs.writeFileSync("filesToGroup.json", JSON.stringify(allFiles));

const cppFolders = Array.from(
  new Set(cppFiles.map((item) => item.split("/").shift()))
);

const components = cppFolders.map((folder) => new Component(folder, []));

const defaultComponent = new Component("@", []);

allFiles.forEach((file) => {
  const component = components.find((c) =>
    file.startsWith(c.fullyQualifiedName)
  );
  component ? component.files.push(file) : defaultComponent.files.push(file);
});

components.push(defaultComponent);
console.log(components);

fs.writeFileSync(options.of, JSON.stringify(components));
