import request from "umi-request";
import { useSettingsStore } from "@/stores/settings";

class Miru {
    url: string;
    constructor(url: string) {
        this.url = url
        return this
    }
    request(url: string, optings: any) {
        console.log(optings, url);
        let opt = { headers: { "miru-url": this.url } }
        if (optings) {
            optings.headers = { ...optings.headers, "miru-url": this.url }
            opt = optings
        }
        console.log(opt);
        const miruProxy = (useSettingsStore().getItem("MIRU_PROXY_URL") as string ?? import.meta.env.MIRU_PROXY_URL) + url;
        return request(miruProxy, opt)
    }
}

export default {
    install: () => {
        window.Miru = Miru
    }
}