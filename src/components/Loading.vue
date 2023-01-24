<script setup lang='ts'>
import IconRefresh from "./icons/IconRefresh.vue";
const props = defineProps(["text"])

</script>
<template>
    <div class="loading">
        <IconRefresh></IconRefresh>
        <p>{{ props.text }}</p>
    </div>
</template>
<style lang='scss' scoped>
.loading {
    text-align: center;

    p {
        margin: 0;
    }

    svg {
        width: 50px;
        height: 50px;
        animation: rotate 1s infinite;
    }
}

@keyframes rotate {
    from {
        transform: rotate(0deg);
    }

    to {
        transform: rotate(360deg);
    }
}
</style>