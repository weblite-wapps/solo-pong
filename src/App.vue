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
  // helper
  import { addToLeaderboard } from './helper/function/changeState'
  import webliteHandler from './helper/function/weblite.api'
  // W
  const { W } = window


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
        playerName: '',
        leaderBoard: [],
        box: { width: 350, height: 450 },
      }
    },

    created() { W && webliteHandler(this) },

    methods: {
      setPage(page) { this.page = page },

      setFinishPage(event) {
        this.setPage('finish')
        this.score = event
      },

      postToleaderBoardClicked(event) {
        if(event > 0) { addToLeaderboard(this.playerName, event) }
        this.setPage('home')
      },
    }

  }

</script>

<style module>
  .root {
    border: 1px #E0E0E0 solid;
  }
</style>
