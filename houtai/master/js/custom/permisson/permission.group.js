/**
 * Created by zhubaihua on 2017/9/1.
 */
angular
    .module('custom')
.controller('PermissionGroupCtrl', PermissionGroup);
PermissionGroup.$inject = ['PermissionGroupService','$state','$http','$rootScope','$stateParams'];
function PermissionGroup(PGroupService,$state,$http,$rootScope,$stateParams) {
    var vm = this;
    activate();
    var producerId = $stateParams.producerId;
    function activate() {
        //部门列表
        PGroupService.getList().then(function (data) {
            vm.list = data.data.list;
        })

        //跳转添加人员
        vm.rybm=[];
        vm.checkcy = function (id) {
            $state.go("app.member_list",{producerId:id});
        }
        //跳转添加部门
        vm.createbmshow = function () {
            $state.go("app.add_sector");
        }

        vm.account = {};
        vm.isshow=false;
        vm.change = function () {
            vm.isshow=false;
        }
        //登陆条转
        vm.login1 = function (account) {
            PGroupService.Post(account).then(function (result) {
                if(vm.loginForm.$valid) {
                    if(result.data.code==200){
                        $state.go("app.permission_group");
                    }else{
                        vm.authMsg=result.data.msg;
                        vm.isshow=true;
                    }
                }else {

                    vm.loginForm.account_user.$dirty = true;
                    vm.loginForm.account_password.$dirty = true;
                }
            })

        }
        //创建部门
        vm.crtbm = function (account) {
            PGroupService.createbm(account).then(function (result) {
                $state.go("app.permission_group");
            })
        }

        //删除部门
        vm.delbumen = function (id) {
            vm.del={
                id:id
            }
            PGroupService.delbm(vm.del).then(function (result) {
                PGroupService.getList().then(function (data) {
                    vm.list = data.data.list;
                })
            })

        }

        //返回
        vm.return=function () {
            $state.go("app.permission_group");
        }

        //跳转部门权限修改
        vm.addPermission = function (id) {
            $state.go("app.permission",{producerId:id});
        }

    }
}