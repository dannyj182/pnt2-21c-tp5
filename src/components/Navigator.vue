<template>

  <div>
    <Header :colorDisplay="colorDisplay" :header="header"></Header>
		<div id="navigator">
			<button id="reset" @click="restartButton()">{{restartText}}</button>
			<span id="message"> {{messageDisplay}}</span>
			<button id="easy" @click="easyButton()" :class="easyClass" >easy</button>
			<button id="hard" @click="hardButton()" :class="hardClass" >hard</button>
		</div>
		<Container 
      :squares="squares" 
      :colorDisplay="colorDisplay" 
      @message-display="messageDisplay=$event"
      @restart-text="restartText=$event"
      @header-background-color="header.backgroundColor=$event">
    </Container>
	</div>

</template>

<script>

import Header from './Header.vue'
import Container from './Container.vue'

  export default  {
    name: 'src-components-navigator',
    components: {
      Header,
      Container
    },
    data () {
      return {
        isHard : true,
        easyClass : '',
        hardClass : 'selected',
        colorCount : 6,
        squares : [],
        colors : [],
        colorDisplay : '',
        header : {
          backgroundColor : 'steelblue'
        },
        messageDisplay : '',
        colorMessage : '',
        restartText : 'New Colors!'
      }
    },
    methods: {
      restartButton(){
        this.restart()
      },
      easyButton(){
        if(this.isHard){
          this.isHard = false;
          this.easyClass = 'selected'
          this.hardClass = ''
          this.colorCount = 3
          for(let i = 0 ; i < this.colorCount ; i++){
            this.squares[i + 3].display = 'none'
          }
          this.restart()
        }
      },
      hardButton(){
        if(!this.isHard){
          this.isHard = true;
          this.easyClass = ''
          this.hardClass = 'selected'
          this.colorCount = 6
          this.restart()
          for(let i = 3 ; i < this.colorCount ; i++){
            this.squares[i].display = 'block'
          }
        }
      },
      restart(){
        this.colors = this.createNewColors(this.colorCount)
        this.colorDisplay = this.colors[this.pickColor()]
        this.header.backgroundColor = 'steelblue'
        this.messageDisplay = ''
        this.restartText = 'New Colors!'
        for(let i = 0; i < this.squares.length ; i++){
          this.squares[i].backgroundColor = this.colors[i]
        }
      },
      pickColor() {
        let quantity;
        if (this.isHard) {
          quantity = 6;
        } else {
          quantity = 3;
        }
        return Math.floor(Math.random() * quantity);
      },
      createNewColors(numbers){
        let array = []
        for (let i = 0 ; i < numbers ; i++){
          array.push(this.createRandomStringColor())
        }
        return array;
      },
      createRandomStringColor(){
        let newColor = "rgb(" + this.randomInt() + ", " + this.randomInt() + ", " + this.randomInt() + ")"
        return newColor
      },
      randomInt() {
        return Math.floor(Math.random() * 256)
      },
      inicializarSquares(){
        let array = []
        for(let i = 0 ; i < 6 ; i++){
          let style = {
            display : 'block',
            backgroundColor : this.colors[i]
          }
          array.push(style)
        }
        return array
      },
    },
    created () {
      this.colors = this.createNewColors(this.colorCount)
      this.colorDisplay = this.colors[this.pickColor()]
      this.squares = this.inicializarSquares()
    },
  }

</script>

<style scoped lang="css">
#navigator {
  background: #ffffff;
  height: 30px;
  text-align: center;
  margin: 0;
  margin-top: -30px;
}
#message {
  color: #000000;
  display: inline-block;
  width: 20%;
}
.selected {
  background-color: steelblue;
  color: white;
}
button {
  border: none;
  background-color: white;
  font-family: "Montserrat", "Avenir";
  text-transform: uppercase;
  height: 100%;
  font-weight: 700;
  letter-spacing: 1px;
  color: steelblue;
  transition: all 0.3s;
  outline: none;
}
button:hover {
  color: white;
  background-color: steelblue;
}
</style>
