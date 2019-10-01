import fs from "fs";
import path from "path";
import { default as minimist } from "minimist";
import { execRecipe } from "./util/helper";
import { loadConfig, saveConfig } from "./util/config";

const argv = minimist(process.argv.slice(2));

let command = argv._[0];

if(command === "add") {
  const store = loadConfig();

  const cookbookName = argv._[1];
  const cookbookLocation = argv._[2];

  // be sure no other cookbook shares the same name
  if(store.cookbooks.map(cookbook => cookbook.name).includes(cookbookName)) {
    throw new Error(`new cookbook cannot have same name as preexisting cookbook`);
  }

  store.cookbooks.push({
    name: cookbookName,
    location: cookbookLocation
  });

  saveConfig(store);

  console.log(`added ${cookbookName}`);
}
else if(command === "remove") {
  const store = loadConfig();

  const cookbookToRemove = argv._[1];

  store.cookbooks.filter(cookbook => {
    return cookbook.name !== cookbookToRemove
  });

  saveConfig();

  console.log(`removed ${cookbookName}`);
}
else if(command === "list") {
  const store = loadConfig();

  if(store.cookbooks.length > 0) {
    console.log("these are your cookbooks");
    store.cookbooks.forEach(cookbook => {
      console.log(`${cookbook.name} ${cookbook.location}`)
    });
  }
  else {
    console.log(`you have no cookbooks`);
  }
}
else if(command === "activate") {
  const cookbookName = argv._[1];
  const recipeName = argv._[2];

  // execRecipe(recipeDirAbsPath, recipe);
}
else if(argv.h || argv.help) {
  console.log("urocyon add");
  console.log("urocyon remove");
  console.log("urocyon list");
  console.log("urocyon activate");
}

