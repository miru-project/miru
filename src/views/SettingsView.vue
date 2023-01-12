<script setup lang="ts">
import IconRefresh from "@/components/icons/IconRefresh.vue";
import { useSettingsStore } from "@/stores/settings";
import { ref } from "vue";
const settings = useSettingsStore();
const miruProxy = ref();
const miruRepo = ref();

const setSettings = (key: string, value: string) => {
  settings.setItem(key, value);
  readSettings();
};

const setDefault = (key: string) => {
  settings.delItem(key);
  readSettings();
};

const readSettings = () => {
  miruProxy.value = settings.getItem("MIRU_PROXY_URL") as string;
  miruRepo.value = settings.getItem("MIRU_REPO_URL") as string;
  if (!miruProxy.value) {
    miruProxy.value = import.meta.env.MIRU_PROXY_URL;
  }
  if (!miruRepo.value) {
    miruRepo.value = import.meta.env.MIRU_REPO_URL;
  }
};
readSettings();
</script>
<template>
  <main>
    <h1>设置</h1>
    <div class="content">
      <h3>Miru-Proxy</h3>
      <div class="input">
        <input
          type="text"
          v-model="miruProxy"
          @change="setSettings('MIRU_PROXY_URL', miruProxy)"
        />
        <button @click="setDefault('MIRU_PROXY_URL')">
          <IconRefresh></IconRefresh>
        </button>
      </div>
      <h3>扩展仓库</h3>
      <div class="input">
        <input
          type="text"
          v-model="miruRepo"
          @change="setSettings('MIRU_REPO_URL', miruRepo)"
        />
        <button @click="setDefault('MIRU_REPO_URL')">
          <IconRefresh></IconRefresh>
        </button>
      </div>
    </div>
  </main>
</template>
<style lang="scss" scoped>
input {
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
