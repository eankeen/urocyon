import fs from "fs";
import path from "path";
import { default as minimist } from "minimist";
import { execRecipe } from "./helper.js";

const argv = minimist(process.argv.slice(2));

const cookbookDir = argv._[0];
if (!cookbookDir) {
  throw new Error("a primary argument was not specified");
}

const recipe = argv._[1];
if(!recipe) {
  throw new Error("a secondary argument was not specified");
}

const referenceDirAbsPath = path.resolve(cookbookDir);
if(!fs.existsSync(referenceDirAbsPath)) {
  throw new Error(`reference directory "${referenceDirAbsPath}" does not exit`);
}

const recipeDirAbsPath = path.resolve(cookbookDir, "recipes", recipe);
if(!fs.existsSync(recipeDirAbsPath)) {
  throw new Error(`recipe directory "${recipeDirAbsPath}" does not exist`)
}

execRecipe(recipeDirAbsPath);
