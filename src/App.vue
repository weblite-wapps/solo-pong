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
  <div v-for="index in ballsCount">
    <div :style="{left: ballsX[index]+'px', top: ballsY[index]+'px'}"
        :class="$style.ball"
        >
    </div>
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
        ballsCount:[0],
        ballsX:[window.innerWidth/2+30],
        ballsY:[window.innerHeight-60],
        ballsSpeedX:[0],
        ballsSpeedY:[0],
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
          // this.ballsX.push(this.windowWidth/2+30)
          // this.ballsY.push(this.windowHeight-60)
          // this.ballsSpeedX.push(Math.random() * this.maxStartingSpeedX-this.maxStartingSpeedX/2)
          // if(this.ballsSpeedX[0]>=0)
          // {
          //   this.ballsSpeedX[0]+=this.maxStartingSpeedX/2
          // }else{
          //   this.ballsSpeedX[0]-=this.maxStartingSpeedX/2
          // }
          // this.ballsSpeedY.push(-Math.random() * this.maxStartingSpeedY/2-this.maxStartingSpeedY/2)
          this.addBall()
          timer=setInterval(this.moveBallsOneStep,4)
        }
      },
      moveBallsOneStep:function(){
        this.score++
        this.score--
        for(var i=0;i<this.ballsCount.length;i++)
        {
          this.checkLosing(i)
          this.checkHitingWalls(i)
          this.checkHitingTheBat(i)
          this.ballsX[i]+=this.ballsSpeedX[i]
          this.ballsY[i]+=this.ballsSpeedY[i]
        }
      },
      checkHitingWalls:function(i){
        if(this.ballsX[i]>=this.windowWidth-20 || this.ballsX[i]<=0)
        {
          this.ballsSpeedX[i]=-this.ballsSpeedX[i]
        }
        if(this.ballsY[i]<=-28)
        {
          this.ballsSpeedY[i]=-this.ballsSpeedY[i]
        }
      },
      checkHitingTheBat:function(i){
        if(this.ballsX[i]<=this.batX+60
          && this.ballsX[i]>=this.batX
          && this.ballsY[i]>=this.batY+2
          && this.ballsSpeedY[i]>0)
          {
            this.ballsSpeedY[i]=-this.ballsSpeedY[i]
            this.score++
            this.ballsSpeedY[i]>0?this.ballsSpeedY[i]+=0.00001*this.windowHeight:this.ballsSpeedY[i]-=0.00001*this.windowHeight
            this.ballsSpeedX[i]>0?this.ballsSpeedX[i]+=0.00001*this.windowWidth:this.ballsSpeedX[i]-=0.00001*this.windowWidth
            if(this.score!==0 && this.score%(this.ballsCount.length*(this.ballsCount.length+1)*5/2)===0)
            {
              setTimeout(this.addBall,700)
            }
          }
      },
      addBall:function(){
        this.ballsX.push(this.windowWidth/2+30)
        this.ballsY.push(this.windowHeight-60)
        this.ballsCount.push(this.ballsCount.length)
        this.ballsSpeedX.push(Math.random() * this.maxStartingSpeedX-this.maxStartingSpeedX/2)
        if(this.ballsSpeedX[this.ballsSpeedX.length-1]>=0)
        {
          this.ballsSpeedX[this.ballsSpeedX.length-1]+=this.maxStartingSpeedX/2
        }else{
          this.ballsSpeedX[this.ballsSpeedX.length-1]-=this.maxStartingSpeedX/2
        }
        this.ballsSpeedY.push(-Math.random() * this.maxStartingSpeedY/2-this.maxStartingSpeedY/2)
      },
      checkLosing:function(i){
        if(this.ballsY[i]+30>=this.windowHeight)
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
        this.batX=this.windowWidth/2
        this.ballsCount=[]
        this.ballsX=[]
        this.ballsY=[]
        this.ballsSpeedX=[]
        this.ballsSpeedY=[]
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
  position: absolute;
  font-weight: bold;
  font-size: 30px;
}

.score{
  font-size: 24px;
  color: grey;
}
</style>
