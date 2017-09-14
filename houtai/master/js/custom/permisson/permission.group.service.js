/**
 * Created by zhubaihua on 2017/9/1.
 */
(function () {
    angular.module('custom')
        .service('PermissionGroupService', PermissionGroup);
    PermissionGroup.$inject = ['$http'];
    function PermissionGroup($H) {
        //部门列表
        var devurl='http://b.geju.com';
        this.getList = function () {
            return $H({
                url: devurl+'/manage/department/list',
                method: 'get',
                params: {
                }
            })
        };

        //登陆
        this.Post = function (account) {
            return $H({
                url: '/manage/login/in',
                method: 'post',
                data: account
            })
        };
        //创建部门
        this.createbm = function (account) {
            return $H({
                url: '/manage/department/create',
                method: 'post',
                data: account
            })
        };

        //删除部门
        this.delbm = function (account) {
            return $H({
                url: '/manage/department/del',
                method: 'post',
                data: account
            })
        };
    }
})();