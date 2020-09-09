import Vue from 'vue'
import App from './App.vue'
<%_ if (addRouter) { _%>
import router from './router'
<%_ } _%>
<%_ if (addVuex) { _%>
import store from './store'
<%_ } _%>

new Vue({
  <%_ if (addRouter) { _%>
  router,
  <%_ } _%>
  <%_ if (addVuex) { _%>
  store,
  <%_ } _%>
  render: h => h(App)
}).$mount('#app')
