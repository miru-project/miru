<script setup lang="ts">
import { RouterLink, RouterView } from "vue-router";
import IconLoveVue from "@/components/icons/IconLove.vue";
import IconSearchVue from "@/components/icons/IconSearch.vue";
import IconExtensionVue from "@/components/icons/IconExtension.vue";
import IconSettingsVue from "@/components/icons/IconSettings.vue";
import { useMiruExtensionStore } from "./stores/extension";
import { ref, onMounted } from "vue";
import IconMenu from "./components/icons/IconMenu.vue";
import IconTips from "./components/IconTips.vue";
const showSidebar = ref(false);
const extensionStore = useMiruExtensionStore()
onMounted(() => {
  extensionStore.initExtensions();
});
</script>

<template>
  <nav :class="{ sidebar: true, showSidebar }" @click="showSidebar = false">
    <div class="logo"><img src="/logo.svg" /></div>
    <ul>
      <RouterLink to="/">
        <li class="love">
          <span class="icon">
            <IconLoveVue />
          </span>收藏
        </li>
      </RouterLink>
      <RouterLink to="/search">
        <li class="search">
          <span class="icon search">
            <IconSearchVue />
          </span>搜索
        </li>
      </RouterLink>
      <RouterLink to="/extension">
        <li class="extension">
          <span class="icon extension">
            <IconExtensionVue />
          </span>扩展
        </li>
      </RouterLink>
      <RouterLink to="/settings">
        <li class="settings">
          <span class="icon settings">
            <IconSettingsVue />
          </span>设置
        </li>
      </RouterLink>
    </ul>
  </nav>
  <nav class="mobile">
    <div class="logo" @click="$router.push('/')"><img src="/logo.svg" /></div>
    <div @click="showSidebar = !showSidebar">
      <IconMenu></IconMenu>
    </div>
  </nav>
  <div class="content">
    <div v-if="extensionStore.installComplete">
      <RouterView v-slot="{ Component }">
        <transition name="slide-fade">
          <KeepAlive exclude="WatchView,ExtensionView,SettingsView">
            <component :is="Component" />
          </KeepAlive>
        </transition>
      </RouterView>
    </div>
    <div class="init-Extension" v-else>
      <IconTips text="准备中"></IconTips>
    </div>
  </div>
</template>

<style scoped lang="scss">
.content {
  margin-left: 230px;
  padding: 30px 80px 0;
  max-width: 1300px;
}

.init-Extension {
  margin-top: 300px;
}

.slide-fade-enter-active {
  transition: all 0.3s ease-out;
}

.slide-fade-enter-from,
.slide-fade-leave-to {
  transform: translateY(20px);
  opacity: 0;
}

.logo {
  font-size: 35px;
  font-weight: 900;

  img {
    width: 100%;
    max-width: 5rem;
    border-radius: 0;
  }
}

.mobile {
  width: 100%;
  height: 60px;
  padding-left: 20px;
  padding-right: 20px;
  z-index: 20;
  position: sticky;
  top: 0;
  background-color: rgba(238, 238, 238, 0.51);
  backdrop-filter: blur(15px);
  display: flex;
  justify-content: space-between;
  align-items: center;

  svg {
    width: 30px;
    height: 30px;
  }
}

.sidebar {
  width: 230px;
  height: 100vh;
  padding: 20px;
  box-shadow: 1px 1px 1px rgb(212, 212, 212);
  position: fixed;
  left: 0;
  top: 0;
  overflow: auto;
  background-color: #fff;
  z-index: 30;
  transition: all 0.2s;

  .logo {
    margin-bottom: 10px;
    padding-left: 20px;
  }

  &.showSidebar {
    left: -0;
    width: 100%;
  }

  ul {
    padding: 0;

    a {
      text-decoration: none;
      color: unset;

      &.router-link-active {
        background-color: #000;

        .love {
          background-color: rgb(255, 219, 219);
          color: rgb(246, 0, 78);
        }

        .search {
          background-color: rgb(253, 248, 225);
          color: rgb(173, 138, 0);
        }

        .extension {
          background-color: rgb(255, 241, 225);
          color: rgb(246, 135, 0);
        }

        .settings {
          background-color: rgb(224, 225, 255);
          color: rgb(77, 80, 243);
        }
      }
    }

    li {
      list-style: none;
      margin-bottom: 8px;
      width: 100%;
      height: 60px;
      font-size: 20px;
      display: flex;
      align-items: center;
      padding-left: 20px;
      border-radius: 20px;
      cursor: pointer;

      .icon {
        width: 25px;
        height: 25px;
        margin-right: 8px;
      }

      &.love {
        svg {
          fill: rgb(246, 0, 78);
        }

        &:hover {
          background-color: rgb(255, 219, 219);
          color: rgb(246, 0, 78);
        }
      }

      &.search {
        svg {
          fill: rgb(173, 138, 0);
        }

        &:hover {
          background-color: rgb(253, 248, 225);
          color: rgb(173, 138, 0);
        }
      }

      &.extension {
        svg {
          fill: rgb(246, 135, 0);
        }

        &:hover {
          background-color: rgb(255, 241, 225);
          color: rgb(246, 135, 0);
        }
      }

      &.settings {
        svg {
          fill: rgb(77, 80, 243);
        }

        &:hover {
          background-color: rgb(224, 225, 255);
          color: rgb(77, 80, 243);
        }
      }
    }
  }
}

@media screen and (min-width: 1024px) {
  .mobile {
    display: none;
  }
}

@media screen and (max-width: 1024px) {
  .sidebar {
    left: -240px;
  }

  .content {
    margin-left: 0;
    padding: 20px;
  }
}
</style>
