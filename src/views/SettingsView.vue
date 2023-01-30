<script setup lang="ts">
import IconRefresh from "@/components/icons/IconRefresh.vue";
import { useSettingsStore } from "@/stores/settings";
import { ref } from "vue";
import { version } from "./../../package.json";
const settings = useSettingsStore();
const miruProxy = ref();
const miruRepo = ref();
const showKanban = ref();

const setSettings = (key: string, value: string) => {
  settings.setItem(key, value);
  readSettings();
};

const setDefault = (key: string) => {
  settings.delItem(key);
  readSettings();
};

const readSettings = () => {
  miruRepo.value =
    (settings.getItem("MIRU_REPO_URL") as string) ??
    import.meta.env.MIRU_REPO_URL;
  showKanban.value =
    (settings.getItem("MIRU_SHOW_KANBAN") as boolean) ??
    import.meta.env.MIRU_SHOW_KANBAN;
  miruProxy.value =
    (settings.getItem("MIRU_PROXY_URL") as string) ??
    import.meta.env.MIRU_PROXY_URL;
};
readSettings();
</script>
<template>
  <div class="setting">
    <h1 class="page-title">设置</h1>
    <div class="content">
      <h3>Miru-Proxy</h3>
      <div class="input">
        <input type="text" v-model="miruProxy" @change="setSettings('MIRU_PROXY_URL', miruProxy)" />
        <button @click="setDefault('MIRU_PROXY_URL')">
          <IconRefresh></IconRefresh>
        </button>
      </div>
      <h3>扩展仓库</h3>
      <div class="input">
        <input type="text" v-model="miruRepo" @change="setSettings('MIRU_REPO_URL', miruRepo)" />
        <button @click="setDefault('MIRU_REPO_URL')">
          <IconRefresh></IconRefresh>
        </button>
      </div>
      <h3>看板娘</h3>
      <input type="checkbox" name="kanban" id="kanban" v-model="showKanban"
        @change="setSettings('MIRU_SHOW_KANBAN', showKanban)" />显示看板娘
      <h2>关于</h2>
      <img src="/logo.svg" style="width: 80px; display: block; border-radius: 0" alt="logo" />
      <p>当前版本：v{{ version }} <br /></p>
      <p>开源：<a href="https://github.com/miru-project/miru" target="_blank">Github</a></p>
      <p> 本项目灵感来自
        <a href="https://tachiyomi.org/" target="_blank" rel="noopener noreferrer">tachiyomi</a>
      </p>
      <br />
    </div>
  </div>
</template>
<style lang="scss" scoped>
@media screen and (max-width: 1024px) {
  .setting:before {
    background-size: 100px;
  }
}

input[type="text"] {
  border: unset;
  max-width: 500px;
  width: 100%;
  background-color: rgb(238, 238, 238);
  padding: 10px 20px;
  margin-right: 8px;
  border-radius: 20px;

  &:focus-visible {
    outline: unset;
  }
}

button {
  border: unset;
  cursor: pointer;
  width: 40px;
  height: 40px;
  border-radius: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: rgb(238, 238, 238);

  &:hover {
    background-color: rgb(215, 215, 215);
  }

  svg {
    fill: #303030;
    width: 30px;
    width: 30px;
  }
}

.input {
  display: flex;
}
</style>
