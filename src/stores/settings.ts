import { defineStore } from "pinia";

export const useSettingsStore = defineStore("settings", () => {
  const getItem = (key: string) => {
    return read().get(key);
  };
  const setItem = (key: string, value: string) => {
    const map = read();
    map.set(key, value);
    save(map);
  };
  const delItem = (key: string) => {
    const map = read();
    map.delete(key);
    save(map);
  };
  const save = (map: Map<unknown, unknown>) => {
    const obj = Object.fromEntries(map);
    const json = JSON.stringify(obj);
    localStorage.setItem("settings", json);
  };
  const read = () => {
    const obj = JSON.parse(localStorage.getItem("settings") ?? "[]");
    return new Map(Object.entries(obj));
  };
  return {
    delItem,
    getItem,
    setItem,
  };
});
