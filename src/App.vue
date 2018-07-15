<template>
  <div :class="$style.root">
    <homePage
      v-if="homepageShow"
      :leaderBoard="leaderBoard"
      @gamePageClicked="setGamePage"
    />

    <gamePage
      v-if="gamePageShow"
      :highScore="leaderBoard[0].score"
      @gameFinished="setFinishPage"
    />

    <finishPage
      v-if="finishPageShow"
      :score="score"
      :player="playerName"
      @gamePageClicked="setGamePage"
      @postToleaderBoardClicked="postToleaderBoardClicked"
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
        leaderBoard: [
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

      postToleaderBoardClicked(event) {
        this.leaderBoard.push({ name:this.playerName, score: event })
        this.leaderBoard.sort(this.compare)
        if(this.leaderBoard.length == 5) { this.leaderBoard.pop() }
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
