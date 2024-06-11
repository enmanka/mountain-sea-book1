<template>
  <div class="img1">
    <el-container>
      <el-container>
        <el-aside width="500px">
          <el-header>
            <img src="../img/3/神话人物及其分类.png" />
          </el-header>
          <el-main>
            <pic11 />
          </el-main>
        </el-aside>

        <el-aside width="700px">
          <el-header>
            <img src="../img/3/氏族信息.png" />
          </el-header>
          <el-main>
            <pic9 />
          </el-main>
        </el-aside>
      </el-container>
    </el-container>
  </div>
</template>
  


<script>
import index3 from "./index3.vue";
import figure3 from "./figure3.vue";
import pic11 from "./11.vue";
import pic9 from "./9.vue";
export default {
  data() {
    return {};
  },
  components: {
    index3,
    figure3,
    pic11,
    pic9,
    //   figure12,
  },
};
</script>

<style lang="less">
.img1 {
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

  .el-container {
    height: 100%;
    .el-aside {
      .el-header {
        height: 200px;
      }
    }
    .el-container {
      margin-top: 20px;
      .el-header {
        height: 50px;
      }
    }
  }
}
</style>