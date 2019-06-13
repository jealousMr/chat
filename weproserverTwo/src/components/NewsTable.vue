<template>
  <div class="mains" style="font-family:'Microsoft YaHei'">
    <div class="content-panel">
      <h4>Group Table</h4>
      <hr>
      <div class="reg">
        <button class="btn btn-info" data-toggle="modal" data-target="#creategroups" >+创建群组</button>
        <div>
          <input type="text" class="fin"  v-model="serachGroup" placeholder="搜索群组">
          <button class="btn btn-danger" @click="sea"  style="margin-left: 10rpx">find</button>
        </div>
      </div>
      <table class="table table-striped table-advance table-hover">
        <thead>
          <tr>
            <th>群组id</th>
            <th>群组昵称</th>
            <th>群主</th>
            <th>当前人数</th>
            <th>操作</th>
          </tr>
        </thead>
        <tbody>
           <tr v-for="(item,index) in groupList" :key="index">
             <td>
              {{item.groupid}}
             </td>
             <td class="hidden-phone duo">{{item.groupname}}</td>
             <td class="duo">{{item.owner.split("_")[1]}}</td>
             <td>{{item.affiliations}} </td>
             <td>
               <button class="btn  btn-xs">
                 <img src="../assets/trash.png" @click="deletegroup(item.groupid)" style="width: 20px;height: 20px">
               </button>
               <button class="btn  btn-xs" data-toggle="modal" data-target="#detail" @click="getUserlist(item.groupid)">
                 <img src="../assets/xial.png" style="width: 20px;height: 20px">
               </button>
             </td>
           </tr>
        </tbody>
      </table>
      <div class="next">
        <button class="btn btn-info" >上一页</button>
        <button class="btn btn-success" >下一页</button>

      </div>
    </div>

<!--    模态框-->
    <div class="modal fade" id="detail" tabindex="-1" role="dialog" aria-labelledby="myModalLabel" aria-hidden="true">
      <div class="modal-dialog">
        <div class="modal-content">
          <div class="modal-header">
            <div class="writter">
              <label>
                查看群组成员
              </label>
              <span></span>
            </div>
          </div>
          <div class="modal-body">
            <div class="people">
              <label>添加群组成员</label>
              <div class="addcontainer">
                <input type="text" v-model="addpeople">
                <button class="btn btn-danger" @click="addp">添加成员</button>
              </div>
              <div class="people">
                <label>群成员列表</label>
                <div class=" pre-scrollable" style="width: 100%">
                  <ul class="list-group">
                    <li class="list-group-item" style="display: flex" >
                      <label class="tit1">序号</label>
                      <label class="tit2">用户ID</label>
                      <label class="tit3">操作</label>
                    </li>
                    <li class="list-group-item" style="display: flex" v-for="(item,index) in userList" :key="index">
                      <label class="tit1">{{index+1}}</label>
                      <label class="tit2">{{item.member==null?'群主':item.member}}</label>
                      <label class="tit3" style="color: #00ceff" @click="delp(item.member)" >{{item.member==null?'群主不可删除':'移除该成员'}}</label>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
          <div class="modal-footer">
            <button type="button" class="btn btn-primary" data-dismiss="modal">关闭</button>
          </div>
        </div>
      </div>
    </div>

    <!--    模态框2-->
    <div class="modal fade" id="creategroups" tabindex="-1" role="dialog" aria-labelledby="myModalLabel" aria-hidden="true">
      <div class="modal-dialog">
        <div class="modal-content ">
          <div class="modal-header">
            <div class="writter">
              <label>
                创建群聊
              </label>
              <span></span>
            </div>
          </div>
          <div class="modal-body" style="font-family:'Microsoft YaHei'">
            <form class="forcon">
              <div class="form-group">
                <label>群组昵称:</label>
                <input type="text" placeholder="群组昵称" v-model="groupobj.groupname" class="cin">
              </div>
              <div class="form-group">
                <label>群组描述:</label>
                <textarea type="text" placeholder="群组描述" v-model="groupobj.desc" class="cin"></textarea>
              </div>
              <div class="form-group">
                <label>群主ID</label>
                <input type="text" placeholder="群主id" v-model="groupobj.ower" class="cin">
              </div>
              <div class="form-group">
                <label>是否公开群</label>
                <input type="checkbox">公开
                <input type="checkbox"> 不公开
              </div>
            </form>
          </div>
          <div class="modal-footer">
            <button type="button" class="btn btn-info" data-dismiss="modal">关闭</button>
            <button type="button" class="btn btn-primary" @click="createGroup">创建</button>
          </div>
        </div>
      </div>
    </div>

  </div>
</template>

<script>
    export default {
        name: "NewsTable",
      data(){
          return{
            groupList:[],
            serachGroup:'',
            groupobj:{
              groupname:'',
              desc:'',
              public:true,
              maxusers:'100',
              approval:false,
              ower:'',
            },
            addpeople:'',
            userList:[],
            detailID:''
          }
      },
      mounted(){
        this.$axios.get('http://a1.easemob.com/1105190519107267/wechart/chatgroups?limit=10',{
          headers:{
            Authorization:'Bearer YWMtchbE9IBNEem-JjVc39puVwAAAAAAAAAAAAAAAAAAAAF3UpIwejsR6ZvD73HlPqAcAgMAAAFq-Blb5ABPGgCrX8f6Q1nqPMClvuQpVWFHy7JFyoyhlVMN9Kq2KDpWcA'
          }
        })
          .then((response)=>{
            this.groupList=response.data.data
            //console.log(this.groupList)
          })
          .catch((error)=>{
            console.log(error)
          })
      },
      methods:{
        sea(){
          if(this.serachGroup.length>1)
          {
            var that=this
            this.$axios.get('http://a1.easemob.com/1105190519107267/wechart/chatgroups/'+that.serachGroup,{
              headers:{
                Authorization:'Bearer YWMtchbE9IBNEem-JjVc39puVwAAAAAAAAAAAAAAAAAAAAF3UpIwejsR6ZvD73HlPqAcAgMAAAFq-Blb5ABPGgCrX8f6Q1nqPMClvuQpVWFHy7JFyoyhlVMN9Kq2KDpWcA'
              }
            })
              .then((response)=>{
                var temp=response.data.data[0]
                var obj={
                  groupid:temp.id,
                  groupname:temp.name,
                  owner:"1_"+temp.owner,
                  affiliations:temp.affiliations_count
                }
                this.groupList=[]
                this.groupList.push(obj)
              })
              .catch((error)=>{
                console.log(error)
              })
          }
        },
        createGroup(){
          var that =this
          this.$axios({
            method: 'post',
            url:'http://a1.easemob.com/1105190519107267/wechart/chatgroups',
            headers:{
              Authorization:'Bearer YWMtchbE9IBNEem-JjVc39puVwAAAAAAAAAAAAAAAAAAAAF3UpIwejsR6ZvD73HlPqAcAgMAAAFq-Blb5ABPGgCrX8f6Q1nqPMClvuQpVWFHy7JFyoyhlVMN9Kq2KDpWcA'
            },
            data:{
              groupname:that.groupobj.groupname,
              desc:that.groupobj.desc,
              public:that.groupobj.public,
              maxusers:that.groupobj.maxusers,
              approval:that.groupobj.approval,
              owner:that.groupobj.ower
            }
          }).then((res)=>{
            if(res.status==200)
              alert("创建成功")
          }).catch((error)=>{
            alert("失败")
          })
        },
        deletegroup(ids){
          var that=this
          var res = confirm("确定删除？");
          if(res == true){
            this.$axios.delete('http://a1.easemob.com/1105190519107267/wechart/chatgroups/'+ids,{
              headers:{
                Authorization:'Bearer YWMtchbE9IBNEem-JjVc39puVwAAAAAAAAAAAAAAAAAAAAF3UpIwejsR6ZvD73HlPqAcAgMAAAFq-Blb5ABPGgCrX8f6Q1nqPMClvuQpVWFHy7JFyoyhlVMN9Kq2KDpWcA'
              }
            })
              .then((response)=>{
                alert("解除成功")
              })
              .catch((error)=>{
                console.log(error)
              })
          }else{
          }
        },
        getUserlist(gid){
          this.$axios.get('http://a1.easemob.com/1105190519107267/wechart/chatgroups/'+gid,{
            headers:{
              Authorization:'Bearer YWMtchbE9IBNEem-JjVc39puVwAAAAAAAAAAAAAAAAAAAAF3UpIwejsR6ZvD73HlPqAcAgMAAAFq-Blb5ABPGgCrX8f6Q1nqPMClvuQpVWFHy7JFyoyhlVMN9Kq2KDpWcA'
            }
          })
            .then((response)=>{
             this.userList=response.data.data[0].affiliations
            })
            .catch((error)=>{
              console.log(error)
            })
          this.detailID=gid
        },
        addp(){
          if (this.addpeople.length<1)
            alert("请输入用户ID")
          var that=this
          this.$axios({
            method: 'post',
            url:'http://a1.easemob.com/1105190519107267/wechart/chatgroups/'+that.detailID+'/users/'+that.addpeople,
            headers:{
              Authorization:'Bearer YWMtchbE9IBNEem-JjVc39puVwAAAAAAAAAAAAAAAAAAAAF3UpIwejsR6ZvD73HlPqAcAgMAAAFq-Blb5ABPGgCrX8f6Q1nqPMClvuQpVWFHy7JFyoyhlVMN9Kq2KDpWcA'
            }
          }).then((res)=>{
            console.log(res)
            if (res.status=='200')
              alert("添加成功")
          })
        },
        delp(uid){
          if (uid==null){
            alert("无法删除群主")
            return
          }

          var res = confirm("确定解除此人？");
          var that=this
          if(res == true){
            this.$axios.delete('http://a1.easemob.com/1105190519107267/wechart/chatgroups/'+that.detailID+'/users/'+uid,{
              headers:{
                Authorization:'Bearer YWMtchbE9IBNEem-JjVc39puVwAAAAAAAAAAAAAAAAAAAAF3UpIwejsR6ZvD73HlPqAcAgMAAAFq-Blb5ABPGgCrX8f6Q1nqPMClvuQpVWFHy7JFyoyhlVMN9Kq2KDpWcA'
              }
            })
              .then((response)=>{
                alert("解除成功")
              })
              .catch((error)=>{
                console.log(error)
              })
          }else{
          }
        }
      }
    }
</script>

<style scoped>
  .tit1{
    display: block;
    width: 100px;
    margin-left: 6%;
    text-align: center;
  }
  .tit2{
    display: block;
    width: 100px;
    margin-left: 24%;
    text-align: center;
  }
  .tit3{
    display: block;
    width: 100px;
    margin-left: 24%;
    text-align: center;
  }
  .addcontainer input{
    outline-style: none ;
    border: 1px solid #ccc;
    border-radius: 3px;
    width: 350px;
    height: 38px;
  }
  .addcontainer button{

    text-align: center;
  }
.forcon label{
  width: 150px;
}
  .cin{
    outline-style: none ;
    border: 1px solid #ccc;
    border-radius: 3px;
    width: 280px;
  }
  .reg{
    display: flex;
    padding: 5rpx;
    margin-left: 2%;
  }
  .reg div{
    display: flex;
    margin-left: 2%;
  }
  .fin{
    outline-style: none ;
    border: 1px solid #ccc;
    border-radius: 3px;

  }
  .norep{
    opacity: 0.9;
    background-color: #d0d5da;
  }
  form{
    color: #2e2f2f;
  }
  .modal-footer button{
    opacity: 0.7;
  }
.content label{
  border-left:3px solid #a92c2b;
  padding: 3px;
}
.content textarea{
    width: 100%;
    min-height: 160px;
}
  form label{
    color: #4e4f4f;
    font-weight: 500;
  }
  form input {
    opacity: 0.5;
  }
  form textarea{
    opacity: 0.5;
  }
  @keyframes stream {
  0%  {
    background-position: 0 0;
  }
  100% {
    background-position: -100% 0;
  }
  }
  .writter{
    display: flex;
    padding: 2px;
    margin: 0;
    border-top-left-radius: 40px;
    overflow: hidden;
    font-size: 1.2rem;
    font-style: oblique;
    text-align: left;
    line-height: 3rem;
    background-image: -webkit-linear-gradient(left, #b99011, #cedaff, #6aff02, #ffb22d, #FFDCDB 65%,green 65%,
    #c7c8d4 70%, #de000c 60%, #00ceff 75%, #6e6f6f 85%,#AEBCFF 100%);
    -webkit-text-fill-color: transparent;
    -webkit-background-clip: text;
    animation: stream 15s infinite linear;
    background-size: 200% 100%;
    background-color: #e6e6e6;
  }
  .duo{
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
    max-width: 120px;
  }
  .next{
    margin: 5px;
    padding-left: 36%;
  }
  .next button{
    margin-left: 10px;
  }
.mains{
    margin-top: 100px;
    padding: 0;
}
.content-panel {
  background: #ffffff;
  box-shadow: 0px 3px 2px #aab2bd;
  padding-top: 15px;
  padding-bottom: 5px;
}
.content-panel h4 {
  margin-left: 10px;
}
hr {
  margin-top: 20px;
  margin-bottom: 20px;
  border: 0;
  border-top: 1px solid #797979;
}
.table {
  width: 100%;
  max-width: 100%;
  margin-bottom: 20px;
}
table {
  background-color: transparent;
  border-spacing: 0;
  border-collapse: collapse;
}
thead {
  display: table-header-group;
  vertical-align: middle;
  border-color: inherit;
}
tr {
  display: table-row;
  vertical-align: inherit;
  border-color: inherit;
}
.table>thead>tr>th {
  vertical-align: bottom;
  border-bottom: 2px solid #ddd;
}
th {
  text-align: left;
}
tbody {
  display: table-row-group;
  vertical-align: middle;
  border-color: inherit;
}
.table-striped>tbody>tr:nth-of-type(odd) {
  background-color: #f9f9f9;
}
tr {
  display: table-row;
  vertical-align: inherit;
  border-color: inherit;
}
.table>tbody>tr>td{
  padding: 8px;
  line-height: 1.42857143;
  vertical-align: top;
  border-top: 1px solid #ddd;
}
.btn-xs {
  padding: 1px 5px;
  font-size: 12px;
  line-height: 1.5;
  border-radius: 3px;
}
</style>
