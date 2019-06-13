<template>
  <section class="container">
    <div class="row">
       <CylinderChart class="col-lg-8"></CylinderChart>
       <WordChart class="col-lg-4" v-bind:sums="user_sum" v-bind:gou="group_sum"></WordChart>
      <TableChart class="col-lg-12" v-bind:temp="user_sum"></TableChart>
    </div>
  </section>
</template>

<script>
  import CylinderChart from "../components/dataChart/CylinderChart"
  import WordChart from "../components/dataChart/WordChart"
  import TableChart from "../components/dataChart/TableChart"
    export default {
        name: "DataChart",
      components:{
        CylinderChart,WordChart,TableChart
      },
      data(){
          return{
            user_sum:0,
            group_sum:0
          }
      },
      mounted() {
        this.get_sum_user()
        this.get_sum_group()
      },
      methods:{
          get_sum_user(){
            var that=this
            this.$axios.get('http://a1.easemob.com/1105190519107267/wechart/users?limit=1000',{
              headers:{
                Authorization:'Bearer YWMtchbE9IBNEem-JjVc39puVwAAAAAAAAAAAAAAAAAAAAF3UpIwejsR6ZvD73HlPqAcAgMAAAFq-Blb5ABPGgCrX8f6Q1nqPMClvuQpVWFHy7JFyoyhlVMN9Kq2KDpWcA'
              }
            })
              .then((response)=>{
                that.user_sum=response.data.entities.length
              })
              .catch((error)=>{
                console.log(error)
              })
          },
          get_sum_group(){
            var that=this
            this.$axios.get('http://a1.easemob.com/1105190519107267/wechart/chatgroups?limit=1000',{
              headers:{
                Authorization:'Bearer YWMtchbE9IBNEem-JjVc39puVwAAAAAAAAAAAAAAAAAAAAF3UpIwejsR6ZvD73HlPqAcAgMAAAFq-Blb5ABPGgCrX8f6Q1nqPMClvuQpVWFHy7JFyoyhlVMN9Kq2KDpWcA'
              }
            })
              .then((response)=>{
                that.group_sum=response.data.data.length
              })
              .catch((error)=>{
                console.log(error)
              })
          }
      }
    }
</script>

<style scoped>

</style>
