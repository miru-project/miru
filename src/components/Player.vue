<script setup lang="ts">
import DPlayer from "dplayer";
import { onMounted, onUnmounted, watch } from "vue";
import Hls from "hls.js/dist/hls.min";
import dashjs from "dashjs";

const props = defineProps(["options"]);
let dplay: DPlayer;

watch(
  () => props.options,
  () => {
    play();
  }
);

const play = () => {
  if (dplay) {
    dplay.destroy;
  }
  if (props.options.type == "jump") {
    window.open(props.options.src, "_blank");
  }
  if (props.options.type == "player") {
    dplay = new DPlayer({
      container: document.querySelector("#dplayer"),
      video: {
        url: props.options.src,
        type: props.options.playerType ?? "hls",
        customType: {
          hls: (video: HTMLVideoElement, player: any) => {
            const hls = new Hls();
            hls.loadSource(video.src);
            hls.attachMedia(video);
          },
          dash: function (video: HTMLVideoElement, player: any) {
            dashjs.MediaPlayer().create().initialize(video, video.src, false);
          },
        },
      },
    });
  }
};
onMounted(() => {
  play();
});
onUnmounted(() => {
  if (dplay) {
    dplay.destroy;
  }
});
</script>
<template>
  <div class="player">
    <div v-if="props.options.type == 'iframe'">
      <iframe
        referrerpolicy="no-referrer"
        :src="props.options.src"
        height="100%"
        width="100%"
        class="iframe"
        scrolling="no"
        allowfullscreen="true"
        allowtransparency="true"
        frameborder="no"
        border="0"
        marginwidth="0"
        marginheight="0"
      ></iframe>
    </div>
    <div v-if="props.options.type == 'player'">
      <div id="dplayer"></div>
    </div>
  </div>
</template>
<style lang="scss" scoped>
.iframe {
  max-height: 600px;
  height: 50vw;
}
</style>
