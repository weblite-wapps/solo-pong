<template>
  <div >
    <img
      :class="this.type"
      :src="`/images/${this.type}.png`"
      @click="clicked"
      alt="logo"
    >
  </div>
</template>

<script>
  export default {
    name: 'costomButton',

    props: {
      type: {
        type: String,
      }
    },

    methods: {
      clicked() { this.$emit('click') },
    },
  }

</script>

<style scoped>
  .home, .play, .replay {
    width: 40px;
    height: 40px;
    background-color: rgb(15, 180, 15);
    padding: 5px;
    border-radius: 5px;
  }

  .pause {
    width: 30px;
    height: 30px;
    background-color: rgb(235, 235, 235);
    padding: 4px;
    border-radius: 4px;
  }

  .home:hover, .play:hover, .replay:hover, .pause:hover {
    box-shadow: 0 0 5px #333;
  }
</style>
