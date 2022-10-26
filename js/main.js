const Header = Vue.component('Header', {
    props: ['colorDisplay','header'],
    template: `
        <div id="header" :style="header">
            <h1>The Great <br>
            <span id="colorDisplay">{{colorDisplay}}</span>
            <br>
            Guessing Game</h1>
        </div>
    `
})

const Container = Vue.component('Container', {
    props: {
        squares : Array,
        colorDisplay : String,
    },
    methods: {
        compararColor(square){
          let clickedColor = square.backgroundColor
          if(clickedColor === this.colorDisplay){
            this.$emit('message-display', 'You Picked Right!')
            this.setAllColorsTo(clickedColor)
            this.$emit('restart-text', 'Play Again!')
            this.$emit('header-background-color', clickedColor)
          }else{
            square.backgroundColor = '#232323'
            this.$emit('message-display', 'Try Again!')
          }
        },
        setAllColorsTo(color){
          this.squares.forEach( square => square.backgroundColor = color)
        }
    },
    template: `
        <div id="container">
            <div v-for="(square, index) in squares" :key="index">
            <div class="square" @click='compararColor(square)' :style="square"></div>
            </div>
        </div>
    `
})

const Navigator = Vue.component('Navigator', {
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
    template: `
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
            @header-background-color="header.backgroundColor=$event"
            >
            </Container>
        </div>
    `
})

const app = new Vue({
    el: "#app",
    components: {
        Navigator,
    },
    template: `
        <div>
            <Navigator></Navigator>
        </div>
    `
})