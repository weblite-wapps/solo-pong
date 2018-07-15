<template>
  <div class="finishRoot">
    <!-- game score -->
    <div class="gameInfo">
      <p> GAME OVER !! </P>
      <P> SCORE : {{score}}</P>
    </div>

    <!-- post to leaderBoard -->
    <button
      type="button"
      name="button"
      class="postToleaderBoard"
      @click="postToleaderBoardClicked"
    >
      post to leaderBoard
    </button>

    <!-- replay button -->
    <div class="logos">
      <costomButton
        @click="pageClicked('game')"
        type="replay"
      />

      <!-- home button -->
      <costomButton
        class="logo"
        type="home"
        @click="pageClicked('home')"
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
      pageClicked(page) { this.$emit('pageClicked', page) },

      postToleaderBoardClicked() { this.$emit('postToleaderBoardClicked', this.score) },
    }
  }

</script>

<style scoped>
  .finishRoot {
    height: inherit;
    background-color: rgb(255, 253, 244);
    box-sizing: border-box;
    padding-top: 50px;
    display: flex;
    flex-direction: column;
    align-items: center;
  }

  .logos {
    display: flex;
    flex-wrap: nowrap;
  }

  .logo {
    margin-left: 20px;
  }

  .gameInfo {
    width: 50%;
    height: 40%;
    background-color: rgb(243, 247, 224);
    margin-bottom: 10px;
    border-radius: 3px;
    box-sizing: border-box;
    text-align: center;
    line-height: 40px;
    padding-top: 35px;
  }

  .postToleaderBoard {
    width: 50%;
    margin-bottom: 10px;
    height: 30px;
    background: white;
    outline: none;
    border: 1px #E0E0E0 solid;
    border-radius: 5px;
  }

  .postToleaderBoard:hover {
    box-shadow: 0 0 5px #E0E0E0;
  }
</style>
