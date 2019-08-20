<template>
  <main class="home">
    <section class="main-section">
      <InputComponent />
      <VideoComponent />
    </section>
    <aside class="aside-section">
      <UrlQueue />
    </aside>
  </main>
</template>

<script>
import InputComponent from "@/components/inputComponent/InputComponent.vue";
import UrlQueue from "@/components/urlQueue/UrlQueue.vue";
import VideoComponent from "@/components/videoComponent/VideoComponent";
export default {
  name: "home",
  components: { InputComponent, UrlQueue, VideoComponent }
};
</script>

<style lang="scss" scoped>
.home {
  display: flex;
  justify-content: space-evenly;
  .main-section {
    box-sizing: border-box;
    width: 70%;
  }
  .aside-section {
    width: 30%;
    box-sizing: border-box;
    height: 100%;
    min-height: 100vh;
    box-shadow: 0 1px 31px 0 rgba(255, 255, 255, 0.14);
  }
}
</style>
