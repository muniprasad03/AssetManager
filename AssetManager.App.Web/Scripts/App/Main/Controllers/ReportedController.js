appRoot.factory("ReportedService", ['$resource', '$q', function ($resource, $q) {

    reportedServices = {
        reported: $resource('api/reported/:action/:id', {}, { update: { method: 'PUT' }, drop: { method: 'DELETE' } }),

        getReporteds: function () {
            var reporteds = [];
            return this.reported.query({ action: 'getreporteds' }).$promise.then(function (reporteds) {
                return reporteds;
            });
        },

        getReported: function (id) {
            return this.reported.get({ Id: id }).$promise.then(function (data) {
                return data;
            });
        },

        deleteReported: function (id) {
            return this.reported.drop({ id: id, action: '' }).$promise.then(function () {
                return true;
            }, function () {
                return false;
            });
        },

        saveReported: function (data) {
            return this.reported.save({ action: 'savereported' }, data).$promise.then(function (result) {
                return true;
            }, function () {
                return false;
            });
        },

        updateReported: function (data) {
            return this.reported.update({ action: 'updatereported' }, data).$promise.then(function (result) {
                return true;
            }, function () {
                return false;
            });
        }
    };

    return reportedServices;
}]);

appRoot.controller('ReportedController', [
    '$scope', '$state', '$stateParams', '$location', 'ReportedService', 'AppSettings', 'NotificationService',
function ($scope, $state, $stateParams, $location, ReportedService, AppSettings, NotificationService) {
    $scope.vm = {};


    $scope.getAll = function () {
        ReportedService.getReporteds().then(function (reporteds) {
            $scope.vm.reporteds = reporteds;
        });
    };

    $scope.save = function () {
        if ($scope.departments.$valid) {
            ReportedService.saveReported($scope.model).then(function (result) {
                if (result) {
                    $scope.showForm = false;
                    $scope.getAll();
                    NotificationService.information('Saved Successfully');
                }
                else {
                    NotificationService.information('An error was encountered while saving this reported.  Please try again.');
                }
            });
        }
        else {
            NotificationService.information('fill all required fields');
        }
    };

    $scope.delete = function (Department) {
        ReportedService.deleteReported(Department.id).then(function (data) {
            if (data) {
                NotificationService.information('Deleted Successfully');
                $scope.getAll();
            }
            else {
                NotificationService.information('An error was encountered while deleting this reported.  Please try again.');
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
            ReportedService.updateReported($scope.model).then(function (result) {
                if (result) {
                    $scope.showUpdateButton = false;
                    $scope.showForm = false;
                    $scope.getAll();
                    NotificationService.information('Updated Successfully');
                }
                else {
                    NotificationService.information('An error was encountered while updating this reported.  Please try again.');
                }
            });
        }
        else {
            NotificationService.information('fill all required fields');
        }
    };

    $scope.vm.tableHeaders = [
{ name: 'name', title: 'reported Name', sortReverse: false }
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