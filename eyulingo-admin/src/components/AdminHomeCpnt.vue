
<template>

    <el-row>
        <el-col :span="24">
            <el-table size="mini" :data="master_user.data" border style="width: 100%" highlight-current-row v-loading="loading">
                <el-table-column type="index"></el-table-column>
                <el-table-column v-for="v in master_user.columns" :key="v.filed" :prop="v.field" :label="v.title" :width="v.width">
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

</template>

<script>
import http from '../http.js'
import axios from 'axios'

var generateId = {
        _count: 1,
        get(){return ((+new Date()) + "_" + (this._count++))}
};

export default {
    //主要内容
    name: 'adminForm',
    data() {
        return {
            master_user: {
                sel: null,//选中行
                columns: [
                    { field: "store_id", title: "店铺ID", width: 80 },
                    { field: "name", title: "店铺名称", width: 80 },
                    { field: "address", title: "店铺地址", width: 180 },
                    { field: "starttime", title: "营业开始时间", width: 180 },
                    { field: "endtime", title: "营业结束时间", width: 180 },
                    { field: "store_image_id", title: "店铺图片地址", width: 180 },
                    { field: "location", title: "地理位置" },
                    { field: "truename", title: "真实姓名", width: 80 },
                    { field: "dist_phone_nu", title: "经销商联系方式", width: 90 },
                    { field: "password", title: "密码", width: 80 },
                    { field: "dist_image_id", title: "经销商图片", width: 180 },
                    { field: "store_phone_nu", title: "店铺手机号",width: 80 }
                ],
                data: [
                    { store_id: 123, name: "111", address: "123123",
                      starttime: 1111, endtime: 1112, store_image_id: 111,
                      location: "123123", truename: "123123", dist_phone_nu: 123,
                      password: "qwfsd", dist_image_id: 123123, store_phone_nu: 123},
                    { store_id: 123, name: "111", address: "123123",
                      starttime: 1111, endtime: 1112, store_image_id: 111,
                      location: "123123", truename: "123123", dist_phone_nu: 123,
                      password: "qwfsd", dist_image_id: 123123, store_phone_nu: 123}
                ],
            },
            loading: false
        }

    },
    created () {
        this.readMasterUser()
    },
    methods: {
        //读取表格数据
        readMasterUser() {
            this.loading = true
            let params = {}
            http.fetchGet('admin/getstore', params)
                .then((data) => {
                    console.log(data)
                    if (data.data.Status=="ok") {
                        this.master_user.data = data.data.Values
                        this.loading = false
                    }
                })
                .finally(() => {
                    this.loading = false
                })

            this.master_user.data.map(i => {
                i.id = generateId.get();//模拟后台插入成功后有了id
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
            this.master_user.data.push(j);
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
                for (let k in data) row[k] = data[k];
                console.log(data)
                this.loading = true
                axios.all([http.fetchPost('admin/modifystore', {
                    store_id: row.store_id,
                    name: row.name,
                    address: row.address,
                    starttime: row.starttime,
                    endtime: row.endtime,
                    store_phone_nu: row.store_phone_nu
                }),
                http.fetchPost('admin/modifydist', {
                    store_id: row.store_id,
                    location: row.location,
                    truename: row.truename,
                    phone_nu: row.dist_phone_nu,
                    password: row.password
                })]).then(axios.spread((response1, response2)=>{
                    this.loading = false
                    if (response1.data.Status=="ok"&&response2.data.Status=="ok") {
                        this.$message({
                        type: 'success',
                        message: "保存成功!"
                        })
                    }else{
                        this.$message.warning("保存失败!")
                    }
                })).finally(()=>{
                    this.loading = false
                })

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
</style>

