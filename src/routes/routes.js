
import VueRouter from 'vue-router'

/*
*Loading Components based on the Route /navigation
*/
const routes=  new VueRouter({
  routes: [
    {
      path: '/',
      name: 'HomeComponent',
      component: () => import("../components/HomeComponent.vue"),
    },
    {
        path: '/posts/:postId',
        name: 'PostComponent',
        component: () => import("../views/Posts.vue"),
        props: true
    }
  ]
});
export default routes;