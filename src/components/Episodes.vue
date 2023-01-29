<template>
  <div>
    <div class="content">
      <div class="switch">
        <button @click="checkout(v[0])" :class="{ activit: v[0] == seleteedUrlGroup }" v-for="(v, k) in prop.data"
          :key="k">
          {{ v[0] }}
        </button>
      </div>
    </div>
    <div class="urls">
      <ul>
        <li v-for="(v, k) in prop.data.get(seleteedUrlGroup)" :class="{ activate: playurl == v.url }"
          @click="play(v.url, v.name, seleteedUrlGroup)" :key="k">
          {{ v.name }}
        </li>
      </ul>
    </div>
  </div>
</template>
<script setup lang="ts">
import { ref, onMounted } from "vue";

const prop = defineProps({
  data: {
    type: Map<string, Array<{ name: string; url: string }>>,
    default: null,
  },
  firstKey: {
    type: String,
    default: "",
  },
  firstUrl: {
    type: String,
    default: "",
  },
});
const playurl = ref(prop.firstUrl);

const seleteedUrlGroup = ref<string>("");

onMounted(() => {
  if (prop.firstKey) {
    seleteedUrlGroup.value = prop.firstKey;
    return;
  }
  seleteedUrlGroup.value = prop.data.keys().next().value
});

const checkout = (groupName: string) => {
  seleteedUrlGroup.value = groupName;
};
const emit = defineEmits<{
  (event: "play", url: string, name: string, groupName: string): void;
}>();

const play = (url: string, name: string, groupName: string) => {
  playurl.value = url;
  console.log(url, name, groupName);
  emit("play", url, name, groupName);
};
</script>
<style lang="scss" scoped>
// .header {
//     display: flex;
//     margin-bottom: 16px;
//     align-items: center;

//     &>div {
//         margin-right: 16px;
//     }

//     .title {
//         font-size: 18px;
//     }

//     select {
//         border: solid 1px rgb(146, 146, 146);
//         border-radius: 15px;
//         padding: 6px;
//         cursor: pointer;
//     }

// }

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
</style>
