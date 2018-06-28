<template>
<div id="app"
    :class="$style.root"
    @mousemove="batPosition"
    @mousedown="startTheGame"
>
  <div v-if="gameOver" :class="$style.lost">
    YOU LOST!
    <br>
    TRY AGAIN!
  </div>
  <div :class="$style.score">
    Score: {{score}}
  </div>
  <div :style="{left: ballX+'px', top: ballY+'px'}"
      :class="$style.ball">
  </div>
  <div :style="{left : batX+'px'}"
      :class="$style.bat">
  </div>
</div>
</template>


<script>
var timer
export default {
    name: 'app',
    data(){
      return{
        score:0,
        batX:210,
        batY:485,
        ballX:240,
        ballY:465,
        ballSpeedX:0.0,
        ballSpeedY:0.0,
        gameOnGoing:false,
        gameOver:false,
      }
    },

    methods:{
      batPosition:function(event){
        if(event.clientX<500 && this.gameOnGoing===true)
        {
          this.batX=event.clientX-40
        }
      },
      startTheGame:function(){
        if(!this.gameOnGoing){
          this.score=0
          this.gameOver=false
          this.gameOnGoing=true
          this.ballSpeedX=Math.floor(Math.random() * 2)-1
          if(this.ballSpeedX>=0)
          {
            this.ballSpeedX+=1.0
          }else{
            this.ballSpeedX-=1.0
          }
          this.ballSpeedY=  -Math.floor(Math.random() * 1)-1
          timer=setInterval(this.moveBallOneStep, 4)
        }
      },
      moveBallOneStep:function(){
        this.checkHitingWalls()
        this.checkHitingTheBat()
        this.checkLosing()
        this.ballX+=this.ballSpeedX
        this.ballY+=this.ballSpeedY
        console.log(this.ballSpeedX)
      },
      checkHitingWalls:function(){
        if(this.ballX+this.ballSpeedX>=500-15 || this.ballX+this.ballSpeedX<=-5)
        {
          this.ballSpeedX=-this.ballSpeedX
        }
        if(this.ballY+this.ballSpeedY<=-5)
        {
          this.ballSpeedY=-this.ballSpeedY
        }
      },
      checkHitingTheBat:function(){
        if(this.ballX+this.ballSpeedX<=this.batX+80
          && this.ballX+this.ballSpeedX+20>=this.batX
          && this.ballY+this.ballSpeedY>=this.batY-15
          && this.ballSpeedY>0)
          {
            this.ballSpeedY=-this.ballSpeedY
            this.score++
            this.ballSpeedY>0?this.ballSpeedY+=0.02:this.ballSpeedY-=0.02
            this.ballSpeedX>0?this.ballSpeedX+=0.02:this.ballSpeedX-=0.02
          }
      },
      checkLosing:function(){
        if(this.ballY>=500)
        {
          clearInterval(timer)
          this.resetLocations()
          this.gameOver=true
          this.gameOnGoing=false
        }
      },
      resetLocations:function(){
        this.ballX=240
        this.ballY=465
        this.batX=210
      },
    },
}
</script>

<style module>
.root {
  position:relative;
  width: 100%;
  height: 100%;
  border: 5px #000000 solid;
  border-bottom: 0px;
  border-radius: 15px;
  background: white;
  display: flex;
  flex-direction: row;
  flex-grow: 5;
}

.bat{
  position: relative;
  border: 5px;
  border-radius: 2px;
  background: black;
  top: 80%;
  height: 10px;
  width: 80px;
}

.ball{
  position: relative;
  border: 5px;
  border-radius: 10px;
  background: black;
  height: 20px;
  width: 20px;
}

.lost{
  position: relative;
  font-weight: bold;
  font-size: 30px;
}

.score{
  font-size: 24px;
  color: grey;
}
</style>
