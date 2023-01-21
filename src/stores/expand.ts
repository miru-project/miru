import { ref, computed } from "vue";
import { defineStore } from "pinia";
import { ExpandManage } from "@/expandManage";
import { encode } from "js-base64";

// 管理存储扩展
export const useMiruExpandStore = defineStore("expand", () => {
  const expandManage = ref<ExpandManage>(new ExpandManage())
  const installComplete = ref(false)
  // 初始化 加载已存储的扩展
  const initExpands = () => {
    const localExpands = listExpands()
    let count = 0
    let needLoadExpandCount = localExpands.size
    if (!needLoadExpandCount) {
      installComplete.value = true
    }
    localExpands.forEach((e: any) => {
      const dataBase64 = `data:text/javascript;base64,${encode(e.script)}`
      expandManage.value.load(e.package, dataBase64).then(() => {
        count++
      }).catch((error) => {
        needLoadExpandCount--
        console.log(error);
        alert(`${e.package} 扩展安装错误: \n ${error}`)
      }).finally(() => {
        if (count == needLoadExpandCount) {
          installComplete.value = true
        }
      })
    });
  };

  // 列出已存储扩展
  const listExpands = () => {
    const s = JSON.parse(localStorage.getItem("expands") ?? "[]");
    return new Map<string, any>(s);
  };

  // 存储扩展并加载
  const installExpand = (script: string) => {
    const scriptMetaData = script.match(
      /MiruExpand([\s\S]+?)\/MiruExpand/
    )?.[1];
    if (!scriptMetaData) {
      return alert("安装错误");
    }
    const expand: any = {};
    const lines = scriptMetaData.split("\n");
    for (let i = 0; i < lines.length; i++) {
      const line = lines[i];
      if (line.startsWith("// @")) {
        const property = line.slice(4).split(" ");
        expand[property[0]] = property.slice(1).join(" ").trim();
      }
    }

    if (!expand.package || !expand.name || !expand.version) {
      return alert("扩展解析错误、安装失败");
    }
    expand.script = script;
    // 存储扩展到localStorage
    const localExpand = listExpands();
    localExpand.set(expand.package, expand);
    const obj = Object.fromEntries(localExpand);
    localStorage.setItem("expands", JSON.stringify(Object.entries(obj)));
    // 装载扩展
    expandManage.value.load(expand.package, `data:text/javascript;base64,${encode(script)}`)
  };
  

  // 卸载扩展
  const uninstallExpand = (pkg: string) => {
    // 删除扩展
    const localExpand = listExpands();
    localExpand.delete(pkg);
    const obj = Object.fromEntries(localExpand);
    localStorage.setItem("expands", JSON.stringify(Object.entries(obj)));
    // 卸载扩展
    expandManage.value.unload(pkg)
  };

  // 从已安装扩展通过包名获取名称
  const getNameforPackge = (packageName: string) => {
    const pn = listExpands().get(packageName) as any;
    if (pn) {
      return pn.name;
    }
  };

  // 检查扩展
  const check = (expand: any) => {
    const e = listExpands().get(expand.package) as any;
    if (!e) {
      return "安装";
    }

    if (expand.version != e.version) {
      return "更新";
    }
    return "重装";
  };

  // 是否安装
  const isInstall = (expand: any) => {
    return listExpands().has(expand.package);
  };

  return {
    expandManage,
    installComplete,
    listExpands,
    initExpands,
    installExpand,
    uninstallExpand,
    check,
    isInstall,
    getNameforPackge,
  };
});
