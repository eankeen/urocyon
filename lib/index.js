import path from "path";
import { default as minimist } from "minimist";
import { validate, execRecipe } from "./helper.js";

const args = minimist(process.argv.slice(2));
validate(args);

const scaffoldDir = process.cwd();
const cookbookDir = path.resolve(args._[0]);
const recipe = args._[1];
execRecipe(cookbookDir, recipe);
