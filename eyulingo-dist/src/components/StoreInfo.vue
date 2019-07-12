<template>
    <div>
        <el-upload
            class="avatar-uploader"
            action="http://localhost:8080/img/upload"
            :multiple="false"
            :with-credentials="true"
            :show-file-list="false"
            :on-success="handleAvatarSuccess"
            :before-upload="beforeAvatarUpload"> 
            <img v-if="imageUrl" :src="imageUrl" class="avatar">
            <img v-else src="https://cube.elemecdn.com/9/c2/f0ee8a3c7c9638a54940382568c9dpng.png" class="avatar">
        </el-upload>
        <el-row>
            <el-col :span="24">
                <el-table size="mini" :data="master_user.data" border style="width: 100%" highlight-current-row v-loading="loading">

                    <el-table-column v-for="v in master_user.columns_store" :key="v.filed" :prop="v.field" :label="v.title" :width="v.width">
                        <template slot-scope="scope">
                            <span v-if="v.field=='store_id'">{{scope.row[v.field]}}</span>
                            <span v-else-if="scope.row.isSet">
                                <el-input size="mini" placeholder="请输入内容" v-model="master_user.sel[v.field]">
                                </el-input>
                            </span>
                            <span v-else>{{scope.row[v.field]}}</span>
                        </template>
                    </el-table-column>
                    <el-table-column label="操作" width="100">
                        <template slot-scope="scope">
                            <span class="el-tag el-tag--info el-tag--mini" style="cursor: pointer;" @click="pwdChange(scope.row,scope.$index,true)">
                                {{scope.row.isSet?"保存":"修改"}}
                            </span>
                            <span v-if="scope.row.isSet" class="el-tag  el-tag--mini" style="cursor: pointer;" @click="pwdChange(scope.row,scope.$index,false)">
                                取消
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
    
</template>

<script>
import axios from 'axios'
//axios.defaults.baseURL="http://localhost:8080"
axios.defaults.baseURL="http://47.103.15.32:8082"
export default {
    name: 'storeInfo',
    data() {
        return {
            master_user: {
                sel: null,//选中行
                columns_store: [                    
                    { field: "name", title: "店铺名称", width: 120 },
                    { field: "address", title: "店铺地址"},
                    { field: "starttime", title: "营业开始时间", width: 220 },
                    { field: "endtime", title: "营业结束时间", width: 220 },
                    { field: "store_phone_nu", title: "店铺手机号",width: 120 }
                ],
                data: [],
            },
            loading: false,
            imageUrl: ""
        }
    },
    created() {
        this.readMasterUser()
    },
    methods: {
        readMasterUser() {
            this.loading = true
            this.imageUrl = ""
            axios.get('/store/mystoreinfo', {
                withCredentials: true
            }).then((res)=>{
                console.log(res.data)
                this.master_user.data = []
                this.master_user.data.push(res.data)
                this.imageUrl = "http://localhost:8080/img/download?fileId="+this.master_user.data[0].store_image_id
            }).finally(()=>{
                this.loading = false
            })
            console.log(this.master_user.data)

            this.master_user.data.map(i => {
                i.id = 0;//模拟后台插入成功后有了id
                i.isSet=false;//给后台返回数据添加`isSet`标识
                i._temporary = true
                return i;
            });
        },
        //添加账号
        handleAvatarSuccess(response){
            console.log(response)
            let params = {
                image_id: response.file_id
            }
            let axiosConfig = {
                headers: {
                    'Content-Type': 'application/json;charset=UTF-8',
                    'Access-Control-Allow-Origin': "*"
                }
            }
            axios.post('/store/cover', params, axiosConfig).then((res)=>{
                if (res.data.status=="ok") {
                    this.readMasterUser()
                }else{
                    this.$message.error('更新新头像失败。')
                }
            })
            this.$message('上传成功!');
        },
        beforeAvatarUpload(file) {
            const isLt2M = file.size / 1024 / 1024 < 2;

            if (!isLt2M) {
              this.$message.error('上传头像图片大小不能超过 2MB!');
            }
            return isLt2M;
        },
        //修改
        pwdChange(row, index, cg) {
            //是否是取消操作
            if (!cg) {
                if (!this.master_user.sel.id) {
                    row.isSet = !row.isSet;
                    this.master_user.data.splice(index, 1, row);
                }
                return row.isSet
            }
            //提交数据
            if (row.isSet) {
                //项目是模拟请求操作  自己修改下

                let data = JSON.parse(JSON.stringify(this.master_user.sel));
                console.log(row)
                for (let k in data) row[k] = data[k];
                console.log(row)
                console.log(data)
                let params = {
                    name: row.name,
                    address: row.address,
                    starttime: row.starttime,
                    endtime: row.endtime,
                    store_phone_nu: row.store_phone_nu
                }
                let axiosConfig = {
                    headers: {
                        'Content-Type': 'application/json;charset=UTF-8',
                        'Access-Control-Allow-Origin': "*"
                    },
                    withCredentials: true
                }
                axios.post('/store/modifydist', params, axiosConfig).then((res)=>{
                    if (res.data.status=="ok") {
                        this.loading = false
                        alert("修改成功！")
                    }else{
                        this.loading = false
                        alert("修改失败")
                    }
                }).finally(()=>{
                    this.loading = false
                })
                this.readMasterUser()

                //然后这边重新读取表格数据
                row.isSet = false;
                this.master_user.data.splice(index, 1, row)
            } else {
                this.master_user.sel = JSON.parse(JSON.stringify(row));
                row.isSet = true;
                this.master_user.data.splice(index, 1, row)
            }
        }
    }
}
</script>

<style>
.el-table-add-row {
    margin-top: 10px;
    width: 100%;
    height: 34px;
    border: 1px dashed #c1c1cd;
    border-radius: 3px;
    cursor: pointer;
    justify-content: center;
    display: flex;
    line-height: 34px;
}
.avatar-uploader .el-upload {
    border: 1px dashed #d9d9d9;
    border-radius: 15px;
    cursor: pointer;
    position: relative;
    overflow: hidden;
  }
  .avatar-uploader .el-upload:hover {
    border-color: #409EFF;
  }
  .avatar {
    width: 178px;
    height: 178px;
    display: block;
  }

</style>