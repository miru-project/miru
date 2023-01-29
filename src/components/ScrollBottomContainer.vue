<template>
  <slot></slot>
</template>

<script setup lang="ts">
import { onActivated, onDeactivated } from "vue";
const props = defineProps(["tolerance", "needData"]);
const emit = defineEmits(["isBottom"]);
const listener = () => {
  const clientHeight =
    document.documentElement.scrollHeight -
    document.documentElement.clientHeight;
  if (
    clientHeight - (props.tolerance ? 20 : props.tolerance) < window.scrollY &&
    props.needData
  ) {
    emit("isBottom");
  }
};
onActivated(() => {
  window.addEventListener("scroll", listener);
});
onDeactivated(() => {
  window.removeEventListener("scroll", listener);
});
</script>
