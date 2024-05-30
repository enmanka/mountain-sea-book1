<template>
    <div class="img1">
        <el-container>
          <el-aside width="400px">
              <el-header>
                <index1/>
              </el-header>

              <el-main>
                <figure11></figure11>
              </el-main>
          </el-aside>

          <el-container >
            <el-header class="head2">
              <img src="../img/1/山海经整体信息.png">
            </el-header>
            
            <el-main>
              <figure14/>
            </el-main>
          </el-container>

        </el-container>
      </div>

  </template>
  


<script>
import index1 from './index1.vue';
import figure11 from './figure11.vue';
import figure12 from './figure12.vue';
import figure14 from './figure14.vue';
import figure15 from './figure15.vue';
export default{
    data()
    {return{

    }},
    components:{
      index1,
      figure11,
      figure12,
      figure14,
      figure15
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
    height: 100%;
    .el-aside{
      .el-header{
        height: 100px;
      }
    }
    .el-container{
      .el-header{
        height: 50px;
      }
    }
  }
}


</style>