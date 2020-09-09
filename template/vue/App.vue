<template>
  <div>
  <%_ if (addRouter) { _%>
    <router-view/>
  <%_ } else { _%>
    <Home/>
  <%_ } _%>
  </div>
</template>

<script>
<%_ if (!addRouter) { _%>
import Home from '@/views/Home.vue'
<%_ } _%>

export default {
  name: 'App',
  <%_ if (!addRouter) { _%>
  components: { Home },
  <%_ } _%>
  data () {
    return {
    }
  }
}
</script>
