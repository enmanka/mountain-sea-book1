<template>
    <div class="container">
      <span>
        <RouterLink to="/vue1">
          <div>
            <img src="../img/2/1.png">
          </div>
        </RouterLink>
      </span>
      <span>
        <RouterLink to="/vue2">
          <div>
            <img src="../img/2/2.png">
          </div>
        </RouterLink>
      </span>
      <span>
        <RouterLink to="/vue3">
          <div>
            <img src="../img/2/3.png">
          </div>
        </RouterLink>
      </span>
      <span>
        <RouterLink to="/vue4">
          <div>
            <img src="../img/2/4.png">
          </div>
        </RouterLink>
      </span>
    </div>
  </template>
  
  <script>
  export default {
    // 组件逻辑
  }
  </script>
  
  <style scoped>
  .container {
    display: flex; /* 设置为 Flexbox 布局 */
  }
  
  span {
    margin: 0%;
  }
  </style>
  