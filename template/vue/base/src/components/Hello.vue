<template>
  <h2 class="header-text">{{hello}}</h2>
</template>

<script>
export default {
  name: 'Hello',
  data () {
    return {
      hello: 'Hello~ 欢迎使用cu-cli。'
    }
  }
}
</script>

<style scoped>
  .header-text{
    color: #ffd150;
    width: 100%;
    text-align: center;
    display: flex;
  }
</style>
