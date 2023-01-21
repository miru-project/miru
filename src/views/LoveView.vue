<script setup lang="ts">
import GridListVue from "@/components/GridList.vue";
import { useLoveStore } from "@/stores/love";
import AlertVue from "@/components/Alert.vue";

const love = useLoveStore();
</script>

<template>
  <main>
    <h1>收藏</h1>
    <div v-if="love.list.length">
      <GridListVue :list="love.list"> </GridListVue>
    </div>
    <div class="no-love-itme" v-else>
      <AlertVue text="暂无收藏"></AlertVue>
    </div>
  </main>
</template>
<style lang="scss">
.no-love-itme {
  margin-top: 200px;
}
</style>
