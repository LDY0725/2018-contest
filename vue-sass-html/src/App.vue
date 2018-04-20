<template>
  <div id="app">
    <header-2048></header-2048>
    <container-2048></container-2048>
  </div>
</template>

<script>
import header from "./components/Header/Header"
import Container from "./components/Container/Container"

export default {
  name: 'app',
  components: {
    'header-2048' : header,
    'container-2048': Container
  },
  data () {
    return {}
  }
}
</script>

<style lang="scss"  type="text/css">

@media screen and (max-width: 500px) {
    html {
        font-size: 14px;
        background-color: #FAF8EF;
    }
    body {
        padding-top: 30px;
    }
}

@media screen and (min-width: 500px) {
    html {
        background-color: #FAF8EF;
        font-size: 20px;
    }
    body {
        padding-top: 10px;
    }
}
</style>
