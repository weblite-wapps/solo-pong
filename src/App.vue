<template>
  <div id="app"
      :class="$style.root"
      @mousemove="batPosition"
      @mousedown="startTheGame"
      :style="{borderWidth: borderSize+'px', borderRadius: borderRadius+'px'}"
  >
  <div :style="{top: textY+'px', left:textX+'px',position: 'absolute'}">
    <div :class="$style.score" :style="{fontSize: fontSize+'px'}">
      Score:{{score}}
    </div>
    <div v-if="gameOver" :class="$style.lost" :style="{fontSize: fontSize+'px'}">
      YOU LOST!
      <br>
      TRY AGAIN!
    </div>
  </div>
    <div v-for="index in ballsCount">
      <div :style="{left: ballsX[index]+'px', top: ballsY[index]+'px', width: ballSize+'px', height: ballSize+'px', borderRadius: borderRadius+'px'}"
          :class="$style.ball"
          >
      </div>
    </div>
    <div :style="{left : batX+'px', top: batY+'px', width: batWidth+'px', height: batHeight+'px', borderRadius: borderRadius+'px'}"
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
        borderRadius:(window.innerWidth+window.innerHeight)/150,
        textX:(window.innerWidth+window.innerHeight)/150,
        textY:(window.innerWidth+window.innerHeight)/150,
        borderSize:(window.innerWidth+window.innerHeight)/200,
        fontSize:window.innerHeight/20,
        batX:window.innerWidth/2-window.innerWidth/7/2,
        batY:window.innerHeight-window.innerHeight/30,
        batWidth:window.innerWidth/7,
        batHeight:window.innerHeight/50,
        ballsCount:[0],
        ballSize:(window.innerWidth+window.innerHeight)/100,
        ballsX:[window.innerWidth/2-(window.innerWidth+window.innerHeight)/200],
        ballsY:[window.innerHeight-window.innerHeight/30-(window.innerWidth+window.innerHeight)/100],
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
        if(this.gameOnGoing===true)
        {
          this.batX=event.clientX-this.batWidth/2
        }
      },
      startTheGame:function(){
        if(!this.gameOnGoing){
          this.resetLocations()
          this.score=0
          this.gameOver=false
          this.gameOnGoing=true
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
        if(this.ballsX[i]+this.ballSize>=this.windowWidth || this.ballsX[i]<=0)
        {
          this.ballsSpeedX[i]=-this.ballsSpeedX[i]
        }
        if(this.ballsY[i]<=0)
        {
          this.ballsSpeedY[i]=-this.ballsSpeedY[i]
        }
      },
      checkHitingTheBat:function(i){
        if(this.ballsX[i]<=this.batX+this.batWidth
          && this.ballsX[i]+this.ballSize>=this.batX
          && this.ballsY[i]+this.ballSize-35>=this.batY
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
        this.ballsX.push(this.batX+this.batWidth/2-this.ballSize/2)
        this.ballsY.push(window.innerHeight-15-(window.innerWidth+window.innerHeight)/100)
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
        if(this.ballsY[i]+this.ballSize-36>=this.batY)
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
        this.batX=window.innerWidth/2-window.innerWidth/7/2
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
  box-sizing: border-box;
  width: 100%;
  height: 100%;
  border: black solid;
  border-bottom: 0px;
  border-color: black;
}

.bat{
  position: absolute;
  background: black;
}

.ball{
  position: absolute;
  background: black;
}

.lost{
  position: relative;
  font-weight: bold;
}

.score{
  position: relative;
  color: grey;
}
</style>
