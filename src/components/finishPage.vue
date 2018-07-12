<template>
  <div :class="$style['finishRoot']">
    <p :class="$style.fake">.</p>
    <!-- game score -->
    <div :class="$style['gameInfo']">
      <p :class="$style.pTag"> GAME OVER !! </P>
      <P :class="$style.pTag"> SCORE : {{score}}</P>
    </div>
    <!-- post to liderBoard -->
    <button type="button" name="button"  :class="$style.postToLiderboard"@click="postToLiderboardClicked">post to liderboard</button>
    <!-- replay button -->
    <div :class="$style.logo">
      <costomButton
        :class="$style['startLogo']"
        @click="gamePageClicked"
        type="replay"
        />
      <!-- home button -->
      <costomButton
        :class="$style['homeLogo']"
        @click="homeButtonClicked"
        type="home"
        />
    </div>
  </div>
</template>

<script>

  import costomButton from "./../helper/components/costomButton.vue"

  export default {
    name: 'finishPage',

    components: {
      costomButton,
    },

    props: {
      score: {
        type: Number
      }
    },

    methods: {
      gamePageClicked(){
        this.$emit('gamePageClicked')
      },

      postToLiderboardClicked(){
        this.$emit('postToLiderboardClicked', this.score)
      },

      homeButtonClicked() {
        console.log("asdfasdfsadfasdf");
        this.$emit('homePageClicked')
      }
    }
  }

</script>

<style module>
  .finishRoot {
    width: inherit;
    height: inherit;
    background-color: rgb(255, 253, 244);
  }

  .logo {
    margin-left: 120px;
    display: flex;
    flex-wrap: nowrap;
  }

  .homeLogo {
    margin-left: 20px;
  }

  .startLogo {
    margin-left: 20px;
  }

  .fake {
    font-size: 0;
  }

  .pTag {
    text-align: center;
    margin-top: 10px;
    padding-top: 20px
  }

  .gameInfo {
    width: 50%;
    height: 30%;
    background-color: rgb(243, 247, 224);
    margin:50px auto;
    margin-bottom: 10px;
    border-radius: 3px
  }

  .postToLiderboard {
    width: 50%;
    margin-left: 100px;
    margin-bottom: 10px;
  }

  .postToLiderboard:hover{
    box-shadow: 0 0 5px #333;
  }
</style>
