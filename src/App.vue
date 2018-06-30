<template>
  <div id="app"
      :class="$style.root"
      @mousemove="batPosition"
      @mousedown="startTheGame"
      :style="{borderWidth: borderSize+'px', borderRadius: borderRadius+'px'}"
  >
    <div v-if="!gameOver" :class="$style.score" :style="{fontSize: fontSize+'px', top: scoreY+'px', left:scoreX+'px'}">
      Score:{{score}}
    </div>
    <div v-if="gameOver" :class="$style.lost" :style="{fontSize: fontSize+'px'}">
      YOU LOST!
      <br>
      try again!
    </div>
    <br>
    <br>
    <div v-if="gameOver" :class="$style.scoreboard" :style="{fontSize: fontSize+'px'}">
      Scoreboard
      <div v-for="highScore in highScores">
        {{highScore.name}} - {{highScore.score}}
      </div>
    </div>
    <div v-if="!gameOver" v-for="index in ballsCount">
      <div :style="{left: ballsX[index]+'px', top: ballsY[index]+'px', width: ballSize+'px', height: ballSize+'px', borderRadius: borderRadius+'px'}"
          :class="$style.ball"
          >
      </div>
    </div>
    <div v-if="!gameOver" :style="{left : batX+'px', top: batY+'px', width: batWidth+'px', height: batHeight+'px', borderRadius: borderRadius+'px'}"
        :class="$style.bat">
    </div>
  </div>
</template>

<script>
import Vue from 'vue'
var timer
export default {
    name: 'app',
    data(){
      return{
        username:'amin',
        highScores:[{name:'ahmad',score:80}, {name: 'ali', score: 92}],
        userHighScore:0,
        score:0,
        borderRadius:(window.innerWidth+window.innerHeight)/150,
        scoreX:(window.innerWidth+window.innerHeight)/150,
        scoreY:(window.innerWidth+window.innerHeight)/150,
        lostX:0,
        lostY:window.innerHeight/20,
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
      moveBallsOneStep:function() {
        this.ballsCount.forEach((_, i) => {
          this.checkLosing(i)
          this.checkHitingWalls(i)
          this.checkHitingTheBat(i)
          Vue.set(this.ballsX, i, this.ballsX[i]+this.ballsSpeedX[i])
          Vue.set(this.ballsY,i,this.ballsY[i]+this.ballsSpeedY[i])
        })
      },
      checkHitingWalls:function(i){
        if(this.ballsX[i]+this.ballSize+this.borderSize>=this.windowWidth || this.ballsX[i]<=0)
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
          && this.ballsY[i]+this.ballSize>=this.batY+this.borderSize
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
        this.ballsY.push(window.innerHeight-window.innerHeight/30-(window.innerWidth+window.innerHeight)/100)
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
        if(this.ballsY[i]+this.ballSize>=this.batY+this.borderSize+1)
        {
          clearInterval(timer)
          this.sortHighScores()
          this.resetLocations()
          this.gameOver=true
          this.gameOnGoing=false
          if(this.score>this.userHighScore)
          {
            this.userHighScore=this.score
            for(i=0;i<this.highScores.length;i++)
            {
              if(this.highScores[i].name===this.username)
              {
                if(this.highScores[i].score<this.userHighScore)
                {
                  this.highScores[i].score=this.userHighScore
                  break

                }
              }
              if(i===this.highScores.length-1 && this.highScores.length<10)
              {
                this.highScores[this.highScores.length]={name:this.username,score:this.userHighScore}
                break
              }
              if(i===this.highScores.length-1 && this.highScores[this.highScores.length-1].score<this.userHighScore)
              {
                this.highScores[this.highScores.length-1]={name:this.username,score:this.userHighScore}
                break
              }
            }
            this.sortHighScores()
          }
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
      sortHighScores:function(){
        this.highScores = this.highScores.sort((a, b) => b.score - a.score)
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
  text-align: center;
}

.score{
  position: absolute;
  color: grey;
}

.scoreboard{
  text-align: center;
}
</style>
