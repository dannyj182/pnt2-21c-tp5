<template>

		<div id="header" :style="header">
			<h1>The Great <br>
			<span id="colorDisplay">{{colorDisplay}}</span>
			<br>
			Guessing Game</h1>
		</div>

</template>

<script>

  export default  {
    name: 'src-components-header',
    props: ['colorDisplay','header']
}

</script>

<style scoped lang="css">
h1 {
	font-weight: normal;
	line-height: 1.1;
	padding: 20px 0;
}
#header {
	transition: all 0.3s;
	background: steelblue;
	text-transform: uppercase;
	text-align: center;
	margin: 0;
	color: white;
}
#colorDisplay {
	font-size: 200%;
}
</style>
