<template>
  <div id="app">
    <router-view></router-view>
  </div>
</template>

<script>
export default {
  name: 'app',
  mounted(){
    console.log('e')
    
  }
}


</script>

<style>
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #2c3e50;
  padding:0;
  margin:0;
  width:100%;
  margin-top: 60px;
}
a{
  text-decoration-line: none;
  color: #707070
}
div,ul,li,p,h1,h2,h3,h4,h5,h6,ol,select,option,b,a,i{
  padding:0;
  margin: 0;
}
</style>
