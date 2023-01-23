import { useSettingsStore } from "@/stores/settings";
import request from "umi-request";

// 扩展类 扩展需要继承此类来使用request方法来通过代理请求数据
class Expand {
    url: string;
    constructor(url: string) {
        this.url = url
        return this
    }
    // 发送请求
    request(url: string, options: any) {
        if (!options) {
            options = {}
        }
        if (!options.headers) {
            options.headers = { "Miru-Url": this.url }
        }
        if (!options.headers["Miru-Url"]) {
            options.headers = { ...options.headers, "Miru-Url": this.url }
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
}

window.Expand = Expand

export class ExpandManage {
    expand: Map<string, Expand>;
    constructor() {
        this.expand = new Map()
    }
    load(packageName: string, expandScriptUrl: string) {
        return new Promise((resolve, reject) => {
            import(/* @vite-ignore */expandScriptUrl)
                .then((expand) => {
                    this.expand.set(packageName, new expand.default())
                    resolve(packageName)
                })
                .catch((error) => {
                    reject(error)
                })
        })

    }
    unload(packageName: string) {
        const expand = this.expand.get(packageName)
        if (!expand) {
            return
        }
        this.expand.delete(packageName)
    }
    getExpand(packageName: string): Expand {
        return this.expand.get(packageName) as Expand
    }
    isLoad(packageName: string): boolean {
        return this.getExpand(packageName) ? true : false
    }
}