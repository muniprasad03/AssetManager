appRoot.factory("GearfaultService", ['$resource', '$q', function ($resource, $q) {

    gearfaultServices = {
        gearfault: $resource('api/gearfault/:action/:id', {}, { update: { method: 'PUT' }, drop: { method: 'DELETE' } }),

        getGearfaults: function () {
            var gearfaults = [];
            return this.gearfault.query({ action: 'getgearfaults' }).$promise.then(function (gearfaults) {
                return gearfaults;
            });
        },

        getGearfault: function (id) {
            return this.gearfault.get({ Id: id }).$promise.then(function (data) {
                return data;
            });
        },

        deleteGearfault: function (id) {
            return this.gearfault.drop({ id: id, action: '' }).$promise.then(function () {
                return true;
            }, function () {
                return false;
            });
        },

        saveGearfault: function (data) {
            return this.gearfault.save({ action: 'savegearfault' }, data).$promise.then(function (result) {
                return true;
            }, function () {
                return false;
            });
        },

        updateGearfault: function (data) {
            return this.gearfault.update({ action: 'updategearfault' }, data).$promise.then(function (result) {
                return true;
            }, function () {
                return false;
            });
        }
    };

    return gearfaultServices;
}]);

appRoot.controller('GearfaultController', [
    '$scope', '$state', '$stateParams', '$location', 'GearfaultService', 'AppSettings', 'NotificationService',
function ($scope, $state, $stateParams, $location, GearfaultService, AppSettings, NotificationService) {
    $scope.vm = {};


    $scope.getAll = function () {
        GearfaultService.getGearfaults().then(function (gearfaults) {
            $scope.vm.gearfaults = gearfaults;
        });
    };

    $scope.save = function () {
        if ($scope.departments.$valid) {
            GearfaultService.saveGearfault($scope.model).then(function (result) {
                if (result) {
                    $scope.showForm = false;
                    $scope.getAll();
                    NotificationService.information('Saved Successfully');
                }
                else {
                    NotificationService.information('An error was encountered while saving this gearfault.  Please try again.');
                }
            });
        }
        else {
            NotificationService.information('fill all required fields');
        }
    };

    $scope.delete = function (Department) {
        GearfaultService.deleteGearfault(Department.id).then(function (data) {
            if (data) {
                NotificationService.information('Deleted Successfully');
                $scope.getAll();
            }
            else {
                NotificationService.information('An error was encountered while deleting this gearfault.  Please try again.');
            }
        })
        $scope.getAll();
    };

    $scope.addItem = function () {

        $scope.showForm = true;
        $scope.showUpdateButton = false;
        $scope.model = {};
    };

    $scope.cancel = function () {
        $scope.showForm = false;
        $scope.showUpdateButton = false;
    }

    $scope.modify = function (Department) {
        $scope.showForm = true;
        $scope.model = angular.copy(Department);
        $scope.showUpdateButton = true;
    }

    $scope.update = function () {
        if ($scope.departments.$valid) {
            GearfaultService.updateGearfault($scope.model).then(function (result) {
                if (result) {
                    $scope.showUpdateButton = false;
                    $scope.showForm = false;
                    $scope.getAll();
                    NotificationService.information('Updated Successfully');
                }
                else {
                    NotificationService.information('An error was encountered while updating this gearfault.  Please try again.');
                }
            });
        }
        else {
            NotificationService.information('fill all required fields');
        }
    };

    $scope.vm.tableHeaders = [
{ name: 'name', title: 'gearfault Name', sortReverse: false }
    ];

    $scope.vm.sortTableData = function (header) {
        $scope.vm.currentSortingElement = header;
        $scope.vm.sortType = header.name;
        header.sortReverse = !header.sortReverse;
        $scope.vm.sortReverse = header.sortReverse;
    };

    var init = function () {
        $scope.SortValue = 'None';
        $scope.SortByPredicate = 'none';
        $scope.searchText = '';
        $scope.getAll();
    };

    init();
}
]);