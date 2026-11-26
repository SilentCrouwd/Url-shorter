import { overwriteFile, readFile, writeFile } from "../../../util/file.save.js";
import type { DB_Item, DB_Url } from "../../../types/types.js";
import { HtttpException } from "../../../error/Htttpexeption.js";

let URL__DATABASE = <DB_Url>[];

export function createDB_Item(
  keyName: string,
  long_Url: string,
  short_Url: string,
): DB_Item {
  if (!long_Url) {
    throw new HtttpException(404, "Bitte Url eintragen");
  }
  if (!short_Url) {
    throw new HtttpException(404, "fehler beim erstellen der short Url");
  }
  const randomUUID = crypto.randomUUID();
  const newDB_Item = {
    [keyName]: long_Url,
    short_Url: short_Url,
    id: randomUUID,
  };

  URL__DATABASE.push(newDB_Item);
  writeFile(newDB_Item);
  return newDB_Item;
}

export function getDbItem(shortUrl: string) {
  if (!shortUrl) {
    throw new HtttpException(404, "Url wurde nicht Gefunden");
  }
  if (typeof shortUrl !== "string") {
    throw new TypeError("Url hat das falsche Format");
  }
  if (shortUrl.trim() === "") {
    throw new HtttpException(403, "Url bitte eingeben");
  }
  const serchDbItem = URL__DATABASE.find(
    (item) => item.short_Url === shortUrl,
  )?.DB_item;
  return serchDbItem;
}
export function getLongUrl(shortUrl: string): string {
  if (!shortUrl) {
    throw new HtttpException(403, "Keine short_Url eingegeben");
  }
  if (typeof shortUrl !== "string") {
    throw new TypeError("Url hat das falsche Format");
  }
  const db_data = URL__DATABASE.find((item) => item.short_Url === shortUrl);
  if (!db_data) {
    throw new HtttpException(404, "Database konnte nicht gefunden werden");
  }
  const { short_Url, id, ...rest } = db_data;

  const long_Url = Object.values(rest)[0];
  if (!long_Url) {
    throw new HtttpException(404, "Keine LongUrl Vorhanden---Db Fehler");
  }

  return long_Url;
}

export function initialLoadUrls() {
  URL__DATABASE = readFile();
}

export function deleteUrl(urlId: string): DB_Item {
  if (!urlId) {
    throw new HtttpException(3, "Keine Id eingegeben");
  }
  if (typeof urlId !== "string") {
    throw new TypeError("Url Id hat das falsche Format (String)");
  }
  const indexToDel = URL__DATABASE.findIndex(
    (urlData) => urlData.short_Url === urlId,
  );
  console.log(indexToDel);
  const delContent = URL__DATABASE[indexToDel];
  console.log(delContent);

  if (!delContent) {
    throw new HtttpException(404, "Id konnte nicht gefunden werden");
  }
  URL__DATABASE.splice(indexToDel, 1);
  URL__DATABASE.forEach((urlData) => writeFile(urlData));
  overwriteFile(URL__DATABASE);
  return delContent;
}

export function updateUrl(urlId: string, newLongUrl: string) {
  const searchUrl = URL__DATABASE.find((url) => url.short_Url === urlId);
  if (!searchUrl) {
    throw new HtttpException(404, "Gesuchte Url nicht gefunden");
  }
  if (typeof newLongUrl !== "string" || typeof urlId !== "string") {
    throw new TypeError("Url oder Id  hat das falsche Format(string)");
  }
  const { short_Url, id, ...rest } = searchUrl;

  const longUrlKey = Object.keys(rest)[0];
  if (!longUrlKey) {
    throw new HtttpException(404, "Kein Key gefunden");
  }
  searchUrl[longUrlKey] = newLongUrl;
  overwriteFile(URL__DATABASE);
}
