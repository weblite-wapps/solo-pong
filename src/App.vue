<template>
  <div :class="$style.root">
    <homePage
      v-if="homepageShow"
      :liderBoard="liderBoard"
      @gamePageClicked="setGamePage"
    />

    <gamePage
      v-if="gamePageShow"
      :highScore="liderBoard[0].score"
      @gameFinished="setFinishPage"
    />

    <finishPage
      v-if="finishPageShow"
      :score="score"
      :player="playerName"
      @gamePageClicked="setGamePage"
      @postToLiderboardClicked="postToLiderboardClicked"
      @homePageClicked="setHomePage"
    />
  </div>
</template>

<script>

  import homePage from "./components/homePage.vue"
  import finishPage from "./components/finishPage.vue"
  import gamePage from "./components/gamePage.vue"

  export default {
    name: 'App',

    components: {
      homePage,
      finishPage,
      gamePage,
    },

    data(){
      return {
        homepageShow: true,
        gamePageShow: false,
        finishPageShow: false,
        liderBoard: [
          { name:'hosein', score: 103 },
          { name:'Ali', score: 99 },
          { name:'mmd', score: 99 },
        ],
        playerId: '',
        playerName: 'hosein',
        score: 0,
      }
    },

    methods: {
      setGamePage(){
        this.homepageShow = false
        this.gamePageShow = true
        this.finishPageShow = false
      },

      setFinishPage(event) {
        this.gamePageShow = false
        this.finishPageShow = true
        this.score = event
      },

      setHomePage() {
        this.homepageShow = true
        this.gamePageShow = false
        this.finishPageShow = false
      },

      postToLiderboardClicked(event) {
        this.liderBoard.push({ name:this.playerName, score: event })
        this.liderBoard.sort(this.compare)
        if(this.liderBoard.length == 5) { this.liderBoard.pop() }
        this.setHomePage()
      },

      compare(a, b) { return (a.score > b.score) ? -1 : (b.score > a.score) ? 1 : 0}
    }

  }

</script>

<style module>
  .root {
    width: 400px;
    height: 500px;
    border: 1px #E0E0E0 solid;
  }

</style>
