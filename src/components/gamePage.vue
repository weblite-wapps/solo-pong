<template>
  <div
    class="root"
    @mousedown.once="playAndPause"
    @mousemove="changeBatPosition"
  >
    <!-- score and highScore and gameStopButton-->
    <div class="scoreTape">
      <div class="pTag" @keyup.left="c">
        <p >RECORD : {{highScore}}</p>
        <p >SCORE : {{score}}</p>
      </div>
      <!-- button ro bayad dorost konam -->
      <costomButton
        type="pause"
        class="pauseButton"
        @click="playAndPause"
        />
    </div>
    <hr>
    <!-- ball -->
    <div
      :style="{ left: ballPosition.x+'px', top: 60+ballPosition.y+'px'}"
      class="ball"
      >
    </div>
    <!-- bat -->
    <div
        @keyup.left="c"
      :style="{ left: batPosition.x+'px', top: batPosition.y+'px'}"
      class="bat"
      >
    </div>
  </div>
</template>

<script>

  import costomButton from "./../helper/components/costomButton.vue"

  export default {
    name: 'gamePage',

    props: {
      highScore: {
        type: Number
      },
      player: {
        type: String
      }
    },

    components: {
      costomButton,
    },

    data(){
      return {
        score: 0,
        ballPosition: { x: 200, y: 370 },
        batPosition: { x: 180, y: 450 },
        ballSpeed: { x: 2 + Math.random() * 5, y: -3 },
        gameOnGoing: false,
        interval: null,
      }
    },

    methods: {
      playAndPause() {
        if (this.gameOnGoing) clearInterval(this.interval)
        else this.interval = setInterval(() => this.gameEcosystem(), 10)

        this.gameOnGoing = !this.gameOnGoing
      },

      gameEcosystem(){
        this.findBallPosition()
        this.checkHitingWalls()
        this.checkHitingBat()
      },

      findBallPosition(){
        this.ballPosition.x += this.ballSpeed.x
        this.ballPosition.y += this.ballSpeed.y
      },

      checkHitingWalls(){
        if(this.ballPosition.x > 380 || this.ballPosition.x < 0) this.ballSpeed.x = -this.ballSpeed.x
        if(this.ballPosition.y < 0) this.ballSpeed.y = -this.ballSpeed.y
      },

      checkHitingBat(){
        if(this.ballPosition.y > 370){
          if(this.ballPosition.x < 55 + this.batPosition.x && this.ballPosition.x > this.batPosition.x - 15) {
            this.ballSpeed.y = -this.ballSpeed.y
            if(this.ballPosition.x > 45 + this.batPosition.x || this.ballPosition.x < this.batPosition.x - 5){
              this.ballSpeed.x += (.5 - Math.random())
            }
            this.score++
          } else {
            this.playAndPause()
            this.$emit('gameFinished', this.score)
          }
        }
      },

      changeBatPosition:function(event){
        if(this.gameOnGoing){
          if(event.clientX - (window.innerWidth - 400)/2 < 340)
            this.batPosition.x =  event.clientX - (window.innerWidth - 400)/2
          else this.batPosition.x = 340
        }
      },
    }
  }

</script>

<style scoped>
  .root {
    height: inherit;
    background-color: rgb(255, 253, 244);
    position:absolute;
    width: inherit;
    height: inherit;
  }

  .scoreTape {
    width: 100%;
    height: 50px;
    display: flex;
    flex-wrap: nowrap;
  }

  hr {
    height: 2px;
    background-color: black;
  }

  .ball {
    position: absolute;
    background: black;
    width: 20px;
    height: 20px;
    border-radius: 10px;
  }

  .pTag {
    text-align: center;
    margin-top: 5px;
    padding-top: 4px;
    margin-left: 150px
  }

  .bat {
    width: 60px;
    height: 4px;
    background-color: black;
    position: absolute;
  }

  .pauseButton {
    margin-left: 60px;
    margin-top: 10px
  }
</style>
