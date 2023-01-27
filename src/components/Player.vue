<script setup lang="ts">
import { onMounted, onUnmounted, watch, ref } from "vue";
import Artplayer from "artplayer";
import Hls from "hls.js/dist/hls.min";
import dashjs from "dashjs";

const props = defineProps(["options"]);
const artRef = ref<HTMLDivElement>();
let artPlayer: Artplayer;

watch(
  () => props.options,
  () => {
    play();
  }
);

const play = () => {
  if (artPlayer) {
    artPlayer.destroy(false);
  }
  if (props.options.type == "jump") {
    window.open(props.options.src, "_blank");
  }
  if (props.options.type == "player") {
    artPlayer = new Artplayer({
      container: artRef.value as HTMLDivElement,
      url: props.options.src,
      type: props.options.playerType ?? "hls",
      pip: true,
      autoMini: true,
      screenshot: true,
      setting: true,
      flip: true,
      playbackRate: true,
      aspectRatio: true,
      fullscreen: true,
      fullscreenWeb: true,
      subtitleOffset: true,
      miniProgressBar: true,
      mutex: true,
      backdrop: true,
      playsInline: true,
      autoPlayback: true,
      airplay: true,
      customType: {
        hls: (video, url, art) => {
          if (Hls.isSupported()) {
            const hls = new Hls();
            hls.loadSource(url);
            hls.attachMedia(video);

            art.once("url", () => hls.destroy());
            art.once("destroy", () => hls.destroy());
          } else if (video.canPlayType("application/vnd.apple.mpegurl")) {
            video.src = url;
          } else {
            art.notice.show = "Unsupported playback format: m3u8";
          }
        },
        dash: (video, url, art) => {
          if (dashjs.supportsMediaSource()) {
            const dash = dashjs.MediaPlayer().create();
            dash.initialize(video, url, art.option.autoplay);

            art.once("url", () => dash.destroy());
            art.once("destroy", () => dash.destroy());
          } else {
            art.notice.show = "Unsupported playback format: mpd";
          }
        },
      },
    });
  }
};
onMounted(() => {
  play();
});
onUnmounted(() => {
  if (artPlayer) {
    artPlayer.destroy();
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
      <div id="artPlayer" ref="artRef"></div>
    </div>
  </div>
</template>
<style lang="scss" scoped>
.iframe,
#artPlayer {
  max-height: 600px;
  height: 50vw;
}

@media screen and (max-width: 1024px) {
  .iframe,
  #artPlayer {
    margin: -20px -20px 0 -20px;
  }
}
</style>
