import { useSettingsStore } from "@/stores/settings";
import request from "umi-request";

// 扩展类 扩展需要继承此类来使用request方法来通过代理请求数据
class Expand {
    packageName: string;
    url: string;
    constructor(packageName: string, url: string) {
        this.url = url
        this.packageName = packageName
        return this
    }
    // 发送请求
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
            import(expandScriptUrl)
                .then((expand) => {
                    this.expand.set(packageName, new expand.default(packageName))
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