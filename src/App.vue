<template>
  <div :class="$style.root">
    <homePage
      v-if="page === 'home'"
      :leaderBoard="leaderBoard"
      @pageClicked="setPage"
    />

    <gamePage
      v-if="page === 'game'"
      :highScore="leaderBoard[0] ? leaderBoard[0].score : 0"
      @gameFinished="setFinishPage"
    />

    <finishPage
      v-if="page === 'finish'"
      :score="score"
      :player="playerName"
      @postToleaderBoardClicked="postToleaderBoardClicked"
      @pageClicked="setPage"
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
        page: 'home',
        score: 0,
        playerName: 'hosein',
        leaderBoard: [
          { name:'hosein', score: 103 },
          { name:'Ali', score: 99 },
          { name:'mmd', score: 99 },
        ],
      }
    },

    methods: {
      setPage(page) { this.page = page },

      setFinishPage(event) {
        this.setPage('finish')
        this.score = event
      },

      postToleaderBoardClicked(event) {
        this.leaderBoard.push({ name:this.playerName, score: event })
        this.leaderBoard.sort(this.compare)
        if(this.leaderBoard.length == 5) { this.leaderBoard.pop() }
        this.setPage('home')
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
