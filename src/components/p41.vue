<template>
    <div class="img1">
        <el-container>

          <el-container >
            <el-header class="head2">
              <img src="../img/4/版本源流.png">
            </el-header>
            <el-main>
              <router-view></router-view>
            </el-main>
          </el-container>

        </el-container>
      </div>

  </template>
  


<script>
import index4 from './index4.vue';
import figure4 from './f4.vue';
import router from '@/router';
// import figure12 from './figure12.vue';
export default{
    data()
    {return{

    }},
    components:{
      index4,
      figure4,
    //   figure12,
    },
}
</script>

<style lang="less">
.img1{
  /* 设置背景图片 */
  background-image: url("src/img/1/background.png");

  /*设置背景图片覆盖整个元素*/
  background-size: cover;
  background-position: center;

  /* 设置元素的高度和宽度，确保它覆盖整个web界面 */
  height: 100vh; /* 视口高度 */
  width: 100vw; /* 视口宽度 */

  /* 为了防止页面滚动，移除默认的外边距 */
  margin: 0;
  padding: 0%;


    .el-container{
    height: 100%;
    .el-aside{
      .el-header{
        height: 200px;
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