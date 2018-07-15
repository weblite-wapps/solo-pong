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
  }

  .leaderBoardPlace {
    width: 50%;
    height: 50%;
    background-color: rgb(190, 190, 203);
    margin:50px auto;
    border-radius: 3px
  }

  li {
    list-style: none;
    padding-top: 10px;
    font-size: 20px
  }

  ul {
    -webkit-padding-start: 0;
    margin-left: 30px;
    padding-top: 15px;
  }
</style>
