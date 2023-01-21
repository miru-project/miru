<script setup lang='ts'>
import IconRefresh from "./icons/IconRefresh.vue";

</script>
<template>
    <div class="loading">
        <IconRefresh></IconRefresh>
    </div>
</template>
<style lang='scss' scoped>
.loading {
    text-align: center;
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