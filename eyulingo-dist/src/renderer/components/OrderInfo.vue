<template>
    <el-card class="box-card">
        <div slot="header" class="clearfix">
            <span>卡片名称</span>
            <el-button style="float: right; padding: 3px 0" type="text">操作按钮</el-button>
        </div>
        
    </el-card>
</template>

<script>
export default {
    name: 'storeInfo',
    data() {
        return {
            columns: [
                { field: "username", title: "用户名" },
                { field: "receiver", title: "收货人" },
                { field: "receiver_phone", title: "收货电话" },
                { field: "receiver_address", title: "收货地址" },
                { field: "transport_method", title: "配送方式" },
            ]
        }
    },
    components: {

    },
    created() {

    },
    methods: {
        
    }
}
</script>

<style>
  .text {
    font-size: 14px;
    text-align: left;
  }

  .item {
    margin-bottom: 18px;
  }

  .clearfix:before,
  .clearfix:after {
    display: table;
    content: "";
    
  }
  .clearfix:after {
    clear: both;
  }

</style>
