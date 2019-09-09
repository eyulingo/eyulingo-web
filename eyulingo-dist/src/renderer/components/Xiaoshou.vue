<template>
    <div>
        <el-input v-model="startTime" placeholder="起始时间"></el-input>
        <el-input v-model="endTime" placeholder="结束时间"></el-input>
         <el-button @click="readMasterUser() ">搜索</el-button>
    
    <div>
        <el-row>
            <el-col :span="24">
                <el-table size="mini" :data="master_user.data" border style="width: 100%" highlight-current-row v-loading="loading">
                    <el-table-column v-for="v in master_user.columns_good" :key="v.filed" :prop="v.field" :label="v.title" :width="v.width">
                        <template slot-scope="scope">
                            
                                <span v-if="v.field=='id'">
                                    {{scope.row[v.field]}}
                                </span>
                                <span v-else-if="v.field=='image_id'">
                                    <div v-if="!scope.row.isSet">
                                        <img v-if="scope.row.image_id" class="picture" :src="'http://47.103.15.32:8080/img/download?fileId='+scope.row.image_id" :style="styleModeList[scope.$index]">
                                        <img v-else src="https://cube.elemecdn.com/9/c2/f0ee8a3c7c9638a54940382568c9dpng.png" class="picture">
                                    </div>
                                    <el-upload
                                        v-else
                                        class="picture-uploader"
                                        action="http://47.103.15.32:8080/img/upload"
                                        :multiple="false"
                                        :with-credentials="true"
                                        :show-file-list="false"
                                        :on-success="(response)=>handlePictureSuccess(response, scope.$index, scope.row)"
                                        :before-upload="beforePictureUpload">
                                        <img v-if="scope.row.image_id" class="picture" :src="'http://47.103.15.32:8080/img/download?fileId='+scope.row.image_id" :style="styleModeList[scope.$index]">
                                        <img v-else src="https://cube.elemecdn.com/9/c2/f0ee8a3c7c9638a54940382568c9dpng.png" class="picture">
                                    </el-upload>
                                </span>
                                <span v-else-if="v.field=='tags' && !scope.row.isSet">
                                    <TagsBox
                                        :tags="scope.row.tags"
                                        :goodId="scope.row.id">
                                    </TagsBox>
                                </span>

                                <span v-else-if="v.field=='tags' && scope.row.isSet">
                                    <ReadOnlyTagsBox
                                            :tags="scope.row.tags"
                                            :goodId="scope.row.id">
                                    </ReadOnlyTagsBox>
                                </span>
                                <span v-else-if="!scope.row.isSet">
                                    {{scope.row[v.field]}}
                                </span>
                                <span v-else>
                                    <el-input size="mini" placeholder="请输入内容" v-model="master_user.sel[v.field]">
                                    </el-input>
                                </span>
                            
                        </template>
                    </el-table-column>
                </el-table>
            </el-col>
            <el-col :span="24">
                <div class="el-table-add-row" style="width: 99.2%;" @click="readMasterUser()"><span>刷新</span></div>
            </el-col>
        </el-row>
    </div>
    </div>
</template>

<script>
import axios from 'axios'
axios.defaults.baseURL="http://47.103.15.32:8082"
export default {
    name:'xiaoshou',
    data() {
        return {
            master_user: {
                sel: null,//选中行
                columns_good: [
                    { field: "id", title: "商品ID" ,width: 80},
                    { field: "image_id", title: "图片",width: 320},        
                    { field: "name", title: "商品名称", width: 100 },
                    { field: "price", title: "价格", width: 80 },
                    { field: "coupon_price", title: "优惠价格", width: 80 },
                    { field: "storage", title: "库存", width: 120 },
                    { field: "number", title: "销量" },
                    { field: "description", title: "描述",width: 220 }
                ],
                data: []
            },
            loading: false,
            styleModeList: [],
            startTime:"",
            endTime:"2019-9-9",
            values: {}
        }
    },
    created() {
        this.readMasterUser()
    },
    methods: {
        readMasterUser() {
            this.loading = true
            this.search()
            axios.get('/store/goods', {withCredentials: true}).then((res)=>{
                console.log(res.data)
                this.master_user.data = []
                res.data.values.forEach((element)=>{
                    if (element.hidden==false) {
                        if (!(this.values[element.name]==undefined))
                            element.number = this.values[element.name]
                        else
                            element.number = 0
                        console.log(element)
                        this.master_user.data.push(element)
                    }
                })
                this.loading = false
                this.styleModeList = []
                this.master_user.data.forEach((element, index, arr) => {
                    //console.log(index)
                    if (index==0) {
                        let len = arr.length
                        while(len>0) {
                            let styleMode = {}
                            this.styleModeList.push(styleMode)
                            len--
                        }
                    }
                    this.getImg('http://47.103.15.32:8080/img/download?fileId='+element.image_id, index, this)
                })
            })
        },
        getImg(src, index, vue) {
            console.log(src)
            var img = new Image()
            img.src = src
            img.onload = function () {
                var styleMode = {}
                styleMode.height = Math.ceil(this.height/this.width * 300)+'px'
                styleMode.width = '300px'
                vue.styleModeList.splice(index, 1, styleMode)
                console.log(vue.styleModeList)
            }
        },
        handlePictureSuccess(response, index, row) {
            if (!row.isSet) {
                console.log(response)
                let params = {
                    good_id: row.id,
                    name: row.name,
                    price: row.price,
                    coupon_price: row.coupon_price,
                    storage: row.storage,
                    description: row.description,
                    image_id: response.file_id,
                    hidden: row.hidden
                }
                let axiosConfig = {
                    headers: {
                        'Content-Type': 'application/json;charset=UTF-8',
                        'Access-Control-Allow-Origin': "*"
                    }
                }
                axios.post('/store/modifygood', params, axiosConfig).then((res)=>{
                    if (res.data.status=="ok") {
                        this.readMasterUser()
                        this.$message.success('更新商品图片成功。')
                    }else{
                        this.$message.error('更新商品图片失败。');
                    }
                })
            }else{
                this.master_user.sel.image_id = response.file_id

                row.image_id = response.file_id
                row.imgChanged = true
                this.master_user.data.splice(index, 1, row)
                var styleMode = {}
                this.styleModeList.push(styleMode)
                this.getImg('http://47.103.15.32:8080/img/download?fileId='+row.image_id, index, this)
            }
            
            this.$message.success('上传成功！')
        },
        beforePictureUpload(file) {
            const isLt2M = file.size / 1024 / 1024 < 2;

            if (!isLt2M) {
              this.$message.error('上传封面图片大小不能超过 2MB!');
            }
            return isLt2M;
        },
        search() {
            axios.get('/store/selectorders?startTime='+this.startTime+'&endTime='+this.endTime).then((res)=>{
                console.log(res.data)
                this.values = res.data.values
            })
        }
    }
}
</script>

