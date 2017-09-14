/**
 * Created by zhubaihua on 2017/9/1.
 */
(function () {
    angular.module('custom')
        .service('PermissionService', PermissionRyGroup);
    PermissionRyGroup.$inject = ['$http'];
    function PermissionRyGroup($H) {
        //部门列表
        var devurl='http://b.geju.com';

        //钉钉部门列表
        this.ckbm = function () {
            return $H({
                url: devurl+'/manage/ding/department',
                method: 'get',
                params: {
                }
            })
        };
        //钉钉人员列表
        this.ckbmry = function (id) {
            return $H({
                url: devurl+'/manage/ding/department/user?id='+id,
                method: 'get',
                params: {
                }
            })
        };
        //部门人员列表
        this.bmry = function (id) {
            return $H({
                url: devurl+'/manage/department/detail?id='+id,
                method: 'get',
                params: {
                }
            })
        };

        //权限列表
        this.permissionList = function () {
            return $H({
                url: devurl+'/manage/process/item/list',
                method: 'get',
                params: {
                }
            })
        };

        //部门权限列表
        this.bmpermissionList = function (id) {
            return $H({
                url: devurl+'/manage/department/detail?id='+id,
                method: 'get',
                params: {
                }
            })
        };
        //创建人员
        this.createbm = function (account) {
            return $H({
                url: '/manage/department/staff/create',
                method: 'post',
                data: account
            })
        };
        //删除人员
        this.delry = function (account) {
            return $H({
                url: '/manage/department/staff/del',
                method: 'post',
                data: account
            })
        };

        //删除权限
        this.delpermission = function (account) {
            return $H({
                url: '/manage/department/authority/del',
                method: 'post',
                data: account
            })
        };

        //增加权限
        this.createper = function (account) {
            return $H({
                url: '/manage/department/authority/create',
                method: 'post',
                data: account
            })
        };

    }
})();