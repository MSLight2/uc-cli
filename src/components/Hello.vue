<template>
  <h2 class="header-text">{{hello}}</h2>
</template>

<script>
export default {
  name: 'Hello',
  data () {
    return {
      hello: 'Hello Vue ^_^'
    }
  }
}
</script>

<style>
  .header-text{
    color: aquamarine;
    width: 100%;
    text-align: center;
    display: flex;
  }
</style>
