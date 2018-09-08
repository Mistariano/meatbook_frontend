<template>
  <div id="app" class="meat-app">
    <router-view/>
  </div>
</template>

<script>
export default {
  name: 'App'
}
</script>

<style>
  .meat-app{
    width: 75%;
    margin: auto;
    padding: 100px 30px;
  }
</style>
