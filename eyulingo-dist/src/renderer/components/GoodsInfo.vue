<template>
    <div>
        <el-dialog title="请上传商品图片" :visible.sync="dialogUploadVisible">
        </el-dialog>
        <el-row>
            <el-col :span="24">
                <el-table size="mini" :data="master_user.data" border style="width: 100%" highlight-current-row v-loading="loading">
                    <el-table-column v-for="v in master_user.columns_good" :key="v.filed" :prop="v.field" :label="v.title" :width="v.width">
                        <template slot-scope="scope">
                            <div v-if="scope.row.hidden==false">
                                <span v-if="v.field=='id'">
                                    {{scope.row[v.field]}}
                                </span>
                                <span v-else-if="v.field=='image_id'">
                                    <el-upload
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
                                <span v-else-if="v.field=='tags'">

                                </span>
                                <span v-else-if="!scope.row.isSet">
                                    {{scope.row[v.field]}}
                                </span>
                                <span v-else>
                                    <el-input size="mini" placeholder="请输入内容" v-model="master_user.sel[v.field]">
                                    </el-input>
                                </span>
                            </div>
                        </template>
                    </el-table-column>
                    <el-table-column label="操作" width="100">
                        <template slot-scope="scope">
                            <span class="el-tag el-tag--info el-tag--mini" style="cursor: pointer;" @click="pwdChange(scope.row,scope.$index,true)">
                                {{scope.row.isSet?"保存":"修改"}}
                            </span>
                            <span v-if="!scope.row.isSet" class="el-tag el-tag--danger el-tag--mini" style="cursor: pointer;" @click="deleteMasterUser(scope.$index)">
                                删除
                            </span>
                            <span v-else class="el-tag  el-tag--mini" style="cursor: pointer;" @click="pwdChange(scope.row,scope.$index,false)">
                                取消
                            </span>
                        </template>
                    </el-table-column>
                </el-table>
            </el-col>
            <el-col :span="24">
                <div class="el-table-add-row" style="width: 99.2%;" @click="addMasterUser()"><span>+ 添加</span></div>
            </el-col>
            <el-col :span="24">
                <div class="el-table-add-row" style="width: 99.2%;" @click="readMasterUser()"><span>刷新</span></div>
            </el-col>
        </el-row>
    </div>
</template>

<script>
import axios from 'axios'
//axios.defaults.baseURL="http://localhost:8080"
axios.defaults.baseURL="http://47.103.15.32:8082"
export default {
    name: 'goodsInfo',
    data() {
        return {
            master_user: {
                sel: null,//选中行
                columns_good: [
                    { field: "id", title: "商品ID" ,width: 120},
                    { field: "image_id", title: "图片",width: 320},        
                    { field: "name", title: "商品名称", width: 120 },
                    { field: "price", title: "价格", width: 120 },
                    { field: "coupon_price", title: "优惠价格", width: 120 },
                    { field: "storage", title: "库存", width: 120 },
                    { field: "description", title: "描述",width: 220 },
                    { field: "tags", title: "标签"}
                ],
                data: []
            },
            loading: false,
            dialogUploadVisible: false,
            styleModeList: []
        }
    },
    created() {
        this.readMasterUser()
    },
    methods: {
        readMasterUser() {
            this.loading = true
            axios.get('/store/goods', {withCredentials: true}).then((res)=>{
                console.log(res.data)
                this.master_user.data = res.data.values
                this.loading = false
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
            this.$message.success('上传成功！')
        },
        beforePictureUpload() {
            const isLt2M = file.size / 1024 / 1024 < 2;

            if (!isLt2M) {
              this.$message.error('上传封面图片大小不能超过 2MB!');
            }
            return isLt2M;
        },
        addMasterUser() {
            for (let i of this.master_user.data) {
                if (i.isSet) return this.$message.warning("请先保存当前编辑项")
            }
            this.dialogUploadVisible = true
        },
        deleteMasterUser(index) {

        },
        pwdChange(row, index, cg) {

        }
    }
}
</script>





