<script setup lang="ts">
import { useRoute } from "vue-router";
import { useMiruExtensionStore } from "@/stores/extension";
import { onMounted, ref } from "vue";
import IconLoveVue from "@/components/icons/IconLove.vue";
import IconUrlVue from "@/components/icons/IconUrl.vue";
import { useLoveStore } from "@/stores/love";
import Player from "@/components/Player.vue";
import Loading from "@/components/Loading.vue";
import AlertVue from "@/components/IconTips.vue";
import IconTips from "@/components/IconTips.vue";
import { useProgressStore } from "@/stores/progress";
import Episodes from "@/components/Episodes.vue";

const love = useLoveStore();
const pkg = String(useRoute().query.p);
const extension = useMiruExtensionStore().extensionManage.getExtension(pkg);
const data = ref();
const url = String(useRoute().query.u);
const playurl = ref();
const bangumi = ref({});
const watchData = ref();
const errMsg = ref();
const progress = useProgressStore();
const watchProgress = progress.getProgress(pkg, url);

onMounted(async () => {
  try {
    data.value = await extension.info(url);
    if (watchProgress) {
      play(watchProgress.watchUrl, undefined, undefined);
    }
  } catch (error) {
    errMsg.value = error;
  }
  bangumi.value = {
    pkg,
    url,
    cover: data.value.cover,
    title: data.value.title,
  };
});

const play = async (
  watchUrl: string,
  watchName: string | undefined,
  watchGroupName: string | undefined
) => {
  playurl.value = watchUrl;
  window.scrollTo({
    top: 0,
    left: 0,
    behavior: "smooth",
  });
  watchData.value = await extension.watch(watchUrl);
  console.log(watchName);
  progress.setProgress({
    pkg,
    url,
    watchUrl,
    watchName,
    watchGroupName,
  });
};

const jump = (url: string) => {
  window.open(url);
};
</script>
<template>
  <main>
    <div class="full-screen-center" v-if="!extension">
      <IconTips
        :text="`丢失扩展 ${useRoute().query.p} 请检查扩展是否已经安装`"
      ></IconTips>
    </div>
    <div v-else-if="data">
      <Player class="player" v-if="watchData" :options="watchData" />
      <div class="info">
        <div><img :src="data.cover" /></div>
        <div class="desc">
          <div class="title">
            {{ data.title }}
          </div>
          <div class="desc-text">{{ data.desc }}</div>
          <div class="botton-group">
            <button @click="love.loveOrUnLove(bangumi)">
              <IconLoveVue :fill="love.exist(bangumi)"> </IconLoveVue>
            </button>
            <button @click="jump(extension.url + url)">
              <IconUrlVue></IconUrlVue>
            </button>
          </div>
        </div>
      </div>
      <div class="watchurl">
        <h2>选集</h2>
        <Episodes
          :data="data.watchurl"
          @play="play"
          :first-key="watchProgress?.watchGroupName"
          :first-url="watchProgress?.watchUrl"
        ></Episodes>
      </div>
    </div>
    <div v-else class="tips">
      <Loading v-if="!errMsg" text="加载中..."></Loading>
      <AlertVue v-else :text="errMsg"></AlertVue>
    </div>
  </main>
</template>
<style lang="scss" scoped>
.player {
  margin-bottom: 20px;
}

.tips {
  display: flex;
  height: var(--fullHeightScreen);
  justify-content: center;
  align-items: center;
}

.info {
  display: flex;

  img {
    margin-right: 20px;
    max-width: unset;
    max-width: 200px;
  }

  .title {
    font-size: 2em;
    margin-bottom: 8px;
  }

  .desc {
    display: flex;
    flex-direction: column;
    justify-content: flex-end;
  }

  .desc-text {
    max-height: 150px;
    overflow: auto;
    word-break: break-all;
  }

  .botton-group {
    display: flex;
  }

  button {
    padding: 0;
    border: unset;
    margin-top: 20px;
    margin-right: 8px;
    height: 50px;
    width: 50px;
    border-radius: 100%;
    background-color: rgb(255, 233, 233);
    cursor: pointer;
    display: flex;
    justify-content: center;
    align-items: center;

    svg {
      fill: rgb(246, 0, 78);
      height: 30px;
      width: 30px;
    }
  }
}

.watchurl {
  margin-top: 16px;
  h2 {
    font-weight: 400;
  }
}

@media screen and (max-width: 1024px) {
  .info {
    img {
      display: none;
    }

    .title {
      font-size: 1.5em;
      margin-bottom: 8px;
    }
  }
}
</style>
