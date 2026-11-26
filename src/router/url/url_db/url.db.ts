import { overwriteFile, readFile, writeFile } from "../../../util/file.save.js";
import { HtttpException } from "../../../error/Htttpexeption.js";
import type { DB_UrlMapping } from "../../../types/types.js";

let mappingURL: DB_UrlMapping = {};

export function createDB_Item(
  shortId: string,
  long_Url: string,
): DB_UrlMapping {
  if (!long_Url) {
    throw new HtttpException(404, "Bitte Url eintragen");
  }
  if (!shortId) {
    throw new HtttpException(404, "fehler beim erstellen der short Url");
  }
  mappingURL[shortId] = long_Url;
  writeFile(mappingURL);
  return mappingURL;
}

export function getLongUrl(shortUrl: string): string {
  if (!shortUrl) {
    throw new HtttpException(403, "Keine short_Url eingegeben");
  }
  if (typeof shortUrl !== "string") {
    throw new TypeError("Url hat das falsche Format");
  }

  const longUrl = mappingURL[shortUrl];

  if (!longUrl) {
    throw new HtttpException(404, "Database konnte nicht gefunden werden");
  }
  return longUrl;
}

export function initialLoadUrls() {
  mappingURL = readFile();
}

export function deleteUrl(shortId: string): void {
  if (!shortId) {
    throw new HtttpException(3, "Keine Id eingegeben");
  }
  if (typeof shortId !== "string") {
    throw new TypeError("Url Id hat das falsche Format (String)");
  }
  delete mappingURL[shortId];
  overwriteFile(mappingURL);
}

export function updateUrl(shortId: string, newLongUrl: string) {
  if (typeof newLongUrl !== "string" || typeof shortId !== "string") {
    throw new TypeError("Url oder Id  hat das falsche Format(string)");
  }
  mappingURL[shortId] = newLongUrl;
  overwriteFile(mappingURL);
}
