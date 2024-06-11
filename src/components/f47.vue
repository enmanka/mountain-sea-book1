<template>
    <div class="container">
      <div class="pic1">
        <RouterLink to="/vue4/p1" class="image-link image1">
          <img src="../img/his/1.png" width="110px">
        </RouterLink>
        <RouterLink to="/vue4/p2" class="image-link image2">
          <img src="../img/his/2.png" width="134px">
        </RouterLink>
        <RouterLink to="/vue4/p3" class="image-link image3">
          <img src="../img/his/3.png" width="130px">
        </RouterLink>
        <RouterLink to="/vue4/p4" class="image-link image4">
          <img src="../img/his/4.png" width="140px">
        </RouterLink>
        <RouterLink to="/vue4/p5" class="image-link image5">
          <img src="../img/his/5.png" width="125px">
        </RouterLink>
        <RouterLink to="/vue4/p6" class="image-link image6">
          <img src="../img/his/6.png" width="120px">
        </RouterLink>
        <RouterLink to="/vue4/p7" class="image-link image7">
          <img src="../img/his/7.png" width="125px">
        </RouterLink>
      </div>
  
        <div class="pic2">
            <div class = "d1">明嘉靖十三年黄省曾山海经水经合刻本</div>
            <div class = "d2">明代</div>
            <div class = "d3"> 湖南</div>
            <div class = "d4">湖南图书馆</div>
        </div>
    </div>
  </template>
  
  <script>
  export default {
    name: 'ImageComponent'
  }
  </script>
  
  <style scoped>
  .container {
    display: flex;
    align-items: center;
    justify-content: flex-start;
    width: 100%;
    position: relative;
  }
  
  .pic1 {
    width: 560px;
    height: 740px;
    padding: 0;
    background-image: url('../img/his/dra.png');
    background-size: cover;
    background-position: center;
    position: relative; /* 相对定位，使内部的绝对定位元素以此为参考 */
  }
  
  .pic2 {
    width: 750px;
    height: 400px;
    margin-left: 50px; /* 确保 pic2 与 pic1 之间有一定的间距 */
    margin-bottom: 200px;
    background-image: url('../img/q7.png');
    background-size: cover;
    background-position: center;
  }
  
  .image-link {
    position: absolute;
  }
  
  .image1 {
    top: 0%;
    left: 61%;
  }
  
  .image2 {
    top: 19.8%;
    left: 74%;
  }
  
  .image3 {
    top: 16%;
    left: 27%;
  }
  
  .image4 {
    top: 31%;
    left: 1%;
  }
  
  .image5 {
    top: 47%;
    left: 23%;
  }
  
  .image6 {
    top: 41.5%;
    left: 68%;
  }
  
  .image7 {
    top: 69%;
    left: 35%;
  }
  
  .d1
{
    margin-top: 87px;
    margin-left: 350px;
    font-family: "STZhongsong";
    font-size: 19px;   
}
.d2
{
    margin-top: 60px;
    margin-left: 350px;
    font-family: "STZhongsong";
    font-size: 19px;   
}
.d3
{
    margin-top: 60px;
    margin-left: 350px;
    font-family: "STZhongsong";
    font-size: 19px;   
}
.d4
{
    margin-top: 62px;
    margin-left: 350px;
    font-family: "STZhongsong";
    font-size: 19px;   
}    

.pic1 img:hover {
  transform: scale(1.1); /* 可选：悬停放大效果 */
}
  </style>
  



