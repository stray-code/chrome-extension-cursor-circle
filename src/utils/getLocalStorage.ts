import { LocalStorageItems } from "../types";

type Return<T> = T extends "settings" ? LocalStorageItems["settings"] : never;

export const getLocalStorage = async <T extends keyof LocalStorageItems>(
  key: T,
): Promise<Return<T> | undefined> => {
  return chrome.storage.local.get(key).then((value) => value[key]);
};
