<template>
<div id="app"
    :class="$style.root"
    @mousemove="batPosition"
    @mousedown="startTheGame"
>
  <div :class="$style.score">
    Score: {{score}}
  </div>
  <div v-if="gameOver" :class="$style.lost">
    YOU LOST!
    <br>
    TRY AGAIN!
  </div>
  <div :style="{left: ballX+'px', top: ballY+'px'}"
      :class="$style.ball">
  </div>
  <div :style="{left : batX+'px', top: batY+'px'}"
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
        batX:window.innerWidth/2,
        batY:window.innerHeight-60,
        ballX:window.innerWidth/2,
        ballY:window.innerHeight-60,
        ballSpeedX:0.0,
        ballSpeedY:0.0,
        gameOnGoing:false,
        gameOver:false,
        windowHeight:window.innerHeight,
        windowWidth:window.innerWidth,
        maxStartingSpeedX:window.innerWidth/600,
        maxStartingSpeedY:window.innerHeight/600,
      }
    },

    methods:{
      batPosition:function(event){
        if(event.clientX+40<this.windowWidth && event.clientX>30 && this.gameOnGoing===true)
        {
          this.batX=event.clientX-40
        }
      },
      startTheGame:function(){
        if(!this.gameOnGoing){
          this.resetLocations()
          this.score=0
          this.gameOver=false
          this.gameOnGoing=true
          this.ballSpeedX=Math.floor(Math.random() * this.maxStartingSpeedX)-this.maxStartingSpeedX/2
          if(this.ballSpeedX>=0)
          {
            this.ballSpeedX+=this.maxStartingSpeedX/2
          }else{
            this.ballSpeedX-=this.maxStartingSpeedX/2
          }
          this.ballSpeedY=  -Math.floor(Math.random() * this.maxStartingSpeedY/2)-this.maxStartingSpeedY/2
          timer=setInterval(this.moveBallOneStep, 4)
        }
      },
      moveBallOneStep:function(){
        this.checkLosing()
        this.checkHitingWalls()
        this.checkHitingTheBat()
        this.ballX+=this.ballSpeedX
        this.ballY+=this.ballSpeedY
      },
      checkHitingWalls:function(){
        if(this.ballX>=this.windowWidth-20 || this.ballX<=0)
        {
          this.ballSpeedX=-this.ballSpeedX
        }
        if(this.ballY<=-28)
        {
          this.ballSpeedY=-this.ballSpeedY
        }
      },
      checkHitingTheBat:function(){
        if(this.ballX<=this.batX+60
          && this.ballX>=this.batX
          && this.ballY>=this.batY+2
          && this.ballSpeedY>0)
          {
            this.ballSpeedY=-this.ballSpeedY
            this.score++
            this.ballSpeedY>0?this.ballSpeedY+=0.02:this.ballSpeedY-=0.02
            this.ballSpeedX>0?this.ballSpeedX+=0.02:this.ballSpeedX-=0.02
          }
      },
      checkLosing:function(){
        if(this.ballY+30>=this.windowHeight)
        {
          clearInterval(timer)
          this.resetLocations()
          this.gameOver=true
          this.gameOnGoing=false
        }
      },
      resetLocations:function(){
        this.windowHeight=window.innerHeight
        this.windowWidth=window.innerWidth
        this.ballX=this.windowWidth/2
        this.ballY=this.windowHeight-60
        this.batX=this.windowWidth/2
      },
    },
}
</script>

<style module>
.root {
  position:absolute;
  width: 100%;
  height: 100%;
  border: 5px #000000 solid;
  border-bottom: 0px;
  border-radius: 15px;
  background: white;
}

.bat{
  position: relative;
  border: 5px;
  border-radius: 2px;
  background: black;
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
