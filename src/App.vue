<template>
  <div id="app">
    <Form></Form>
  </div>
</template>

<script>
import Form from './views/Form/index'

export default {
  name: 'App',
  components: {
    Form
  }
}
</script>

<style lang="less">
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
