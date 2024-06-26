import { LocalStorageItems } from "../types";

type Values<T> = T extends "settings" ? LocalStorageItems["settings"] : never;

export const setLocalStorage = async <T extends keyof LocalStorageItems>(
  key: T,
  values: Values<T>,
) => {
  chrome.storage.local.set({ [key]: values });
};
