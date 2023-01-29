import { reactive } from "vue";
import { defineStore } from "pinia";

export const useProgressStore = defineStore("progress", () => {
  type progress = {
    pkg: string;
    url: string;
    watchUrl: string;
    watchName: string | undefined;
    watchGroupName: string | undefined;
  };
  const list = reactive<Array<progress>>(
    JSON.parse(localStorage.getItem("progress") as string) ?? []
  );
  const setProgress = (progress: progress) => {
    if (!progress) {
      return;
    }
    if (!progress.watchName) {
      return;
    }
    const existsProgressIndex = list.findIndex(
      (e) => e.pkg == progress.pkg && e.url == progress.url
    );
    if (existsProgressIndex != -1) {
      list.splice(existsProgressIndex, 1);
    }
    list.push(progress);
    localStorage.setItem("progress", JSON.stringify(list));
  };
  const getProgress = (pkg: string, url: string) => {
    return list.find((e) => e.pkg == pkg && e.url == url);
  };

  return {
    setProgress,
    getProgress,
  };
});
