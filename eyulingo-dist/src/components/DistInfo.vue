<template>
<div>
    <el-upload
        class="avatar-uploader"
        action="https://jsonplaceholder.typicode.com/posts/"
        :show-file-list="false"
        :on-success="handleAvatarSuccess"
        :before-upload="beforeAvatarUpload">
        <img v-if="imageUrl" :src="imageUrl" class="avatar">
        <i v-else class="el-icon-circle-plus avatar-uploader-icon"></i>
    </el-upload>
    <el-row>
        

            <el-col :span="24">
                <el-table size="mini" :data="master_user.data" border style="width: 100%" highlight-current-row v-loading="loading">
                    
                    <el-table-column v-for="v in master_user.columns_dist" :key="v.filed" :prop="v.field" :label="v.title" :width="v.width">
                        <template slot-scope="scope">
                            <span v-if="scope.row.isSet">
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
            <el-col :span="24" hidden=true>
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
export default {
    name: 'distInfo',
    data() {
        return {
            master_user: {
                sel: null,//选中行
                columns_dist: [
                    //{ field: "store_id", title: "店铺ID", width: 120 },
                    { field: "location", title: "地理位置" },
                    { field: "truename", title: "真实姓名", width: 120 },
                    { field: "dist_phone_nu", title: "经销商联系方式", width: 120 },
                    { field: "password", title: "密码", width: 120 },
                    //{ field: "dist_image_id", title: "经销商图片", width: 180 },
                ],
                data: [],
            },
            loading: false,
            imageUrl: "https://cube.elemecdn.com/9/c2/f0ee8a3c7c9638a54940382568c9dpng.png",
        }
    },
    created() {
        this.readMasterUser()
    },
    methods: {
        readMasterUser() {
            this.loading = true
            axios.get('http://localhost:8080/store/profile', {
                withCredentials: true
            }).then((res)=>{
                console.log(res.data)
                    this.master_user.data = []
                    this.master_user.data.push(res.data)
                
                    
                
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
        addMasterUser() {
            for (let i of this.master_user.data) {
                if (i.isSet) return this.$message.warning("请先保存当前编辑项");
            }
            let j = { id: 0, "store_id": "", "name": "", "address": "",
                     "starttime": "", "endtime": "", "store_image_id": "",
                     "location": "", "truename": "", "dist_phone_nu": "",
                     "password":"", "dist_image_id": "", "store_phone_nu": "",
                     "isSet": true, "_temporary": true };
            this.master_user.data.splice(0, 1, j);
            this.master_user.sel = JSON.parse(JSON.stringify(j));
        },
        //删除
        deleteMasterUser(index) {
            //点击修改 判断是否已经保存所有操作
            for (let i of this.master_user.data) {
                if (i.isSet) {
                    this.$message.warning("请先保存当前编辑项");
                    return false;
                }
            }
            console.log(index)
            this.$message.warning("尚未开启删除功能");
            return false;

            //this.master_user.data.splice(index, 1);
            //this.master_user.sel = null;
        },
        //修改
        pwdChange(row, index, cg) {
            //点击修改 判断是否已经保存所有操作
            for (let i of this.master_user.data) {
                if (i.isSet && i.id != row.id) {
                    this.$message.warning("请先保存当前编辑项");
                    return false;
                }
            }
            //是否是取消操作
            if (!cg) {
                if (!this.master_user.sel.id) this.master_user.data.splice(index, 1);
                return row.isSet = !row.isSet;
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
                    location: row.location,
                    truename: row.truename,
                    dist_phone_nu: row.dist_phone_nu,
                    password: row.password
                }
                let axiosConfig = {
                    headers: {
                        'Content-Type': 'application/json;charset=UTF-8',
                        'Access-Control-Allow-Origin': "*"
                    },
                    withCredentials: true
                }
                axios.post('http://localhost:8080/store/modifydist', params, axiosConfig).then((res)=>{
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
    border-radius: 6px;
    cursor: pointer;
    position: relative;
    overflow: hidden;
  }
  .avatar-uploader .el-upload:hover {
    border-color: #409EFF;
  }
  .avatar-uploader-icon {
    margin-top: 60px;
    font-size: 50px;
    color: #8c939d;
    width: 178px;
    height: 125px;
    text-align: center;
    
  }
  .avatar {
    width: 178px;
    height: 178px;
    display: block;
  }

</style>
