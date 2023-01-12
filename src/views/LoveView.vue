<script setup lang="ts">
import GridListVue from "@/components/GridList.vue";
import { useLoveStore } from "@/stores/love";
const love = useLoveStore()
</script>

<template>
  <main>
    <h1>收藏</h1>
    <GridListVue :list="love.list"> </GridListVue>
  </main>
</template>
<style>

</style>