<script setup lang="ts">
import GridList from "@/components/GridList.vue";
import { useMiruExtensionStore } from "@/stores/extension";
import { ref, reactive, onMounted } from "vue";

const extensionStore = useMiruExtensionStore();
const kw = ref();
const page = ref(1);
const searched = ref(false);
const activeExtension = ref();
const data = reactive([]);
const loading = ref(false);
const nodata = ref(false);

const search = async (pkg: string) => {
  nodata.value = false;
  loading.value = true;
  try {
    data.length = 0;
    const res =
      ((await extensionStore.extensionManage.getExtension(pkg).search(kw.value, page.value)) as never[]) ??
      [];
    res.forEach((e: any) => {
      e.pkg = pkg;
    });
    data.push(...res);
  } catch (error) {
    console.log(error);
  } finally {
    searched.value = true;
    loading.value = false;
    nodata.value = true;
  }
};

const getNew = async (pkg: string) => {
  nodata.value = false;
  loading.value = true;
  data.length = 0;
  try {
    const res = ((await extensionStore.extensionManage.getExtension(pkg).latest()) as never[]) ?? [];
    res.forEach((e: any) => {
      e.pkg = pkg;
    });
    data.push(...res);
  } catch (error: any) {
    console.log(error);
  } finally {
    loading.value = false;
    nodata.value = true;
  }
};

onMounted(() => {
  extensionStore.extensionManage.Extensions?.forEach((v, k) => {
    if (!activeExtension.value) {
      activeExtension.value = k;
    }
  });
  getNew(activeExtension.value);
})
</script>

<template>
  <main>
    <h1 class="page-title">搜索</h1>
    <form @submit.prevent="search(activeExtension)">
      <input type="text" id="search" v-model="kw" @input="!kw ? getNew(activeExtension) : false"
        placeholder="找点什么好康的呢？" />
    </form>
    <div v-if="extensionStore.extensionManage.Extensions.size">
      <div class="switch">
        <button v-for="(v, k) in extensionStore.extensionManage.Extensions"
          :class="{ activit: activeExtension == v[0] }"
          @click="(activeExtension = v[0]) && (kw ? search(v[0]) : getNew(v[0]))" :key="k">
          {{ extensionStore.getNameforPackge(v[0]) }}
        </button>
      </div>
      <h3 v-if="!kw">最近更新</h3>
      <div>
        <GridList v-if="extensionStore.getNameforPackge(activeExtension) ?? false" :list="data" :loading="loading"
          :nodata="nodata">
        </GridList>
      </div>
    </div>
    <div v-else>
      <p>没有扩展哦</p>
    </div>
  </main>
</template>
<style lang="scss" scoped>
input {
  width: 100%;
  border: unset;
  background-color: rgb(235, 235, 235);
  padding: 20px 20px;
  border-radius: 20px;
  border: 1px solid rgb(226, 226, 226);
  font-size: 16px;

  &:focus-visible {
    outline: unset;
    border: 1px solid rgb(174, 174, 174);
  }
}
</style>
