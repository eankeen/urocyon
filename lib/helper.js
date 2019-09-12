import path from "path"
import fs from "fs";

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

      // https://decembersoft.com/posts/promises-in-serial-with-array-reduce/
      tasks.reduce((promiseChain, currentTask) => {
        return promiseChain.then(chainResults => {
          currentTask.then(currentResult => [...chainResults, currentResult])
        });
      }, Promise.resolve([])
        .then(arrayOfResults => {

        }));
    })
    .catch(err => {
      console.log(err);
    })
}
