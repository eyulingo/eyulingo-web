<template>
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
</template>

<script>
//import axios from 'axios'
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
                data: [{
                    name: "aa",
                    address: "aa",
                    starttime: "11",
                    endtime: "11",
                    store_phone_nu: "11"
                }],
            },
            loading: false,
            squareUrl: "https://cube.elemecdn.com/9/c2/f0ee8a3c7c9638a54940382568c9dpng.png",
        }
    },
    methods: {
        readMasterUser() {
            // this.loading = true

            // axios.get('http://localhost:8080/admin/getstore', {
            //     withCredentials: true
            // }).then((res)=>{
            //     console.log(res)
            //     this.master_user.data = res.data
            // })
            // let request = new Request('http://localhost:8080/admin/getstore')
            // fetch(request, {
            //     method: 'GET',
            //     credentials: 'same-origin'
            // }).then((response)=>{
            //     return response.text()
            // }).then((responseJson)=>{
            //     console.log(responseJson)
            //     this.master_user.data = JSON.parse(responseJson)
            // }).finally(()=>{
            //     this.loading = false
            // })

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
                console.log(row)
                for (let k in data) row[k] = data[k];
                console.log(row)
                console.log(data)
                // this.loading = true
                // if (this.is_store) {
                //     let request = new Request('http://localhost:8080/admin/modifystore')
                //     fetch(request, {
                //         method: 'POST',
                //         headers: {
                //             'content-type': 'application/json;charset=UTF-8'
                //         },
                //         body: JSON.stringify({
                //             store_id: row.store_id,
                //             name: row.name,
                //             address: row.address,
                //             starttime: row.starttime,
                //             endtime: row.endtime,
                //             store_phone_nu: row.store_phone_nu
                //         }),
                //         credentials: 'same-origin'
                //     }).then((response)=>{
                //         return response.text()
                //     }).then((responseJson)=>{
                //         console.log(responseJson)
                //         var res = JSON.parse(responseJson)
                //         if (res.status == "ok") {
                //             this.loading = false
                //             alert("修改店铺信息成功！")
                //         }else{
                //             this.loading = false
                //             alert("修改失败")
                //         }
                //     }).finally(()=>{
                //         this.loading = false
                //     })
                // }else{
                //     let request = new Request("http://localhost:8080/admin/modifydist")
                //     fetch(request, {
                //         method: 'POST',
                //         headers: {
                //             'content-type': 'application/json;charset=UTF-8'
                //         },
                //         body: JSON.stringify({
                //             store_id: row.store_id,
                //             location: row.location,
                //             truename: row.truename,
                //             dist_phone_nu: row.dist_phone_nu,
                //             password: row.password
                //         }),
                //         credentials: 'same-origin'
                //     }).then((response)=>{
                //         return response.text()
                //     }).then((responseJson)=>{
                //         console.log(responseJson)
                //         var res = JSON.parse(responseJson)
                //         if (res.status == "ok") {
                //             this.loading = false
                //             alert("修改经销商信息成功！")
                //         }else{
                //             this.loading = false
                //             alert("修改失败")
                //         }
                //     }).finally(()=>{
                //         this.loading = false
                //     })
                // }

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