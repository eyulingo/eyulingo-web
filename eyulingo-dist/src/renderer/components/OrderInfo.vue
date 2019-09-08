<template>
    <div v-loading="loading">
        <el-card v-for="order in orders" :key="order.bill_id" class="box-card">
            <div slot="header">
                <el-alert
                    v-if="order.order_status=='received'"
                    :title="cnStatus[order.bill_id]"
                    type="success"
                    effect="dark"
                    :closable="false">
                </el-alert>
                <el-alert
                    v-else-if="order.order_status=='transporting'"
                    :title="cnStatus[order.bill_id]"
                    type="info"
                    effect="dark"
                    :closable="false">
                </el-alert>
                <el-alert
                    v-else-if="order.order_status=='pending'"
                    :title="cnStatus[order.bill_id]"
                    type="warning"
                    effect="dark"
                    :closable="false">
                </el-alert>
            </div>
            <el-form :model="order" label-width="90px">   
                <el-form-item v-for="column in columns" :key="column.field" :label="column.title" style="text-align: left">
                    <span v-if="column.field!=='order_status' && column.field!=='comment_content' && column.field!=='star_count'">
                        {{order[column.field]}}
                    </span>
                    <span v-else-if="column.field==='star_count' && !order['rated']">
                        {{"尚未评价"}}
                    </span>
                    <span v-else-if="column.field==='comment_content' && !order['rated']">
                        {{"尚未评价"}}
                    </span>
                    <span v-else-if="column.field==='star_count' && order['rated']">
                        {{ order[column.field] + "分"}}
                    </span>
                    <span v-else-if="column.field==='comment_content' && order['rated']">
                        {{order[column.field]}}
                    </span>
                    <div v-else>
                        <span>{{cnStatus[order.bill_id]}}</span>
                        <el-button 
                            v-if="order.order_status=='pending'"
                            @click="statusChange(order)"
                            style="margin-left: 10px">
                            发货
                        </el-button>
                    </div>
                </el-form-item>
                
                <el-form-item label="订单明细" style="text-align: left"></el-form-item>
                <el-table :data="order.goods" border style="width: 90%" highlight-current-row>
                    <el-table-column v-for="column in goodColumn" 
                        :key="column.field" :prop="column.field" 
                        :label="column.title" :width="column.width">
                         <template slot-scope="scope">
                            <span v-if="column.field!='image_id'">
                                {{scope.row[column.field]}}
                            </span>
                            <div v-else>
                                 <img
                                    :src="'http://47.103.15.32:8080/img/download?fileId='+scope.row.image_id"
                                    :style="order.styleModeList[scope.$index]">
                            </div>
                        </template>
                    </el-table-column>
                </el-table>

                <div v-if="order.rated==true">
                    <el-card class="comment_card">
                        <div slot="header" class="clearfix">
                            <span>用户评价</span>
                           <el-rate
                                :value="order.star_count"
                                disabled
                                show-score
                                text-color="#ff9900"
                                score-template="{value}">
                            </el-rate>
                        </div>
                        <span style="word-break: break-all; word-wrap: break-word">
                            {{order.comment_content}}
                        </span>
                    </el-card>
                </div>
            </el-form>
        </el-card>
    </div>
    
</template>

<script>
import axios from 'axios'
axios.defaults.baseURL="http://47.103.15.32:8082"
export default {
    name: 'storeInfo',
    data() {
        return {
            columns: [
                { field: "bill_id", title: "订单编号： " },
                { field: "username", title: "用户名： " },
                { field: "receiver", title: "收货人： " },
                { field: "receiver_phone", title: "收货电话： " },
                { field: "receiver_address", title: "收货地址： " },
                { field: "transport_method", title: "配送方式： " },
                { field: "order_status", title: "订单状态： " },
                { field: "star_count", title: "用户评分： " },
                { field: "comment_content", title: "评价内容： " }
            ],
            orderStatus:[
                { field: "unpurchased", title: "未支付" },
                { field: "pending", title: "待发货" },
                { field: "transporting", title: "配送中" },
                { field: "received", title: "已收货" },
                { field: "invalid", title: "无效" }
            ],
            goodColumn: [
                { field: "id", title: "商品ID" },
                { field: "image_id", title: "商品图片", width: "320px" },
                { field: "name", title: "商品名称" },
                { field: "store", title: "商店名称" },
                { field: "current_price", title: "购入价格" },
                { field: "amount", title: "购入数目" },
                { field: "description", title: "商品描述" }
            ],
            styleModeList: [],
            orders:[],
            loading: false
        }
    },
    components: {

    },
    created() {
        this.readOrders()
    },
    computed: {
        cnStatus: function () {
            var chineseStatus = new Map()
            this.orders.forEach((element)=>{
                switch (element.order_status) {
                    case "unpurchased":
                        chineseStatus[element.bill_id] = "未支付"
                        break
                    case "pending":
                        chineseStatus[element.bill_id] = "待发货"
                        break
                    case "transporting":
                        chineseStatus[element.bill_id] = "配送中"
                        break
                    case "received":
                        chineseStatus[element.bill_id] = "已收货"
                        break
                    case "invalid":
                        chineseStatus[element.bill_id] = "无效"
                        break
                    default:
                        break
                }
            })
            return chineseStatus
        }
    },
    methods: {

        readOrders() {
            this.loading = true
            axios.get('/store/orders', {
                withCredentials: true
            }).then((res)=>{
                console.log(res.data.values)
                if (res.data.status=="ok") {
                    var orders = res.data.values
                    orders.forEach((element, index, arr)=>{
                        if (element.order_status!="unpurchased"&&
                            element.order_status!="invalid") {
                            element.styleModeList = []
                            element.goods.forEach((ele, index, arr)=>{
                                if (index==0) {
                                    let len = arr.length
                                    while(len>0) {
                                        let styleMode = {}
                                        element.styleModeList.push(styleMode)
                                        len--
                                    }
                                }
                                var img = new Image()
                                img.src = 'http://47.103.15.32:8080/img/download?fileId='+ele.image_id
                                img.onload = function () {
                                    var styleMode = {}
                                    styleMode.height = Math.ceil(img.height/img.width*300)+'px'
                                    styleMode.width = '300px'
                                    element.styleModeList.splice(index, 1, styleMode)
                                }
                            })
                        }else{
                            arr.splice(index, 1)
                        }
                    })
                    this.orders = orders
                    this.loading = false
                }else{
                    this.loading = false
                    this.$message.error("获取订单出错。")
                }
            })
        },
        statusChange(order) {

            this.$confirm('请问您确认要发货吗?', '提示', {
                confirmButtonText: '确定',
                cancelButtonText: '取消',
                type: 'info'
            }).then(() => {
                console.log(order)
                let axiosConfig = {
                    headers: {
                        'Content-Type': 'application/json;charset=UTF-8',
                        'Access-Control-Allow-Origin': "*"
                    },
                    withCredentials: true
                }
                let params = {
                    id: order.bill_id,
                    status: "transporting"
                }
                console.log(params)
                axios.post('/store/setorder', params, axiosConfig).then((res)=>{
                    if (res.data.status=="ok") {
                        this.$message.success("发货成功。")
                    }else{
                        this.$message.error("发货失败。")
                    }
                })
            }).catch(() => {
                this.$message({
                    type: 'info',
                    message: '已取消'
                })          
            })
            this.readOrders()
        },
        dist_logout() {
            axios.post('/logout', {}).then((res)=>{
                if (res.data.status=="ok") {
                    this.$router.replace({
                        path:'/'
                    })
                }
            })
        }
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
  
  .comment_card {
    margin-top: 30px; 
    width: 480px;
    text-align: left;
  }

</style>
