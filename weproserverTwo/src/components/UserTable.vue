<template>
  <div class="mm" style="font-family:'Microsoft YaHei'">
    <div class="content-panel fixs">
      <h4>User Table</h4>
      <hr>
      <div class="reg">
        <button class="btn btn-info" data-toggle="modal" data-target="#detail">+创建用户</button>
        <div>
          <input type="text" class="fin" v-model="findid"  placeholder="搜索用户">
          <button class="btn btn-danger" @click="search" style="margin-left: 10rpx">find</button>
        </div>
      </div>
      <table class="table table-hover">
        <thead>
        <tr>
          <th>用户ID</th>
          <th>用户昵称</th>
          <th>在线状态</th>
          <th>免打扰</th>
          <th>操作</th>
        </tr>
        </thead>
        <tbody>
        <tr v-for="(item,index) in userList" :key="index">
          <td class="hidden-phone">{{item.username}}</td>
          <td>{{item.nickname}} </td>
          <td><img src="../assets/onl.png" style="width: 30px;margin-left: 20px" data-toggle="modal" data-target="#online" @click="online(item.username)"></td>
          <td>{{item.activated?'未开启':'开启'}}</td>
          <td>
            <button class="btn  btn-xs">
              <img src="../assets/trash.png" @click="deleteuser(item.username)" style="width: 20px;height: 20px">
            </button>
            <button class="btn  btn-xs" @click="enterFriend(item.username)" data-toggle="modal" data-target="#more">
              <img src="../assets/xial.png" style="width: 20px;height: 20px">
            </button>
          </td>
        </tr>
        </tbody>
      </table>
      <div class="next">
        <button class="btn btn-info" @click="last">上一页</button>
        <button class="btn btn-success" @click="next">下一页</button>
      </div>
    </div>


    <!--    模态框-->
    <div class="modal fade" id="detail" tabindex="-1" role="dialog" aria-labelledby="myModalLabel" aria-hidden="true">
      <div class="modal-dialog">
        <div class="modal-content norep">
          <div class="modal-header">
            <div class="writter">
              <label>
                创建新用户
              </label>
            </div>
          </div>
          <div class="modal-body">
            <form>
              <div class="form-group">
                <label>用户ID：</label>
                <input type="text" placeholder="用户ID" class="cin" v-model="id">
              </div>
              <div class="form-group">
                <label>昵称：</label>
                <input type="text" placeholder="用户昵称"  class="cin" v-model="nickname">
              </div>
              <div class="form-group">
                <label>密码：</label>
                <input type="text"  class="cin" v-model="psw">
              </div>
              <div class="form-group">
                <label>确认密码</label>
                <input type="text"  class="cin" v-model="rpsw">
              </div>
            </form>
          </div>
          <div class="modal-footer">
            <button type="button" class="btn btn-info" data-dismiss="modal">取消</button>
            <button type="button" class="btn btn-primary" @click="register">保存</button>
          </div>
        </div>
      </div>
    </div>


    <!--    模态框2-->
    <div class="modal fade" id="more" tabindex="-1" role="dialog" aria-labelledby="myModalLabel" aria-hidden="true">
      <div class="modal-dialog">
        <div class="modal-content norep">
          <div class="modal-header">
            <div class="writter">
              <label>
                用户信息
              </label>
            </div>
          </div>
          <div class="modal-body">
            <div style="margin-bottom: 20px">
              <input type="text" class="fin" v-model="friend_username"  placeholder="添加好友" style="height: 38px;width: 400px">
              <button class="btn btn-danger" style="margin-left: 3px;margin-top: -6px" @click="addfriend">add</button>
            </div>
            <div class=" pre-scrollable" style="width: 100%">
              <ul class="list-group">
                <li class="list-group-item" style="display: flex">
                  <label class="tit">好友序号</label>
                  <label class="tit">用户ID</label>
                  <label class="tit">操作</label>
                </li>
                <li class="list-group-item" style="display: flex" v-for="(item,index) in friendList" :key="index">
                  <label class="tit">{{index+1}}</label>
                  <label class="tit">{{item}}</label>
                  <label class="tit" style="color: #00ceff" @click="deleteF(item)">删除好友</label>
                </li>
              </ul>
            </div>
          </div>
          <div class="modal-footer">
            <button type="button" class="btn btn-info" data-dismiss="modal">取消</button>
          </div>
        </div>
      </div>
    </div>


    <div class="modal fade" id="online" tabindex="-1" role="dialog" aria-labelledby="myModalLabel" aria-hidden="true">
      <div class="modal-dialog">
        <div class="modal-content norep">
          <div class="modal-header">
            <div class="writter">
              <label>
                用户在线状态:<span style="color: #ff5143">{{isonline?'在线':'离线'}}</span>
              </label>
            </div>
          </div>
          <div class="modal-footer">
            <button class="btn btn-danger" @click="leave">强制登出</button>
            <button type="button" class="btn btn-info" data-dismiss="modal">取消</button>
          </div>
        </div>
      </div>
    </div>

  </div>
</template>

<script>
    export default {
        name: "UserTable",
      data(){
        return{
          userList:[],
          cursor:'',
          id:'',
          nickname:'',
          psw:'',
          rpsw:'',
          findid:'',
          friendList:[],
          friend_username:'',
          owner_username:'',
          isonline:false,
          leave_user:''
        }
      },
      methods:{
          next(){
            var that=this
            this.$axios.get('http://a1.easemob.com/1105190519107267/wechart/users?limit=10&cursor='+that.cursor,{
              headers:{
                Authorization:'Bearer YWMtchbE9IBNEem-JjVc39puVwAAAAAAAAAAAAAAAAAAAAF3UpIwejsR6ZvD73HlPqAcAgMAAAFq-Blb5ABPGgCrX8f6Q1nqPMClvuQpVWFHy7JFyoyhlVMN9Kq2KDpWcA'
              }
            })
              .then((response)=>{
                this.userList=response.data.entities
                this.cursor=response.data.cursor
              })
              .catch((error)=>{
                console.log(error)
              })
          },
        last(){
            var that=this
          this.$axios.get('http://a1.easemob.com/1105190519107267/wechart/users?limit=10',{
            headers:{
              Authorization:'Bearer YWMtchbE9IBNEem-JjVc39puVwAAAAAAAAAAAAAAAAAAAAF3UpIwejsR6ZvD73HlPqAcAgMAAAFq-Blb5ABPGgCrX8f6Q1nqPMClvuQpVWFHy7JFyoyhlVMN9Kq2KDpWcA'
            }
          })
            .then((response)=>{
              this.userList=response.data.entities
              this.cursor=response.data.cursor
            })
            .catch((error)=>{
              console.log(error)
            })
        },
        register(){
            if(this.id.length<1||this.nickname.length<1||this.psw.length<1||this.psw!=this.rpsw)
              alert("输入信息有误")
          else
            {
              var that=this
              this.$axios({
                method: 'post',
                url:'http://a1.easemob.com/1105190519107267/wechart/users',
                headers:{
                  Authorization:'Bearer YWMtchbE9IBNEem-JjVc39puVwAAAAAAAAAAAAAAAAAAAAF3UpIwejsR6ZvD73HlPqAcAgMAAAFq-Blb5ABPGgCrX8f6Q1nqPMClvuQpVWFHy7JFyoyhlVMN9Kq2KDpWcA'
                },
                data: {
                    username: that.id,
                    password: that.psw,
                    nickname: that.nickname
                }
              }).then((res)=>{
                  console.log(res)
                if (res.status=='200')
                  alert("创建成功")
              })
            }
        },
        search(){
            if(this.findid.length>1){
              var that=this
              this.$axios.get('http://a1.easemob.com/1105190519107267/wechart/users/'+that.findid,{
                headers:{
                  Authorization:'Bearer YWMtchbE9IBNEem-JjVc39puVwAAAAAAAAAAAAAAAAAAAAF3UpIwejsR6ZvD73HlPqAcAgMAAAFq-Blb5ABPGgCrX8f6Q1nqPMClvuQpVWFHy7JFyoyhlVMN9Kq2KDpWcA'
                }
              })
                .then((response)=>{
                  this.userList=response.data.entities
                })
                .catch((error)=>{
                  alert("用户不存在")
                  console.log(error)
                })
            }
        },
        enterFriend(uid){
            this.owner_username=uid
          this.$axios.get('http://a1.easemob.com/1105190519107267/wechart/users/'+uid+'/contacts/users',{
            headers:{
              Authorization:'Bearer YWMtchbE9IBNEem-JjVc39puVwAAAAAAAAAAAAAAAAAAAAF3UpIwejsR6ZvD73HlPqAcAgMAAAFq-Blb5ABPGgCrX8f6Q1nqPMClvuQpVWFHy7JFyoyhlVMN9Kq2KDpWcA'
            }
          })
            .then((response)=>{
             // console.log(response)
              this.friendList=response.data.data
            })
            .catch((error)=>{
              console.log(error)
            })
        },
        addfriend(){
            var that =this
          this.$axios({
            method: 'post',
            url:'http://a1.easemob.com/1105190519107267/wechart/users/'+that.owner_username+'/contacts/users/'+that.friend_username,
            headers:{
              Authorization:'Bearer YWMtchbE9IBNEem-JjVc39puVwAAAAAAAAAAAAAAAAAAAAF3UpIwejsR6ZvD73HlPqAcAgMAAAFq-Blb5ABPGgCrX8f6Q1nqPMClvuQpVWFHy7JFyoyhlVMN9Kq2KDpWcA'
            }
          }).then((res)=>{
            if(res.status==200)
              alert("添加成功")
          }).catch((error)=>{
            alert("失败")
          })
        },
        deleteF(friend){
            var that=this
            var res = confirm("确定解除此好友？");
          if(res == true){
            this.$axios.delete('http://a1.easemob.com/1105190519107267/wechart/users/'+that.owner_username+'/contacts/users/'+friend,{
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
        deleteuser(user){
          var that=this
          var res = confirm("确定删除？");
          if(res == true){
            this.$axios.delete('http://a1.easemob.com/1105190519107267/wechart/users/'+user,{
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
        online(uid){
          this.leave_user=uid
          var that=this
          this.$axios.get('http://a1.easemob.com/1105190519107267/wechart/users/'+uid+'/status',{
            headers:{
              Authorization:'Bearer YWMtchbE9IBNEem-JjVc39puVwAAAAAAAAAAAAAAAAAAAAF3UpIwejsR6ZvD73HlPqAcAgMAAAFq-Blb5ABPGgCrX8f6Q1nqPMClvuQpVWFHy7JFyoyhlVMN9Kq2KDpWcA'
            }
          })
            .then((response)=>{
              response.data.data[uid]=='offline'?(that.isonline=false):(that.isonline=true)
            })
            .catch((error)=>{
              console.log(error)
            })
        },
        leave(){
            //console.log(this.leave_user)
          var that=this
          this.$axios.get('http://a1.easemob.com/1105190519107267/wechart/users/'+that.leave_user+'/disconnect',{
            headers:{
              Authorization:'Bearer YWMtchbE9IBNEem-JjVc39puVwAAAAAAAAAAAAAAAAAAAAF3UpIwejsR6ZvD73HlPqAcAgMAAAFq-Blb5ABPGgCrX8f6Q1nqPMClvuQpVWFHy7JFyoyhlVMN9Kq2KDpWcA'
            }
          })
            .then((response)=>{
              alert("下线成功")
            })
            .catch((error)=>{
              console.log(error)
            })
        }
      },
      mounted(){
          var that=this
        this.$axios.get('http://a1.easemob.com/1105190519107267/wechart/users?limit=10',{
          headers:{
            Authorization:'Bearer YWMtchbE9IBNEem-JjVc39puVwAAAAAAAAAAAAAAAAAAAAF3UpIwejsR6ZvD73HlPqAcAgMAAAFq-Blb5ABPGgCrX8f6Q1nqPMClvuQpVWFHy7JFyoyhlVMN9Kq2KDpWcA'
          }
        })
          .then((response)=>{
            this.userList=response.data.entities
            this.cursor=response.data.cursor
          })
          .catch((error)=>{
            console.log(error)
          })

      }
    }
</script>

<style scoped>
  .tit{
    margin-left: 8%;
  }
  .modal-body label{
    width: 100px;
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



  .touxiang{
    width: 40px;
    height: 40px;
    border-radius: 100px;
  }
  .mm{
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
    text-align: left;
  }
  tbody {
    display: table-row-group;
    vertical-align: middle;
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
  .next{
    margin: 5px;
    padding-left: 36%;
  }
</style>
