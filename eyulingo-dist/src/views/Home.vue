<template>
  <el-container style="border: 1px solid #eee" direction="vertical">
    <el-header style="text-align: right; font-size: 12px">
      <span>王小虎</span>
    </el-header>

    <el-container>
      <el-aside style="width: 300px; background-color: rgb(238, 241, 246)">
        <el-menu router default-active="/distInfo">
          <el-menu-item index="/distInfo">我的信息</el-menu-item>
          <el-menu-item index="/storeInfo">我的店铺</el-menu-item>
          <el-menu-item index="3">商品信息</el-menu-item>
          <el-menu-item index="4">我的订单</el-menu-item>
        </el-menu>
      </el-aside>
      <el-main>
        <router-view/>
      </el-main>
    </el-container>
  </el-container>
</template>


<style>
  .el-header {
    background-color: #B3C0D1;
    color: #333;
    line-height: 60px;
  }
  
  .el-aside {
    color: #333;
  }
</style>

<script>
  export default {
    data() {
      return {
        tableData: []
      }
    }
  };
</script>