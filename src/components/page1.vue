<template>
    <div class="img1">
        <el-container>
          <el-aside>
            <el-header>
              <img src="../img/1/山海经分为.png" class="pic">
            </el-header>

              <el-main>
                <figure11/>
              </el-main>

          </el-aside>

          <el-container >
            <el-header class="head2">
              <img src="../img/1/山海经整体信息.png">
            </el-header>

            <el-main>
              <figure13/>
            </el-main>
          </el-container>

        </el-container>
      </div>

  </template>
  


<script>
import index1 from './index1.vue';
import figure11 from './figure11.vue';
import figure13 from './figure13.vue';
import figure14 from './figure14.vue';
export default{
    data()
    {return{

    }},
    components:{
      index1,
      figure11,
      figure13,
      figure14,
    },
}
</script>

<style lang="less" scoped>
.img1{

  background-image: url("src/img/1/background.png");
  background-size: cover;
  background-position: center;
  height: 100vh; /* 视口高度 */
  width: 100vw; /* 视口宽度 */

  margin: 0;
  padding: 0%;


    .el-container{
    margin-left: 30px;
    height: 100%;
      .el-aside{
        width: 430px;
        padding:0;
        .el-header{
          height: 330px;
          padding: 50px;
        }
        .el-main{
          width: 400px;
          padding-top: 50px;
          padding-left: 0%;
          padding-right: 0;
        }
      }
      .el-container{

        .el-main{
          padding-left: 0%;
        }
      }
  }
}


</style>