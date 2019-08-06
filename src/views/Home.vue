<template>
  <div>
    <img :src="logoImg" alt="">
    <Hello/>
    <a href="javascript:;">这是一个连接</a>
  </div>
</template>

<script>
import Hello from '@/components/Hello.vue'
export default {
  name: 'Home',
  data () {
    return {
      logoImg: require('@/assets/logo.png')
    }
  },
  components: {
    Hello
  }
}
</script>

<style>
  @import "../styles/app.css";
  img{
    display: block;
    text-align: center;
    margin: 0 auto;
    transform: scale(0.8);
  }
  a{
    text-align: center;
    width: 100%;
    color: brown;
  }
</style>
