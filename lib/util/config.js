import fs from "fs-extra";
import os from "os";
import path from "path";

export function getConfigFile(file) {
  const homeDir = process.env.UROCYON_CONFIG_PATH || process.env.XDG_CONFIG_HOME || os.homedir();

  const configDir = path.join(homeDir, ".config", "urocyon");

  // ensure configDir exists
  if(!fs.existsSync(configDir)) fs.ensureDirSync(configDir, 0o700);

  // ensure file in configDir exists
  const fileFromConfigDir = path.join(configDir, file);
  if(!fs.existsSync(fileFromConfigDir)) {
    fs.ensureFileSync(fileFromConfigDir);
    fs.writeJsonSync(fileFromConfigDir, {});
  }

  return path.join(configDir, file);
}

export function loadConfig() {
  const configFile = getConfigFile(".urocyonrc")
  const rawConfigData = fs.readFileSync(configFile, "utf-8");

  let configData;
  try {
    configData = JSON.parse(rawConfigData);
  }
  catch {
    console.error(`cannot parse json. try deleting the file at ${rawConfigData}`);
  }

  // ensure `cookbooks` prop exists
  if(!configData.cookbooks) configData.cookbooks = [];


  return configData;
}


export function saveConfig(store) {
  const configFile = getConfigFile(".urocyonrc")
  fs.writeJsonSync(configFile, store);
}
