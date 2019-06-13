import Vue from 'vue'
import Router from 'vue-router'
import NavBar from "../components/NavBar";
import DataChart from "../components/DataChart"
import NewsTable from "../components/NewsTable"
import UserTable from "../components/UserTable"
import NewsRelease from "../components/NewsRelease"


Vue.use(Router)

export default new Router({
  routes: [
    {
      path:'/',
      redirect:'/dataShow',
      name:'NavBar',
      component:NavBar,
      children:[
        {
          path:"/dataShow",
          component: DataChart
        },
        {
          path:"/newsTable",
          component:NewsTable
        },
        {
          path:"/userTable",
          component:UserTable
        },
        {
          path:"/newsRelease",
          component:NewsRelease
        }
      ]
    }
  ]
})
