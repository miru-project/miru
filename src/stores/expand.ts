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
    return new Map<string,any>(s)
  }

  // 安装扩展
  const installExpand = (expand: any) => {
    // 存储扩展到localStorage
    const localExpand = listExpands()
    localExpand.set(expand.package, expand)
    const obj = Object.fromEntries(localExpand);
    localStorage.setItem("expands", JSON.stringify(Object.entries(obj)))
    // 装载扩展
    expands.value?.set(expand.package, new Function(expand.script)())
  }

  // 卸载扩展
  const uninstallExpand = (expand: any) => {
    // 删除扩展
    const localExpand = listExpands()
    localExpand.delete(expand.package)
    const obj = Object.fromEntries(localExpand);
    localStorage.setItem("expands", JSON.stringify(Object.entries(obj)))
    // 卸载扩展
    expands.value?.delete(expand.package)
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
    if (e.version != expand.version) {
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