<template>
  <div class="main-container">
    <h3>History</h3>
    <div class="historyContainer">
      <div class="form-group">
        <label>历史记录下载</label>
      </div>
      <div class="form-group">
        <label>选择日期：</label>
        <div class="tip">
          <img src="../assets/day.png">
          <input type="date" v-model="year">
        </div>
      </div>
      <div class="form-group">
        <label>输入时间(0-24)：</label>
        <div class="tip">
          <img src="../assets/time.png">
          <input type="number" v-model="time">
        </div>
      </div>
      <div class="form-group ye">
        <button class="btn btn-info" @click="load">下载</button>
        <a :href="downurl">
        <button class="btn btn-danger" v-if="downurl.length>3" >获取</button>
        </a>
      </div>
    </div>
  </div>
</template>

<script>
    export default {
        name: "NewsRelease",
      data(){
          return{
              year:'',
              time:'',
            downurl:''
          }
      },
      mounted(){
          this.time=''
          this.downurl=''
          this.year=''
      },
      methods:{
          load(){
            var arr=this.year.split('-')
            this.year=''
            for (let i=0;i<arr.length;i++)
              this.year+=arr[i]
           if(this.year.length!=8){
             alert("请输入正确日期")
             return
           }
           if(this.time<0||this.time>24){
             alert("请输入正确时间")
             return
           }else if(this.time<10){
             this.time='0'+this.time
           }
           let sum=this.year+this.time
            //console.log(sum)
            var that=this
            this.$axios.get('http://a1.easemob.com/1105190519107267/wechart/chatmessages/'+sum,
              {
                headers:{
                  Authorization:'Bearer YWMtCzN0kIklEemUwH0GBbj1FQAAAAAAAAAAAAAAAAAAAAF3UpIwejsR6ZvD73HlPqAcAgMAAAFrMgwTTgBPGgDdXh9w_eUGJaztdlzfqQp93JcxL8NLvkYXyaSId_028w'
                },
                emulateJSON: true
              })
              .then((response) => {
                that.downurl=response.data.data[0].url
              }).catch((error)=>{
                alert("不存在此时段记录")
                console.log(error)
            });
          }

      }

    }
</script>

<style scoped>
.main-container{
  margin-top: 150px;
  color: #797979;
  background: #ffffff;
  box-shadow: 0px 3px 2px #aab2bd;
}
  .historyContainer{
    font-family: 'Microsoft YaHei';
  }
  .tip{
    display: flex;
  }
  .tip img{
    width: 50px;
    height: 50px;
    margin-right: 5%;
  }
  .tip input{
    outline-style: none ;
    border: 1px solid #ccc;
    border-radius: 3px;
    width:90%;
  }
  .historyContainer button{
    width: 88%;
    text-align: center;
    margin-left: 12%;
  }
  .ye button{
    margin-top: 10px;
  }


</style>
