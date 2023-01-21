<script setup lang='ts'>
import IconAlertVue from './icons/IconAlert.vue';

const prop = defineProps(["text"])
</script>
<template>
    <div>
        <IconAlertVue></IconAlertVue>
        <p>{{ prop.text }}</p>
    </div>
</template>
<style lang='scss' scoped>
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