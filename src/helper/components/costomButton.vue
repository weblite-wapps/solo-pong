<template>
  <div >
    <img
      v-if="homepageButtonShow"
      :class="$style['logo']"
      src="./../../assets/images/home.png"
      alt="logo"
      @click="clicked"
      >
    <img
      v-if="startButtonShow"
      :class="$style['logo']"
      src="./../../assets/images/play.png"
      alt="logo"
      @click="clicked"
      >
    <img
      v-if="retryButtonShow"
      :class="$style['logo']"
      src="./../../assets/images/replay.png"
      alt="logo"
      @click="clicked"
      >
    <img
      v-if="pauseButtonShow"
      :class="$style['pauseLogo']"
      src="./../../assets/images/pause.png"
      alt="logo"
      @click="clicked"
      >
  </div>
</template>

<script>

  import bus from "./../function/bus.js"

  export default {
    name: 'costomButton',

    props: {
      type: {
        type: String
      }
    },

    methods: {
      clicked(){
        this.$emit('click')
      }
    },

    computed: {
      homepageButtonShow() { return (this.type == "home") },

      startButtonShow(){ return (this.type == "start") },

      retryButtonShow(){ return (this.type == "replay") },

      pauseButtonShow(){ return (this.type == "pause") },
    }
  }

</script>

<style module>
  .logo {
    width: 40px;
    height: 40px;
    background-color: rgb(15, 180, 15);
    padding: 5px;
    border-radius: 5px;
  }

  .pauseLogo {
    width: 30px;
    height: 30px;
    background-color: rgb(235, 235, 235);
    padding: 4px;
    border-radius: 4px;
  }

  .logo:hover {
    box-shadow: 0 0 5px #333;
  }
</style>
