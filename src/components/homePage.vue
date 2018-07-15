<template>
  <div :class="$style['homeRoot']">
    <p :class="$style.fake">.</p>
    <div :class="$style['leaderBoardPlace']">
      <ul>
        <li v-for="(lider, index) in leaderBoard" :key="index">
            {{ lider.name + "  " + lider.score }}
        </li>
      </ul>
    </div>
    <!-- home button -->
    <costomButton
      :class="$style['startLogo']"
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

<style module>
  .homeRoot {
    width: 100%;
    height: 100%;
    background-color: rgb(249, 249, 249);
  }

  .leaderBoardPlace {
    width: 50%;
    height: 50%;
    background-color: rgb(190, 190, 203);
    margin:50px auto;
    border-radius: 3px
  }

  .startLogo {
    margin-left: 170px;
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

  .fake {
    font-size: 0;
    margin-top: 0;
  }
</style>
