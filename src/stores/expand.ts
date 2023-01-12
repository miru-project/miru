import { ref, computed } from 'vue'
import { defineStore } from 'pinia'

export const useMiruExpandStore = defineStore('expand', () => {

  const expands = ref<Map<string, any>>(new Map<string, any>())

  // 初始化扩展
  const initExpands = () => {
    listExpands().forEach((e: any) => {
      expands.value?.set(e.package, new Function(e.script)())
    })

    return expands
  }

  // 列出已安装扩展
  const listExpands = () => {
    const s = JSON.parse(localStorage.getItem("expands") ?? "[]")
    return new Map<string, any>(s)
  }

  // 安装扩展
  const installExpand = (script: string) => {
    const scriptMetaData = script.match(/MiruUserScript([\s\S]+?)\/MiruUserScript/)?.[1]
    if (!scriptMetaData) {
      return alert('安装错误')
    }
    const expand: any = {}
    const lines = scriptMetaData.split('\n');
    for (let i = 0; i < lines.length; i++) {
      const line = lines[i];
      if (line.startsWith('// @')) {
        const property = line.slice(4).split(' ');
        expand[property[0]] = property.slice(1).join(' ').trim();
      }
    }

    if (!expand.package || !expand.name || !expand.version) {
      return alert("安装错误")
    }
    expand.script = script
    // 存储扩展到localStorage
    const localExpand = listExpands()
    localExpand.set(expand.package, expand)
    const obj = Object.fromEntries(localExpand);
    localStorage.setItem("expands", JSON.stringify(Object.entries(obj)))
    // 装载扩展
    expands.value?.set(expand.package, new Function(expand.script)())
  }

  // 卸载扩展
  const uninstallExpand = (pkg: string) => {
    // 删除扩展
    const localExpand = listExpands()
    localExpand.delete(pkg)
    const obj = Object.fromEntries(localExpand);
    localStorage.setItem("expands", JSON.stringify(Object.entries(obj)))
    // 卸载扩展
    expands.value?.delete(pkg)
  }

  // 从已安装扩展通过包名获取名称
  const getNameforPackge = (packageName: string) => {
    const pn = listExpands().get(packageName) as any
    if (pn) {
      return pn.name
    }
  }

  // 检查扩展
  const check = (expand: any) => {
    const e = listExpands().get(expand.package) as any
    if (!e) {
      return "安装"
    }

    if (expand.version != e.version) {
      return "更新"
    }
    return '重装'
  }

  // 是否安装
  const isInstall = (expand: any) => {
    return listExpands().has(expand.package)
  }


  return {
    expands,
    listExpands,
    initExpands,
    installExpand,
    uninstallExpand,
    check,
    isInstall,
    getNameforPackge,
  }
})