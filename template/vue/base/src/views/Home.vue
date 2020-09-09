<template>
  <div class="container">
    <img :src="logoImg" alt="">
    <Hello/>
    <div>vue文档：<a target="_blank" href="https://cn.vuejs.org/v2/guide/">vue</a></div>
    <div>vue-router文档：<a target="_blank" href="https://router.vuejs.org/zh/">vue-router</a></div>
    <div>vuex文档：<a target="_blank" href="https://vuex.vuejs.org/zh/">vuex</a></div>
  </div>
</template>

<script>
import Hello from '@/components/Hello.vue'
export default {
  name: 'Home',
  data () {
    return {
      logoImg: require('@/assets/cu.png')
    }
  },
  components: {
    Hello
  }
}
</script>

<style>
  @import "../styles/app.css";
  .container{
    margin: 0 auto;
    width: 275px;
  }
  .container div{
    color: #0099cc;
    margin: 5px 0;
  }
  img{
    width: 300px;
    height: 300px;
    display: block;
    text-align: center;
    margin: 0 auto;
  }
  a{
    text-align: center;
    width: 100%;
    color: green;
    text-decoration: underline;
  }
</style>
