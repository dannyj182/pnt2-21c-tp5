<template>

  <div id="container">
		<div v-for="(square, index) in squares" :key="index">
      <div class="square" @click='compararColor(square)' :style="square"></div>
    </div>
  </div>

</template>

<script>

  export default  {
    name: 'src-components-container',
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
    }
  }

</script>

<style scoped lang="css">
.square {
	width: 30%;
	background: blue;
	padding-bottom: 30%;
	float: left;
	margin: 1.66%;
	border-radius: 10%;
	transition: background 0.8s;
	-webkit-transition: background 0.8s;
	-moz-transition: background 0.8s;
}
#container {
	margin: 20px auto;
	max-width: 600px;
}
</style>
