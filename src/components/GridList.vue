<script setup lang="ts">
import IconLove from "./icons/IconLove.vue";
import { useLoveStore } from "@/stores/love";
import LoadingVue from "./Loading.vue";
import IconTips from "./IconTips.vue";
import { useProgressStore } from "@/stores/progress";
import { useMiruExtensionStore } from "@/stores/extension";
import { watch, ref } from "vue";

const prop = defineProps(["list", "loading", "nodata", "error-msg"]);
const love = useLoveStore();
const progress = useProgressStore();
const extension = useMiruExtensionStore();
const updateMsgs = ref<Map<string, string>>(new Map());

watch(
  () => prop.list,
  () => {
    getUpdate();
  }
);

const getUpdate = () => {
  if (prop.list) {
    prop.list.forEach(
      async (e: { pkg: string; url: string; update: string }) => {
        if (!e.update) {
          const res = await extension.extensionManage
            .getExtension(e.pkg)
            .checkUpdate(e.url);
          updateMsgs.value.set(e.url, res);
        }
      }
    );
  }
};
getUpdate();
</script>
<template>
  <div>
    <div class="grid" v-if="prop.list && prop.list.length">
      <div v-for="(v, k) in prop.list" :key="k">
        <div class="img">
          <RouterLink :to="`/watch?p=${v.pkg}&u=${v.url}`">
            <img referrerpolicy="no-referrer" :src="v.cover" />
          </RouterLink>
          <div class="love">
            <IconLove
              @click="
                love.loveOrUnLove({
                  pkg: v.pkg,
                  url: v.url,
                  cover: v.cover,
                  title: v.title,
                })
              "
              :fill="love.exist(v)"
            ></IconLove>
          </div>
        </div>
        <p class="title">{{ v.title }}</p>
        <p class="subtitle">
          <span>
            {{
              progress.getProgress(v.pkg, v.url)?.watchName
                ? `看到${progress.getProgress(v.pkg, v.url)?.watchName} `
                : " "
            }}
          </span>
          <span>
            {{ v.update ?? updateMsgs.get(v.url) }}
          </span>
        </p>
      </div>
    </div>
    <div v-if="prop.loading" style="margin-top: 100px; margin-bottom: 100px">
      <IconTips :text="prop['error-msg']" v-if="prop['error-msg']"></IconTips>
      <LoadingVue v-else></LoadingVue>
    </div>
    <div v-if="nodata">
      <p>没有记录力~</p>
    </div>
  </div>
</template>
<style lang="scss" scoped>
.title {
  margin-bottom: 0;
}

.subtitle {
  font-size: 12px;
  margin-top: 3px;
  color: hsl(0, 0%, 60%);
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
