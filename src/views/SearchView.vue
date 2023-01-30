<script setup lang="ts">
import GridList from "@/components/GridList.vue";
import IconTips from "@/components/IconTips.vue";
import ScrollBottomContainer from "@/components/ScrollBottomContainer.vue";
import { useMiruExtensionStore } from "@/stores/extension";
import { ref, onMounted } from "vue";

const extensionStore = useMiruExtensionStore();
const kw = ref();
const page = ref(1);
const isSearch = ref(false);
const activeExtension = ref();
const loading = ref(false);
const nodata = ref(false);
const needData = ref(true);
const data = ref<Map<number, []>>(new Map());
const key = ref<number>(0);
const errMsg = ref();

const search = async (time: number, pkg: string) => {
  isSearch.value = true;
  nodata.value = false;
  loading.value = true;
  needData.value = false;
  if (time != key.value) {
    page.value = 1;
  }
  key.value = time;
  errMsg.value = "";
  let res = [];
  try {
    res = (await extensionStore.extensionManage
      .getExtension(pkg)
      .search(kw.value, page.value++)) as [];
    res.forEach((e: any) => {
      e.pkg = pkg;
    });
    const temp = data.value.get(time) ?? [];
    temp.push(...res);
    data.value.set(time, temp);
  } catch (error) {
    errMsg.value = error;
  }
  if (time == key.value) {
    loading.value = false;
    if (!res.length) {
      nodata.value = true;
      if (time == key.value) {
        needData.value = false;
        return;
      }
    }
    needData.value = true;
  }
};

const getNew = async (time: number, pkg: string) => {
  isSearch.value = false;
  nodata.value = false;
  loading.value = true;
  key.value = time;
  errMsg.value = "";
  try {
    const res = (await extensionStore.extensionManage
      .getExtension(pkg)
      .latest()) as [];
    res.forEach((e: any) => {
      e.pkg = pkg;
    });
    if (!res) {
      nodata.value = true;
    }
    data.value.set(time, res);
  } catch (error: any) {
    errMsg.value = error;
  }
  if (time == key.value) {
    loading.value = false;
  }
};

onMounted(() => {
  activeExtension.value =
    extensionStore.extensionManage.Extensions.keys().next().value;
  getNew(Math.random(), activeExtension.value);
});
</script>

<template>
  <div>
    <div v-if="extensionStore.extensionManage.Extensions.size">
      <h1 class="page-title">搜索</h1>
      <form @submit.prevent="search(Math.random(), activeExtension)">
        <input
          type="text"
          id="search"
          v-model="kw"
          @input="!kw ? getNew(Math.random(), activeExtension) : false"
          placeholder="找点什么好康的呢？"
        />
      </form>
      <div>
        <div class="selector">
          <button
            v-for="(v, k) in extensionStore.extensionManage.Extensions"
            :class="{ activit: activeExtension == v[0] }"
            @click="
              (activeExtension = v[0]) &&
                (kw ? search(Math.random(), v[0]) : getNew(Math.random(), v[0]))
            "
            :key="k"
          >
            {{ extensionStore.getNameforPackge(v[0]) }}
          </button>
        </div>
        <h3 v-if="!kw">最近更新</h3>
        <div>
          <ScrollBottomContainer
            tolerance="100"
            :need-data="needData"
            @is-bottom="isSearch ? search(key, activeExtension) : false"
          >
            <GridList
              :list="data.get(key)"
              :error-msg="errMsg"
              :loading="loading"
              :nodata="nodata"
            >
            </GridList>
          </ScrollBottomContainer>
        </div>
      </div>
    </div>
    <div class="full-screen-center" v-else>
      <IconTips text="暂无扩展"></IconTips>
    </div>
  </div>
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
