<script setup lang="ts">
import { ref } from "vue";
import request from "umi-request";
import IconDownload from "@/components/icons/IconDownload.vue";
import IconRemove from "@/components/icons/IconRemove.vue";
import { useMiruExtensionStore } from "@/stores/extension";
import { useSettingsStore } from "@/stores/settings";
import Loading from "@/components/Loading.vue";
import IconTips from "@/components/IconTips.vue";
const extensionStore = useMiruExtensionStore();
const settings = useSettingsStore();
const switchList = ref("installed");
const repo = ref();
const installedExtension = ref();
const installing = ref(false);
const loading = ref(false);
const repoLoadErrMsg = ref();

// 获取仓库扩展列表
const getRepo = async () => {
  loading.value = true;
  try {
    repo.value = await request.get(
      `${
        settings.getItem("MIRU_REPO_URL") ?? import.meta.env.MIRU_REPO_URL
      }/index.json`
    );
    loading.value = false;
  } catch (error) {
    console.log(error);
    repoLoadErrMsg.value = error;
  }
};
getRepo();

// 获取已经安装的扩展列表
const getInstalledExtension = async () => {
  installedExtension.value = extensionStore.listExtensions();
};
getInstalledExtension();

// 安装扩展
const install = async (v: any, filename: string) => {
  installing.value = true;
  const script = await request.get(
    `${
      settings.getItem("MIRU_REPO_URL") ?? import.meta.env.MIRU_REPO_URL
    }/repo/${filename}`
  );
  extensionStore.installExtension(script);
  installing.value = false;
  getRepo();
};

const uninstall = (pkg: string) => {
  extensionStore.uninstallExtension(pkg);
  getRepo();
};
</script>

<template>
  <main>
    <h1 class="page-title">扩展</h1>
    <div class="selector">
      <button
        @click="(switchList = 'installed') && getInstalledExtension()"
        :class="{ activit: switchList == 'installed' }"
      >
        已装载
      </button>
      <button
        @click="(switchList = 'repo') && getRepo()"
        :class="{ activit: switchList == 'repo' }"
      >
        仓库
      </button>
    </div>
    <div class="lists" v-if="switchList == 'repo'">
      <div v-for="(v, k) in repo" :key="k">
        <div class="Extension">
          <div class="icon" :style="`background-image:url(${v.icon})`"></div>
          <div class="info">
            <div>
              {{ v.name }} <span class="tag">{{ v.version }}</span>
            </div>
            <div class="desc">{{ v.package }}</div>
          </div>
          <div class="install">
            <button @click="install(v, v.url)" :disabled="installing">
              <IconDownload />{{ extensionStore.check(v) }}
            </button>
            <button
              class="uninstall"
              v-if="extensionStore.isInstall(v)"
              @click="uninstall(v.package)"
            >
              <IconRemove />
            </button>
          </div>
        </div>
      </div>
      <div v-if="loading">
        <IconTips :text="repoLoadErrMsg" v-if="repoLoadErrMsg"></IconTips>
        <Loading v-else></Loading>
      </div>
    </div>
    <div class="lists" v-if="switchList == 'installed'">
      <div v-if="installedExtension.size">
        <div v-for="(v, k) in installedExtension" :key="k">
          <div class="Extension">
            <div
              class="icon"
              :style="`background-image:url(${v[1].icon})`"
            ></div>
            <div class="info">
              <div>
                {{ v[1].name }} <span class="tag">{{ v[1].version }}</span>
                <span
                  class="tag"
                  v-if="!extensionStore.extensionManage.isLoad(v[1].package)"
                  >安装错误</span
                >
              </div>
              <div class="desc">{{ v[1].package }}</div>
            </div>
            <div class="install" @click="getInstalledExtension">
              <button
                class="uninstall"
                v-if="extensionStore.isInstall(v[1])"
                @click="extensionStore.uninstallExtension(v[1].package)"
              >
                <IconRemove />
              </button>
            </div>
          </div>
        </div>
      </div>
      <div v-else>
        <IconTips text="暂无扩展" icon="info"></IconTips>
      </div>
    </div>
  </main>
</template>
<style lang="scss" scoped>
.Extension {
  display: flex;
  padding: 20px;
  background-color: rgb(242, 242, 242);
  border-radius: 10px;
  margin-bottom: 8px;

  .icon {
    width: 80px;
    background-position: center;
    background-size: contain;
    background-repeat: no-repeat;
    margin-right: 20px;
  }

  .info {
    width: 100%;

    .desc {
      margin-top: 8px;
      font-size: 13px;
      text-overflow: ellipsis;
      overflow: hidden;
    }
  }

  .install {
    display: flex;
    justify-content: flex-end;
    align-items: flex-end;
    margin-top: 18px;
    width: 300px;

    button {
      border: unset;
      padding: 10px 20px;
      border-radius: 10px;
      background-color: rgb(255, 219, 176);
      color: rgb(246, 135, 0);
      cursor: pointer;
      display: flex;
      font-weight: 800;

      svg {
        width: 20px;
        height: 20px;
        fill: rgb(246, 135, 0);
      }

      &.uninstall {
        color: rgb(255, 53, 84);
        background-color: rgb(252, 193, 202);

        svg {
          fill: rgb(255, 30, 64);
        }
      }

      margin-right: 8px;
    }
  }

  .tag {
    background-color: rgb(255, 55, 69);
    color: #fff;
    padding: 0px 10px;
    font-size: 13px;
    border-radius: 10px;
    margin-right: 8px;
  }
}

@media screen and (max-width: 1024px) {
  .Extension {
    .icon {
      display: none;
    }

    .install {
      button {
        padding: 5px 10px;
        font-size: 14px;
      }
    }
  }
}
</style>
