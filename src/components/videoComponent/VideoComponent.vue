<template>
  <div class="flex-container" v-if="queue.length>0">
    <div>
      <YoutubeIframe />
    </div>
  </div>
</template>
<script>
import { mapGetters } from "vuex";
import YoutubeIframe from "@/components/youtubeIframe/YoutubeIframe";
export default {
  name: "VideoComponent",
  computed: mapGetters({
    queue: "getQueue"
  }),
  components: {
    YoutubeIframe
  }
};
</script>
<style lang="scss" scoped>
.flex-container {
  display: flex;
  justify-content: center;
  align-items: center;
  margin: 100px auto;
}
</style>