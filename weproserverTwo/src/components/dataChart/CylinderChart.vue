<template>
    <div class="wrapper">
        <div id="myChart" class="cons">
        </div>
    </div>
</template>

<script>
    export default {
        name: "CylinderChart",
      data(){
          return{

          }
      },
      mounted(){
          this.draw()
      },
      methods:{
        draw(){
          let myChart = this.$echarts.init(document.getElementById('myChart'))
          // 绘制图表
          var option = {
            backgroundColor: '#F3F3F3',
            visualMap: {
              show: false,
              min: 80,
              max: 600,
              inRange: {
                colorLightness: [0, 1]
              }
            },
            series : [
              {
                name: '访问来源',
                type: 'pie',
                radius: '76%',
                data:[
                  {value:310, name:'用户数量'},
                  {value:274, name:'群组数量'},
                  {value:335, name:'群聊消息'},
                  {value:400, name:'单聊消息'}
                ],
                roseType: 'angle',
                label: {
                  normal: {
                    textStyle: {
                      color: 'rgba(48,48,48,0.93)',
                      fontWeight:'bold'
                    }
                  }
                },
                labelLine: {
                  normal: {
                    lineStyle: {
                      color: 'rgba(109,154,243,0.78)'
                    }
                  }
                },
                itemStyle: {
                  normal: {
                    color: '#16b5c2',
                    shadowBlur: 200,
                    shadowColor: 'rgb(148,186,243)'
                  }
                }
              }
            ]
          };
          myChart.setOption(option);
        }
      }
    }
</script>

<style scoped>

.cons{
  width: 100%;
  height: 100%;
  background: #ffffff;
  box-shadow: 0px 3px 2px #aab2bd;
}
</style>
