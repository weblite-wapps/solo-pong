<template>
  <div
    :class="$style.root"
    :style="{width: box.width + 'px', height: box.height + 'px'}"
    >
    <homePage
      v-if="page === 'home'"
      :leaderBoard="leaderBoard"
      @pageClicked="setPage"
    />

    <gamePage
      v-if="page === 'game'"
      :highScore="leaderBoard[0] ? leaderBoard[0].score : 0"
      @gameFinished="setFinishPage"
      :box="box"
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
        leaderBoard: [],
        box: {
          width: 400,
          height: 500
        }
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
    border: 1px #E0E0E0 solid;
  }
</style>
