<script setup lang="ts">
import GridListVue from "@/components/GridList.vue";
import { useLoveStore } from "@/stores/love";
import IconInfo from "@/components/icons/IconInfo.vue";
import IconTips from "@/components/IconTips.vue";

const love = useLoveStore();
</script>

<template>
  <main>
    <div v-if="love.list.length">
      <h1 class="page-title">收藏</h1>
      <GridListVue :list="love.list"> </GridListVue>
    </div>
    <div class="no-love-itme" v-else>
      <IconTips icon="info" text="暂无收藏"></IconTips>
    </div>
  </main>
</template>
<style lang="scss">
.no-love-itme {
  display: flex;
  height: var(--fullHeightScreen);
  justify-content: center;
  align-items: center;
}
</style>
