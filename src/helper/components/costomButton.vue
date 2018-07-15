<template>
  <div >
    <img
      :class="button.class"
      :src="button.src"
      @click="clicked"
      alt="logo"
    >
  </div>
</template>

<script>
  import bus from "./../function/bus.js"

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

    computed: {
      button() {
        const buttonObj = {
          'home': { src: './../../assets/images/home.png', class: 'logo' },
          'play': { src: './../../assets/images/play.png', class: 'logo' },
          'replay': { src: './../../assets/images/replay.png', class: 'logo' },
          'pause': { src: './../../assets/images/pause.png', class: 'pauseLogo' },
        }

        return buttonObj[this.type]
      }
    }
  }

</script>

<style scoped>
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
