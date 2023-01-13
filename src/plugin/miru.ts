import request from "umi-request";
import { useSettingsStore } from "@/stores/settings";

class Miru {
  url: string;
  constructor(url: string) {
    this.url = url;
    return this;
  }
  request(url: string, optings: any) {
    if (!optings) {
      optings = {}
    }
    if (!optings.headers) {
      optings.headers = { "Miru-Url": this.url }
    }
    if (!optings.headers["Miru-Url"]) {
      optings.headers = { ...optings.headers, "Miru-Url": this.url }
    }
    const miruProxy =
      ((useSettingsStore().getItem("MIRU_PROXY_URL") as string) ??
        import.meta.env.MIRU_PROXY_URL) + url;
    return request(miruProxy, optings);
  }
}

export default {
  install: () => {
    window.Miru = Miru;
  },
};
