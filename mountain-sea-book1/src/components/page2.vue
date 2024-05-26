<template>
    <div class="img1">
        <el-container>
          <el-aside width="300px">
              <el-header><index2/></el-header>
              <el-main>
              </el-main>
          </el-aside>

          <el-container >
            <el-header class="head2">
              <img src="../img/2/生物特性及功效.png">
            </el-header>
            <el-main>
                <figure2></figure2>
            </el-main>
          </el-container>

        </el-container>
      </div>

  </template>
  


<script>
import index2 from './index2.vue';
import figure2 from './figure2.vue';
export default{
    data()
    {return{

    }},
    components:{
      index2,
      figure2,
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