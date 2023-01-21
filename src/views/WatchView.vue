<script setup lang="ts">
import { useRoute } from "vue-router";
import { useMiruExpandStore } from "@/stores/expand";
import { onMounted, ref } from "vue";
import IconLoveVue from "@/components/icons/IconLove.vue";
import IconUrlVue from "@/components/icons/IconUrl.vue";
import { useLoveStore } from "@/stores/love";
import Player from "@/components/Player.vue";

const love = useLoveStore();
const pkg = String(useRoute().query.p);
const expand = useMiruExpandStore().expandManage.getExpand(pkg);
const data = ref();
const url = String(useRoute().query.u);
const playurl = ref();
const bangumi = ref({});
const watchData = ref();

onMounted(async () => {
  data.value = await expand.info(url);
  console.log(data.value);
  bangumi.value = {
    pkg,
    url,
    cover: data.value.cover,
    title: data.value.title,
  };
});

const play = async (url: string) => {
  window.scrollTo({
    top: 0,
    left: 0,
    behavior: "smooth",
  });
  watchData.value = await expand.watch(url);
};

const jump = (url: string) => {
  window.open(url);
};
</script>
<template>
  <main>
    <div v-if="!expand">丢失扩展 "{{ useRoute().query.p }}"</div>
    <div v-else-if="data">
      <Player class="player" v-if="watchData" :options="watchData" />
      <div class="info">
        <div><img :src="data.cover" /></div>
        <div class="desc">
          <div class="title">
            {{ data.title }}
          </div>
          <div class="desc-text">{{ data.desc }}</div>
          <div>
            <button @click="love.loveOrUnLove(bangumi)">
              <IconLoveVue :fill="love.exist(bangumi)"> </IconLoveVue>
            </button>
            <button @click="jump(expand.url + url)">
              <IconUrlVue></IconUrlVue>
            </button>
          </div>
        </div>
      </div>
      <div class="watchurl">
        <div v-for="(v, k) in data.watchurl" :key="k">
          <h2>{{ v[0] }}</h2>
          <div class="urls">
            <ul>
              <li v-for="(vi, ki) in v[1]" :class="{ activate: playurl == vi.url }" :key="ki"
                @click="(playurl = vi.url) && play(vi.url)">
                {{ vi.name }}
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
    <div v-else>加载中...</div>
  </main>
</template>
<style lang="scss" scoped>
.player {
  margin-bottom: 20px;
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

  button {
    padding: 0;
    border: unset;
    margin-top: 20px;
    margin-right: 8px;
    height: 50px;
    width: 50px;
    border-radius: 100%;
    background-color: rgb(255, 233, 233);
    // background-color: unset;
    cursor: pointer;

    &:hover {
      background-color: rgb(255, 233, 233);
    }

    svg {
      fill: rgb(246, 0, 78);
      height: 30px;
      width: 30px;
    }
  }
}

.watchurl {
  margin-top: 50px;
}

.urls {
  max-height: 300px;
  overflow: auto;

  ul {
    list-style-type: none;
    padding: 0;
    margin: 0;

    li {
      display: inline-block;
      margin-right: 10px;
      margin-bottom: 10px;
      color: #000;
      padding: 5px 10px;
      background-color: #e5e5e5;
      text-decoration: none;
      border-radius: 10px;
      cursor: pointer;

      &.activate {
        background-color: rgb(255, 219, 219);
        color: rgb(246, 0, 78);
      }
    }
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
