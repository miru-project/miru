<script setup lang="ts">
import IconLove from "./icons/IconLove.vue";
import IconRefresh from "./icons/IconRefresh.vue";
import { useLoveStore } from "@/stores/love";
const prop = defineProps(["list", "loading", "nodata"]);
const love = useLoveStore();
</script>
<template>
  <div>
    <div class="grid">
      <div
        v-if="prop.list && prop.list.length"
        v-for="(v, k) in prop.list"
        :key="k"
      >
        <div class="img">
          <RouterLink :to="`/watch?p=${v.pkg}&u=${v.url}`">
            <img referrerpolicy="no-referrer" :src="v.cover" />
          </RouterLink>
          <div class="love">
            <IconLove
              @click="love.loveOrUnLove(v)"
              :fill="love.exist(v)"
            ></IconLove>
          </div>
        </div>
        <p>{{ v.title }}</p>
      </div>
    </div>
    <div class="loading" v-if="prop.loading">
      <IconRefresh></IconRefresh>
    </div>
    <div v-if="nodata">
      <p>没有记录力~</p>
    </div>
  </div>
</template>
<style lang="scss" scoped>
.loading {
  height: 100px;
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;

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

.grid {
  display: grid;
  grid-template-columns: repeat(5, 1fr);
  gap: 10px;

  a {
    text-decoration: unset;
    color: #000;
  }

  & > div {
    transition: all 0.1s;

    img {
      background-color: rgb(242, 242, 242);
      height: 100%;
      width: 100%;
      object-fit: cover;
      max-width: unset;
    }

    .img {
      height: 18vw;
      position: relative;
      overflow: hidden;

      .love {
        position: absolute;
        bottom: 0;
        right: 0;
        left: 0;
        padding: 5px;
        background: linear-gradient(#fff0, #000000ad);
        cursor: pointer;
        display: flex;
        justify-content: right;
        border-radius: 8px;

        svg {
          fill: rgba(255, 100, 100, 0.499);
          width: 30px;
        }
      }
    }

    &:hover {
      opacity: 0.8;
    }
  }
}

@media screen and (max-width: 1440px) {
  .grid {
    grid-template-columns: repeat(4, 1fr);

    & > div {
      .img {
        height: 22vw;
      }
    }
  }
}

@media screen and (max-width: 1024px) {
  .grid {
    grid-template-columns: repeat(3, 1fr);

    & > div {
      .img {
        height: 44vw;
      }
    }
  }
}

@media screen and (max-width: 600px) {
  .grid {
    grid-template-columns: repeat(2, 1fr);

    & > div {
      .img {
        height: 55vw;
      }
    }
  }
}
</style>
