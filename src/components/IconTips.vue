<script setup lang="ts">
import IconAlert from "./icons/IconAlert.vue";
import IconInfo from "./icons/IconInfo.vue";

const prop = defineProps({
  text: {
    type: String,
    default: "",
  },
  icon: {
    type: String,
    default: "alert",
  },
});
</script>
<template>
  <div>
    <div v-if="prop.icon === 'info'">
      <IconInfo></IconInfo>
    </div>
    <div v-else>
      <IconAlert></IconAlert>
    </div>
    <p>{{ prop.text }}</p>
  </div>
</template>
<style lang="scss" scoped>
div {
  text-align: center;

  p {
    padding: 0;
    margin: 0;
  }
}

svg {
  width: 50px;
}
</style>
