<script setup lang="ts">
import GridList from "@/components/GridList.vue";
import { useMiruExpandStore } from "@/stores/expand";
import { ref, reactive, onMounted } from "vue";

const miru = useMiruExpandStore();
const kw = ref();
const page = ref(1);
const searched = ref(false);
const activeExpand = ref();
const data = reactive([]);
const loading = ref(false);
const nodata = ref(false);

const search = async (pkg: string) => {
  nodata.value = false;
  loading.value = true;
  try {
    console.log("搜索了", pkg);
    data.length = 0;
    const res =
      ((await miru.expands.get(pkg).search(kw.value, page.value)) as never[]) ??
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
    const res = ((await miru.expands.get(pkg).new()) as never[]) ?? [];
    res.forEach((e: any) => {
      e.pkg = pkg;
    });
    data.push(...res);
  } catch (error: any) {
    console.log(error.name);
  } finally {
    loading.value = false;
    nodata.value = true;
  }
};

onMounted(async () => {
  // 获取第一个扩展的包名
  miru.expands?.forEach((v, k) => {
    if (!activeExpand.value) {
      activeExpand.value = k;
    }
  });
  getNew(activeExpand.value);
});
</script>

<template>
  <main>
    <h1>搜索</h1>
    <form @submit.prevent="search(activeExpand)">
      <input
        type="text"
        id="search"
        v-model="kw"
        @input="!kw ? getNew(activeExpand) : false"
        placeholder="找点什么好康的呢？"
      />
    </form>
    <div v-if="miru.expands.size">
      <div class="switch">
        <button
          v-for="(v, k) in miru.expands"
          :class="{ activit: activeExpand == v[0] }"
          @click="(activeExpand = v[0]) && (kw ? search(v[0]) : getNew(v[0]))"
          :key="k"
        >
          {{ miru.getNameforPackge(v[0]) }}
        </button>
      </div>
      <h3 v-if="!kw">最近更新</h3>
      <div>
        <GridList
          v-if="miru.getNameforPackge(activeExpand) ?? false"
          :list="data"
          :loading="loading"
          :nodata="nodata"
        >
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
