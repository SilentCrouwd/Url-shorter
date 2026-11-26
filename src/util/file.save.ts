import fs from "node:fs";
import type { DB_UrlMapping } from "../types/types.js";

const fileName = "url_Db";
const FILEPATH = "src/router/url/url_db/";
export function writeFile(data: DB_UrlMapping) {
  fs.writeFileSync(
    `${FILEPATH}/${fileName}.json`,
    JSON.stringify(data, null, 2),
  );
}

export function readFile(): DB_UrlMapping {
  const contentObj = fs.readFileSync(`${FILEPATH}/${fileName}.json`, "utf8");
  const newDBContent = JSON.parse(contentObj);

  return newDBContent;
}
export function overwriteFile(urlData: DB_UrlMapping) {
  const content = JSON.stringify(urlData, null, 2);
  fs.writeFileSync(`${FILEPATH}/${fileName}.json`, content);
}
