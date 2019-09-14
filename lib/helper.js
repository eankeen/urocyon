import path from "path"
import fs from "fs";
import { promisify } from "util";
import pMap from "p-map";
import prompts from "prompts";


export function execRecipe(recipeDirAbsPath, recipe) {
  import(recipeDirAbsPath)
    .then(t => {
      const variants = t.variants; // start with one task for now

      const promptInput = {
        type: "select",
        name: "value",
        message: `choose ${recipe} configuration file`,
        choices: (new Array(Object.keys(variants).length).fill({}).map((e, i) => {
          console.log(variants[Object.keys(variants)[i]]);
          e.title = variants[Object.keys(variants)[i]].title;
          e.description = variants[Object.keys(variants)[i]].description;

          return e;
        }))
      };

      console.log(promptInput.choices);

      return prompts([promptInput])
        .then(({ value }) => {
          console.log(value);
          return promisify(fs.readFile)(path.join(recipeDirAbsPath, Object.keys(variants)[value], variants[Object.keys(variants)[value]].file), "utf8")
        })
        .then(data => {
          return promisify(fs.writeFile)(path.join(process.cwd(), ".editorconfig"), data, "utf8")
        })
        .catch(err => console.log(err));

    })
    .catch(err => {
      console.log(err);
    })
}
