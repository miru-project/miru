import { useSettingsStore } from "@/stores/settings";
import request from "umi-request";

// 扩展类 扩展需要继承此类来使用request方法来通过代理请求数据
class Extension {
  url: string;
  constructor(url: string) {
    this.url = url;
    return this;
  }
  // 发送请求
  request(url: string, options: any) {
    if (!options) {
      options = {};
    }
    if (!options.headers) {
      options.headers = { "Miru-Url": this.url };
    }
    if (!options.headers["Miru-Url"]) {
      options.headers = { ...options.headers, "Miru-Url": this.url };
    }
    const miruProxy =
      ((useSettingsStore().getItem("MIRU_PROXY_URL") as string) ??
        import.meta.env.MIRU_PROXY_URL) + url;
    return request(miruProxy, options);
  }
  search(kw: string, page: number): unknown {
    throw new Error("not implement");
  }
  info(url: string): unknown {
    throw new Error("not implement");
  }
  watch(url: string): unknown {
    throw new Error("not implement");
  }
  latest(): unknown {
    throw new Error("not implement");
  }
  checkUpdate(url: string): string {
    return "";
  }
}

window.Extension = Extension;

export class ExtensionManage {
  Extensions: Map<string, Extension>;
  constructor() {
    this.Extensions = new Map();
  }
  load(packageName: string, ExtensionScriptUrl: string) {
    return new Promise((resolve, reject) => {
      import(/* @vite-ignore */ ExtensionScriptUrl)
        .then((Extension) => {
          this.Extensions.set(packageName, new Extension.default());
          resolve(packageName);
        })
        .catch((error) => {
          reject(error);
        });
    });
  }
  unload(packageName: string) {
    const Extension = this.Extensions.get(packageName);
    if (!Extension) {
      return;
    }
    this.Extensions.delete(packageName);
  }
  getExtension(packageName: string): Extension {
    return this.Extensions.get(packageName) as Extension;
  }
  isLoad(packageName: string): boolean {
    return this.getExtension(packageName) ? true : false;
  }
}
