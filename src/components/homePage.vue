<template>
  <div class="homeRoot">
    <div class="leaderBoardPlace">
      <ul>
        <li v-for="(lider, index) in leaderBoard" :key="index">
            {{ lider.name + "  " + lider.score }}
        </li>
      </ul>
    </div>
    <!-- home button -->
    <costomButton
      @click="pageClicked"
      type="play"
      />
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
      leaderBoard: {
        type: Array
      },
      pageStage: {
        type: Object
      },
    },

    methods: {
      pageClicked(){ this.$emit('pageClicked', 'game') },
    }
  }

</script>

<style scoped>
  .homeRoot {
    height: inherit;
    box-sizing: border-box;
    padding-top: 50px;
    display: flex;
    flex-direction: column;
    align-items: center;
    background-color: rgb(249, 249, 249);
    padding-bottom: 10px;
  }

  .leaderBoardPlace {
    width: 80%;
    height: 70%;
    background-color: rgb(190, 190, 203);
    margin: auto;
    border-radius: 3px;
    margin-bottom: 20px;
    margin-top: 0;
    overflow: auto;
  }

  li {
    list-style: none;
    padding-top: 10px;
    font-size: 18px;
    text-align: center;
  }

  ul {
    -webkit-padding-start: 0;
    padding-top: 20px;
  }
</style>
