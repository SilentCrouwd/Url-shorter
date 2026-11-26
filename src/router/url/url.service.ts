import { randomBytes } from "node:crypto";

export function generateRndSting(long_Url: string, length: number): string {
  //RandomBytes erzeugt 6 zufälllige bytes und gibt sie zurück
  // to.String("base64Url") gibt sie in URL sicheren lesbare Zeichen zurück
  if (!long_Url || long_Url === "") {
    throw new Error("No URL inserted");
  }
  const shortenURL = randomBytes(length).toString("base64url").slice(0, length);

  return shortenURL;
}
