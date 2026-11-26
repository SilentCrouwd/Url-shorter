import fs from "node:fs";
import type { DB_Item, DB_Url } from "../types/types.js";

const fileName = "url_Db";
const FILEPATH = "src/router/url/url_db/";
export function writeFile(data: DB_Item) {
  const stringData = JSON.stringify(data);
  fs.writeFileSync(`${FILEPATH}/${fileName}.jsonl`, `${stringData}\n`, {
    flag: "a",//Hier wird angehangen nicht überschrieben 
  });
}

export function readFile(): DB_Item[] {
  const contentObj = fs.readFileSync(`${FILEPATH}/${fileName}.jsonl`, "utf8");

  const parseContent = contentObj.split("\n").filter((line) => line !== "");
  const newDBContent = parseContent.map((content) => JSON.parse(content));

  return newDBContent;
}
export function overwriteFile(urlData: DB_Url) {
  const content = urlData.map((item) => JSON.stringify(item)).join("\n") + "\n";
  fs.writeFileSync(`${FILEPATH}/${fileName}.jsonl`, content);
}
