import path from "path"
import fs from "fs";
import { promisify } from "util";
import pMap from "p-map";
import prompts from "prompts";


export function execRecipe(recipeDirAbsPath) {
  import(recipeDirAbsPath)
    .then(t => {
      const { tasks } = t.default();
      const task = tasks[0]; // start with one task for now

      let promptInput = task; // write now has choicesFiles, which we should remove
      let myInput = task.choicesFiles;

      delete promptInput.choicesFiles
      prompts([promptInput])
        .then(({ value }) => {
          promisify(fs.readFile)(path.join(recipeDirAbsPath, myInput[value].folderName, myInput[value].file), "utf8")
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
