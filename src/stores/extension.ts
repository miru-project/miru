import { ref } from "vue";
import { defineStore } from "pinia";
import { ExtensionManage } from "@/ExtensionManage";
import { encode } from "js-base64";

// 管理存储扩展

export const useMiruExtensionStore = defineStore("Extension", () => {
  const extensionManage = ref<ExtensionManage>(new ExtensionManage());
  const installComplete = ref(false);
  // 初始化 加载已存储的扩展
  const initExtensions = () => {
    const localExtensions = listExtensions();
    let count = 0;
    let needLoadExtensionCount = localExtensions.size;
    if (!needLoadExtensionCount) {
      installComplete.value = true;
    }
    localExtensions.forEach((e: any) => {
      const dataBase64 = `data:text/javascript;base64,${encode(e.script)}`;
      extensionManage.value
        .load(e.package, dataBase64)
        .then(() => {
          count++;
        })
        .catch((error) => {
          needLoadExtensionCount--;
          console.log(error);
          alert(`${e.package} 扩展安装错误: \n ${error}`);
        })
        .finally(() => {
          if (count == needLoadExtensionCount) {
            installComplete.value = true;
          }
        });
    });
  };

  // 列出已存储扩展
  const listExtensions = () => {
    const s = JSON.parse(localStorage.getItem("extensions") ?? "[]");
    return new Map<string, any>(s);
  };

  // 存储扩展并加载
  const installExtension = (script: string) => {
    const scriptMetaData = script.match(
      /MiruExtension([\s\S]+?)\/MiruExtension/
    )?.[1];
    if (!scriptMetaData) {
      return alert("安装错误");
    }
    const Extension: any = {};
    const lines = scriptMetaData.split("\n");
    for (let i = 0; i < lines.length; i++) {
      const line = lines[i];
      if (line.startsWith("// @")) {
        const property = line.slice(4).split(" ");
        Extension[property[0]] = property.slice(1).join(" ").trim();
      }
    }

    if (!Extension.package || !Extension.name || !Extension.version) {
      return alert("扩展解析错误、安装失败");
    }
    Extension.script = script;
    // 存储扩展到localStorage
    const localExtension = listExtensions();
    localExtension.set(Extension.package, Extension);
    const obj = Object.fromEntries(localExtension);
    localStorage.setItem("extensions", JSON.stringify(Object.entries(obj)));
    // 装载扩展
    extensionManage.value.load(
      Extension.package,
      `data:text/javascript;base64,${encode(script)}`
    );
  };

  // 卸载扩展
  const uninstallExtension = (pkg: string) => {
    // 删除扩展
    const localExtension = listExtensions();
    localExtension.delete(pkg);
    const obj = Object.fromEntries(localExtension);
    localStorage.setItem("extensions", JSON.stringify(Object.entries(obj)));
    // 卸载扩展
    extensionManage.value.unload(pkg);
  };

  // 从已安装扩展通过包名获取名称
  const getNameforPackge = (packageName: string) => {
    const pn = listExtensions().get(packageName) as any;
    if (pn) {
      return pn.name;
    }
  };

  // 检查扩展
  const check = (Extension: any) => {
    const e = listExtensions().get(Extension.package) as any;
    if (!e) {
      return "安装";
    }

    if (Extension.version != e.version) {
      return "更新";
    }
    return "重装";
  };

  // 是否安装
  const isInstall = (Extension: any) => {
    return listExtensions().has(Extension.package);
  };

  return {
    extensionManage,
    installComplete,
    listExtensions,
    initExtensions,
    installExtension,
    uninstallExtension,
    check,
    isInstall,
    getNameforPackge,
  };
});
