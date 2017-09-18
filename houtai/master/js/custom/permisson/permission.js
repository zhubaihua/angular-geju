/**
 * Created by zhubaihua on 2017/9/1.
 */
angular
    .module('custom')
.controller('PermissionCtrl', PermissionRyGroup);
PermissionRyGroup.$inject = ['PermissionService','$stateParams','$state'];
function PermissionRyGroup(PermService,$stateParams,$state) {
    var vm = this;
    activate();
    vm.cet = {};
    function activate() {
        var producerId = $stateParams.producerId;

        PermService.bmry(producerId).then(function (data) {
            vm.bmname=data.data.detail.name;
            vm.rybm=data.data.detail.RelationDepartmentStaffs;
        })


        //钉钉部门列表
        PermService.ckbm().then(function (data) {
            vm.listbm = data.data.list;
        })
        //钉钉人员列表
        vm.checkOnebm=function (id) {
            PermService.ckbmry(id).then(function (data) {
                vm.listry=data.data.list;
            })
        }

        //权限列表
        PermService.permissionList().then(function (data) {
            vm.perList = data.data.list;
        })

        //部门权限列表
        PermService.bmpermissionList(producerId).then(function (data) {
            vm.plist=data.data.detail.RelationDepartmentAuthorities;
        })
        vm.rycont={}
        //创建人员

        vm.checkOnery2 = function (userid,name) {
            vm.rycont={
                name:name,
                user:userid,
                group:producerId,
                level:2
            }
            console.log(vm.rycont)
            PermService.createbm(vm.rycont).then(function (result) {
                PermService.bmry(producerId).then(function (data) {
                    vm.rybm=data.data.detail.RelationDepartmentStaffs;
                    console.log(vm.rybm)
                })
            })
        }


        //删除学员
        vm.delstu=function (id) {
            vm.del={
                id:id
            }
            PermService.delry(vm.del).then(function (result) {
                PermService.bmry(producerId).then(function (data) {
                    vm.rybm=data.data.detail.RelationDepartmentStaffs;
                })
            })
        }
        //返回
        vm.return=function () {
            $state.go("app.permission_group");
        }
        //增加权限
        vm.addper=function (perid) {
            vm.bmper={
                authority:perid,
                group:producerId
            }
            PermService.createper(vm.bmper).then(function (result) {
                PermService.bmpermissionList(producerId).then(function (data) {
                    vm.plist=data.data.detail.RelationDepartmentAuthorities;
                })
            })

        }
        
    // 删除权限
        vm.delper = function (id) {
            vm.delp={
                id:id
            }
            PermService.delpermission(vm.delp).then(function (result) {
                PermService.bmpermissionList(producerId).then(function (data) {
                    vm.plist=data.data.detail.RelationDepartmentAuthorities;
                })
            })
        }


        // 更新人员权限
        vm.updatper = function (id,lev) {
            if(lev==1){
                vm.upper = {
                    id: id,
                    level: 2
                }
            }else{
                vm.upper = {
                    id: id,
                    level: 1
                }
            }
            PermService.updry(vm.upper).then(function (result) {
                PermService.bmry(producerId).then(function (data) {
                    vm.bmname=data.data.detail.name;
                    vm.rybm=data.data.detail.RelationDepartmentStaffs;
                })
            })

        }

    }
}