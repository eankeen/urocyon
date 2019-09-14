import path from "path"
import fs from "fs";
import { promisify } from "util";
import pMap from "p-map";
import prompts from "prompts";

export function validate(args) {
  const argsNoOpts = args._;

  // check we have all arguments
  const arg1 = argsNoOpts[0];
  if (!arg1) {
    console.error("you did not specify any arguments");
    throw new Error();
  }
  const arg2 = argsNoOpts[1];
  if(!arg2) {
    console.error("you did not specify a secondary argument");
    throw new Error();
  }

  // check the arguments are valid
  let absPath = path.resolve(arg1);
  if(!fs.existsSync(absPath)) {
    console.error(`the directory "${absPath}" you specified in the first argument does not exist`);
    throw new Error();
  }
}

export function execRecipe(referenceDir, cookbookDir) {
  const recipe = path.join(referenceDir, "recipes", cookbookDir);
  import(recipe)
    .then(t => {
      const { tasks } = t.default();
      const task = tasks[0]; // start with one task for now

      let promptInput = task; // write now has choicesFiles, which we should remove
      let myInput = task.choicesFiles;

      delete promptInput.choicesFiles
      prompts([promptInput])
        .then(({ value }) => {
          promisify(fs.readFile)(path.join(referenceDir, "recipes", "editorconfig", myInput[value].folderName, myInput[value].file), "utf8")
            .then(data => {
              promisify(fs.writeFile)(path.join(process.cwd(), myInput[value].file), data, "utf8")
                .catch(err => console.log(err));
            })
            .catch(err => console.log(err));
        })
        .catch(err => console.log(err));

    })
    .catch(err => {
      console.log(err);
    })
}
