<template>
  <div class=" wrapper">
    <div id="myChart2" class="cons">
    </div>
      <div class="content-panel" style="font-family:'Microsoft YaHei'">
        <div class="recent-activity mt">
          <div class="activity-panel">
            <h5>注册用户趋势</h5>
            <p>Today:{{days[0]}}</p>
            <img src="../../assets/turnleft.png">
          </div>
        </div>
      </div>

  </div>
</template>

<script>
    export default {
        name: "TableChart",
        data(){
          return{
            days:[],
            hh:this.temp
          }
        },
      props:['temp'],
      mounted(){
         var myDate = new Date();
         var month = myDate.getMonth()+1;
         var day = myDate.getDate();
         this.days.push(month+"月"+day+"日")
         for(var i=0;i<6;i++){
           if(day-1<1){
             month=month-1;
             this.days.push(month+"月"+"30日")
             day=30;
           }
           else{
             this.days.push(month+"月"+(day-1)+"日")
             day=day-1;
           }
         }

         var that=this
        this.$axios.get('http://a1.easemob.com/1105190519107267/wechart/users?limit=1100',{
          headers:{
            Authorization:'Bearer YWMtchbE9IBNEem-JjVc39puVwAAAAAAAAAAAAAAAAAAAAF3UpIwejsR6ZvD73HlPqAcAgMAAAFq-Blb5ABPGgCrX8f6Q1nqPMClvuQpVWFHy7JFyoyhlVMN9Kq2KDpWcA'
          }
        })
          .then((response)=>{
            that.sum=response.data.entities.length
            that.draws(that.sum)
          })
          .catch((error)=>{
            console.log(error)
          })
      },
      methods:{
        draws(sum){

          let myChart2 = this.$echarts.init(document.getElementById('myChart2'))
          let option2 = {
            xAxis: {
              type: 'category',
              data: this.days
            },
            yAxis: {
              type: 'value'
            },
            series: [{
              data: [sum, sum-1, sum-1, sum-4, sum-4, sum-6, 0],
              type: 'line',
              smooth: true
            }]
          };

          myChart2.setOption(option2);
        }
      }
    }
</script>

<style scoped>
.wrapper{
  width: 100%;
  height: 400px;
  padding: 0;
  display: flex;
}
  .cons{
    width: 80%;
    height: 100%;
  }


.activity-panel {
  padding: 15px 30px;
  background: #f2f2f2;
  border-radius: 5px;
  -webkit-border-radius: 5px;
  position: relative;
  text-align: center;
}
.activity-panel {
  margin-top: 100%;
  margin-left: 0;
  padding: 15px 30px;
  background: #f2f2f2;
  border-radius: 5px;
  -webkit-border-radius: 5px;
  position: relative;
  text-align: center;
  width: 120%;
}
.activity-panel h5 {
  font-weight: 500;
  font-size: 20px;
}
.activity-panel p {
  display: block;
  margin-block-start: 1em;
  margin-block-end: 1em;
  margin-inline-start: 0px;
  margin-inline-end: 0px;
}
</style>
