(function(e){function t(t){for(var r,i,o=t[0],l=t[1],c=t[2],u=0,f=[];u<o.length;u++)i=o[u],s[i]&&f.push(s[i][0]),s[i]=0;for(r in l)Object.prototype.hasOwnProperty.call(l,r)&&(e[r]=l[r]);d&&d(t);while(f.length)f.shift()();return n.push.apply(n,c||[]),a()}function a(){for(var e,t=0;t<n.length;t++){for(var a=n[t],r=!0,o=1;o<a.length;o++){var l=a[o];0!==s[l]&&(r=!1)}r&&(n.splice(t--,1),e=i(i.s=a[0]))}return e}var r={},s={app:0},n=[];function i(t){if(r[t])return r[t].exports;var a=r[t]={i:t,l:!1,exports:{}};return e[t].call(a.exports,a,a.exports,i),a.l=!0,a.exports}i.m=e,i.c=r,i.d=function(e,t,a){i.o(e,t)||Object.defineProperty(e,t,{enumerable:!0,get:a})},i.r=function(e){"undefined"!==typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(e,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(e,"__esModule",{value:!0})},i.t=function(e,t){if(1&t&&(e=i(e)),8&t)return e;if(4&t&&"object"===typeof e&&e&&e.__esModule)return e;var a=Object.create(null);if(i.r(a),Object.defineProperty(a,"default",{enumerable:!0,value:e}),2&t&&"string"!=typeof e)for(var r in e)i.d(a,r,function(t){return e[t]}.bind(null,r));return a},i.n=function(e){var t=e&&e.__esModule?function(){return e["default"]}:function(){return e};return i.d(t,"a",t),t},i.o=function(e,t){return Object.prototype.hasOwnProperty.call(e,t)},i.p="/";var o=window["webpackJsonp"]=window["webpackJsonp"]||[],l=o.push.bind(o);o.push=t,o=o.slice();for(var c=0;c<o.length;c++)t(o[c]);var d=l;n.push([0,"chunk-vendors"]),a()})({0:function(e,t,a){e.exports=a("56d7")},"14fd":function(e,t,a){"use strict";var r=a("9e7d"),s=a.n(r);s.a},"56d7":function(e,t,a){"use strict";a.r(t);a("cadf"),a("551c"),a("f751"),a("097d");var r=a("2b0e"),s=function(){var e=this,t=e.$createElement,a=e._self._c||t;return a("div",{attrs:{id:"app"}},[a("router-view")],1)},n=[],i=(a("5c0b"),a("2877")),o={},l=Object(i["a"])(o,s,n,!1,null,null,null),c=l.exports,d=a("8c4f"),u=function(){var e=this,t=e.$createElement,a=e._self._c||t;return a("el-container",{staticStyle:{border:"1px solid #eee"},attrs:{direction:"vertical"}},[a("el-header",{staticStyle:{"text-align":"right","font-size":"12px"}},[a("span")]),a("el-container",[a("el-aside",{staticStyle:{width:"300px","background-color":"rgb(238, 241, 246)"}},[a("el-menu",{attrs:{router:"","default-active":"/distInfo"}},[a("el-menu-item",{attrs:{index:"/distInfo"}},[e._v("我的信息")]),a("el-menu-item",{attrs:{index:"/storeInfo"}},[e._v("我的店铺")]),a("el-menu-item",{attrs:{index:"3"}},[e._v("商品信息")]),a("el-menu-item",{attrs:{index:"4"}},[e._v("我的订单")])],1)],1),a("el-main",[a("router-view")],1)],1)],1)},f=[],p={data:function(){return{tableData:[]}}},m=p,h=(a("cccb"),Object(i["a"])(m,u,f,!1,null,null,null)),g=h.exports,v=function(){var e=this,t=e.$createElement,a=e._self._c||t;return a("Login")},_=[],w=function(){var e=this,t=e.$createElement,a=e._self._c||t;return a("div",{staticClass:"login-container"},[a("el-form",{directives:[{name:"loading",rawName:"v-loading",value:e.loading,expression:"loading"}],ref:"form",attrs:{model:e.form}},[a("el-row",{attrs:{type:"flex",justify:"center"}},[a("el-col",{attrs:{span:6}},[a("el-form-item",[a("span",[a("font",{attrs:{size:"4"}},[e._v("经销商登录")])],1)])],1)],1),a("el-row",{attrs:{type:"flex",justify:"center"}},[a("el-col",{attrs:{span:12}},[a("el-form-item",{attrs:{prop:"name"}},[a("el-input",{attrs:{size:"small",placeholder:"账户",clearable:""},model:{value:e.form.name,callback:function(t){e.$set(e.form,"name",t)},expression:"form.name"}})],1)],1)],1),a("el-row",{attrs:{type:"flex",justify:"center"}},[a("el-col",{attrs:{span:12}},[a("el-form-item",{attrs:{prop:"password"}},[a("el-input",{attrs:{size:"small",placeholder:"密码","show-password":""},model:{value:e.form.password,callback:function(t){e.$set(e.form,"password",t)},expression:"form.password"}})],1)],1)],1),a("el-row",{staticStyle:{margin:"15px"},attrs:{type:"flex",justify:"center"}},[a("el-col",{attrs:{span:12}},[a("el-form-item",[a("el-button",{attrs:{type:"primary"},on:{click:e.submit}},[e._v("登录")])],1)],1)],1)],1)],1)},b=[],y=(a("a481"),a("7f7f"),a("bc3a")),S=a.n(y);S.a.defaults.baseURL="http://47.103.15.32:8082";var x={name:"Login",data:function(){return{form:{name:"",password:""},loading:!1}},methods:{submit:function(){var e=this;this.loading=!0;var t={distName:this.form.name,password:this.form.password},a={headers:{"Content-Type":"application/json;charset=UTF-8","Access-Control-Allow-Origin":"*"}};S.a.post("/store/login",t,a).then(function(t){console.log(t),"ok"==t.data.status?(e.loading=!1,alert("登录成功，您好，"+e.form.name+"！"),e.$router.replace({path:"/distInfo"})):(e.loading=!1,alert("登录失败"))}).finally(function(){e.loading=!1})}}},C=x,U=(a("82a2"),Object(i["a"])(C,w,b,!1,null,null,null)),k=U.exports,O={name:"about",components:{Login:k}},j=O,$=Object(i["a"])(j,v,_,!1,null,null,null),A=$.exports,M=function(){var e=this,t=e.$createElement,a=e._self._c||t;return a("div",[a("el-upload",{staticClass:"avatar-uploader",attrs:{action:"http://localhost:8080/img/upload",multiple:!1,"with-credentials":!0,"show-file-list":!1,"on-success":e.handleAvatarSuccess,"before-upload":e.beforeAvatarUpload}},[e.imageUrl?a("img",{staticClass:"avatar",attrs:{src:e.imageUrl}}):a("img",{staticClass:"avatar",attrs:{src:"https://cube.elemecdn.com/9/c2/f0ee8a3c7c9638a54940382568c9dpng.png"}})]),a("el-row",[a("el-col",{attrs:{span:24}},[a("el-table",{directives:[{name:"loading",rawName:"v-loading",value:e.loading,expression:"loading"}],staticStyle:{width:"100%"},attrs:{size:"mini",data:e.master_user.data,border:"","highlight-current-row":""}},[e._l(e.master_user.columns_dist,function(t){return a("el-table-column",{key:t.filed,attrs:{prop:t.field,label:t.title,width:t.width},scopedSlots:e._u([{key:"default",fn:function(r){return[r.row.isSet?a("span",[a("el-input",{attrs:{size:"mini",placeholder:"请输入内容"},model:{value:e.master_user.sel[t.field],callback:function(a){e.$set(e.master_user.sel,t.field,a)},expression:"master_user.sel[v.field]"}})],1):a("span",[e._v(e._s(r.row[t.field]))])]}}],null,!0)})}),a("el-table-column",{attrs:{label:"操作",width:"100"},scopedSlots:e._u([{key:"default",fn:function(t){return[a("span",{staticClass:"el-tag el-tag--info el-tag--mini",staticStyle:{cursor:"pointer"},on:{click:function(a){return e.pwdChange(t.row,t.$index,!0)}}},[e._v("\n                            "+e._s(t.row.isSet?"保存":"修改")+"\n                        ")]),t.row.isSet?a("span",{staticClass:"el-tag  el-tag--mini",staticStyle:{cursor:"pointer"},on:{click:function(a){return e.pwdChange(t.row,t.$index,!1)}}},[e._v("\n                            取消\n                        ")]):e._e()]}}])})],2)],1),a("el-col",{attrs:{span:24}},[a("div",{staticClass:"el-table-add-row",staticStyle:{width:"99.2%"},on:{click:function(t){return e.readMasterUser()}}},[a("span",[e._v("刷新")])])])],1)],1)},N=[];S.a.defaults.baseURL="http://47.103.15.32:8082";var T={name:"distInfo",data:function(){return{master_user:{sel:null,columns_dist:[{field:"location",title:"地理位置"},{field:"truename",title:"真实姓名",width:120},{field:"dist_phone_nu",title:"经销商联系方式",width:120},{field:"password",title:"密码",width:120}],data:[]},loading:!1,imageUrl:""}},created:function(){this.readMasterUser()},methods:{readMasterUser:function(){var e=this;this.loading=!0,this.imageUrl="",S.a.get("/store/profile",{withCredentials:!0}).then(function(t){console.log(t.data),e.master_user.data=[],e.master_user.data.push(t.data),e.imageUrl="http://localhost:8080/img/download?fileId="+e.master_user.data[0].dist_image_id}).finally(function(){e.loading=!1}),console.log(this.master_user.data),this.master_user.data.map(function(e){return e.id=0,e.isSet=!1,e._temporary=!0,e})},handleAvatarSuccess:function(e){var t=this;console.log(e);var a={image_id:e.file_id},r={headers:{"Content-Type":"application/json;charset=UTF-8","Access-Control-Allow-Origin":"*"}};S.a.post("/store/avatar",a,r).then(function(e){"ok"==e.data.status?t.readMasterUser():t.$message.error("更新新头像失败。")}),this.$message("上传成功!")},beforeAvatarUpload:function(e){var t=e.size/1024/1024<2;return t||this.$message.error("上传头像图片大小不能超过 2MB!"),t},pwdChange:function(e,t,a){var r=this;if(!a)return this.master_user.sel.id||(e.isSet=!e.isSet,this.master_user.data.splice(t,1,e)),e.isSet;if(e.isSet){var s=JSON.parse(JSON.stringify(this.master_user.sel));for(var n in console.log(e),s)e[n]=s[n];console.log(e),console.log(s);var i={location:e.location,truename:e.truename,dist_phone_nu:e.dist_phone_nu,password:e.password},o={headers:{"Content-Type":"application/json;charset=UTF-8","Access-Control-Allow-Origin":"*"},withCredentials:!0};S.a.post("/store/modifydist",i,o).then(function(e){"ok"==e.data.status?(r.loading=!1,alert("修改成功！")):(r.loading=!1,alert("修改失败"))}).finally(function(){r.loading=!1}),this.readMasterUser(),e.isSet=!1,this.master_user.data.splice(t,1,e)}else this.master_user.sel=JSON.parse(JSON.stringify(e)),e.isSet=!0,this.master_user.data.splice(t,1,e)}}},I=T,z=(a("b693"),Object(i["a"])(I,M,N,!1,null,null,null)),J=z.exports,E=function(){var e=this,t=e.$createElement,a=e._self._c||t;return a("div",[a("el-upload",{staticClass:"avatar-uploader",attrs:{action:"http://localhost:8080/img/upload",multiple:!1,"with-credentials":!0,"show-file-list":!1,"on-success":e.handleAvatarSuccess,"before-upload":e.beforeAvatarUpload}},[e.imageUrl?a("img",{staticClass:"avatar",attrs:{src:e.imageUrl}}):a("img",{staticClass:"avatar",attrs:{src:"https://cube.elemecdn.com/9/c2/f0ee8a3c7c9638a54940382568c9dpng.png"}})]),a("el-row",[a("el-col",{attrs:{span:24}},[a("el-table",{directives:[{name:"loading",rawName:"v-loading",value:e.loading,expression:"loading"}],staticStyle:{width:"100%"},attrs:{size:"mini",data:e.master_user.data,border:"","highlight-current-row":""}},[e._l(e.master_user.columns_store,function(t){return a("el-table-column",{key:t.filed,attrs:{prop:t.field,label:t.title,width:t.width},scopedSlots:e._u([{key:"default",fn:function(r){return["store_id"==t.field?a("span",[e._v(e._s(r.row[t.field]))]):r.row.isSet?a("span",[a("el-input",{attrs:{size:"mini",placeholder:"请输入内容"},model:{value:e.master_user.sel[t.field],callback:function(a){e.$set(e.master_user.sel,t.field,a)},expression:"master_user.sel[v.field]"}})],1):a("span",[e._v(e._s(r.row[t.field]))])]}}],null,!0)})}),a("el-table-column",{attrs:{label:"操作",width:"100"},scopedSlots:e._u([{key:"default",fn:function(t){return[a("span",{staticClass:"el-tag el-tag--info el-tag--mini",staticStyle:{cursor:"pointer"},on:{click:function(a){return e.pwdChange(t.row,t.$index,!0)}}},[e._v("\n                            "+e._s(t.row.isSet?"保存":"修改")+"\n                        ")]),t.row.isSet?a("span",{staticClass:"el-tag  el-tag--mini",staticStyle:{cursor:"pointer"},on:{click:function(a){return e.pwdChange(t.row,t.$index,!1)}}},[e._v("\n                            取消\n                        ")]):e._e()]}}])})],2)],1),a("el-col",{attrs:{span:24}},[a("div",{staticClass:"el-table-add-row",staticStyle:{width:"99.2%"},on:{click:function(t){return e.readMasterUser()}}},[a("span",[e._v("刷新")])])])],1)],1)},F=[];S.a.defaults.baseURL="http://47.103.15.32:8082";var L={name:"storeInfo",data:function(){return{master_user:{sel:null,columns_store:[{field:"name",title:"店铺名称",width:120},{field:"address",title:"店铺地址"},{field:"starttime",title:"营业开始时间",width:220},{field:"endtime",title:"营业结束时间",width:220},{field:"store_phone_nu",title:"店铺手机号",width:120}],data:[]},loading:!1,imageUrl:""}},created:function(){this.readMasterUser()},methods:{readMasterUser:function(){var e=this;this.loading=!0,this.imageUrl="",S.a.get("/store/mystoreinfo",{withCredentials:!0}).then(function(t){console.log(t.data),e.master_user.data=[],e.master_user.data.push(t.data),e.imageUrl="http://localhost:8080/img/download?fileId="+e.master_user.data[0].store_image_id}).finally(function(){e.loading=!1}),console.log(this.master_user.data),this.master_user.data.map(function(e){return e.id=0,e.isSet=!1,e._temporary=!0,e})},handleAvatarSuccess:function(e){var t=this;console.log(e);var a={image_id:e.file_id},r={headers:{"Content-Type":"application/json;charset=UTF-8","Access-Control-Allow-Origin":"*"}};S.a.post("/store/cover",a,r).then(function(e){"ok"==e.data.status?t.readMasterUser():t.$message.error("更新新头像失败。")}),this.$message("上传成功!")},beforeAvatarUpload:function(e){var t=e.size/1024/1024<2;return t||this.$message.error("上传头像图片大小不能超过 2MB!"),t},pwdChange:function(e,t,a){var r=this;if(!a)return this.master_user.sel.id||(e.isSet=!e.isSet,this.master_user.data.splice(t,1,e)),e.isSet;if(e.isSet){var s=JSON.parse(JSON.stringify(this.master_user.sel));for(var n in console.log(e),s)e[n]=s[n];console.log(e),console.log(s);var i={name:e.name,address:e.address,starttime:e.starttime,endtime:e.endtime,store_phone_nu:e.store_phone_nu},o={headers:{"Content-Type":"application/json;charset=UTF-8","Access-Control-Allow-Origin":"*"},withCredentials:!0};S.a.post("/store/modifydist",i,o).then(function(e){"ok"==e.data.status?(r.loading=!1,alert("修改成功！")):(r.loading=!1,alert("修改失败"))}).finally(function(){r.loading=!1}),this.readMasterUser(),e.isSet=!1,this.master_user.data.splice(t,1,e)}else this.master_user.sel=JSON.parse(JSON.stringify(e)),e.isSet=!0,this.master_user.data.splice(t,1,e)}}},P=L,B=(a("14fd"),Object(i["a"])(P,E,F,!1,null,null,null)),R=B.exports;r["default"].use(d["a"]);var q=new d["a"]({mode:"history",base:"/",routes:[{path:"/",name:"login",component:A},{path:"/home",name:"home",component:g,children:[{path:"/distInfo",name:"distInfo",component:J},{path:"/storeInfo",name:"storeInfo",component:R}]}]}),D=a("9483");Object(D["a"])("".concat("/","service-worker.js"),{ready:function(){console.log("App is being served from cache by a service worker.\nFor more details, visit https://goo.gl/AFskqB")},registered:function(){console.log("Service worker has been registered.")},cached:function(){console.log("Content has been cached for offline use.")},updatefound:function(){console.log("New content is downloading.")},updated:function(){console.log("New content is available; please refresh.")},offline:function(){console.log("No internet connection found. App is running in offline mode.")},error:function(e){console.error("Error during service worker registration:",e)}});var G=a("5c96"),H=a.n(G),K=a("b2d6"),Q=a.n(K);a("f843"),a("c69f");r["default"].use(H.a,{locale:Q.a}),r["default"].use(H.a,{locale:Q.a}),r["default"].config.productionTip=!1,new r["default"]({router:q,render:function(e){return e(c)}}).$mount("#app")},"5c0b":function(e,t,a){"use strict";var r=a("5e27"),s=a.n(r);s.a},"5e27":function(e,t,a){},"82a2":function(e,t,a){"use strict";var r=a("d5e3"),s=a.n(r);s.a},"9e7d":function(e,t,a){},"9fe5":function(e,t,a){},b693:function(e,t,a){"use strict";var r=a("9fe5"),s=a.n(r);s.a},c69f:function(e,t,a){},cccb:function(e,t,a){"use strict";var r=a("d563"),s=a.n(r);s.a},d563:function(e,t,a){},d5e3:function(e,t,a){},f843:function(e,t,a){}});
//# sourceMappingURL=app.430cce5f.js.map