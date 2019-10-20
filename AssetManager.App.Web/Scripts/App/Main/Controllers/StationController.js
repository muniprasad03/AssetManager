appRoot.factory("StationService", ['$resource', '$q', function ($resource, $q) {

    stationServices = {
        station: $resource('api/station/:action/:id', {}, { update: { method: 'PUT' }, drop: { method: 'DELETE' } }),

        getStations: function () {
            var stations = [];
            return this.station.query({ action: 'getstations' }).$promise.then(function (stations) {
                return stations;
            });
        },

        getStation: function (id) {
            return this.station.get({ Id: id }).$promise.then(function (data) {
                return data;
            });
        },

        deleteStation: function (id) {
            return this.station.drop({ id: id, action: '' }).$promise.then(function () {
                return true;
            }, function () {
                return false;
            });
        },

        saveStation: function (data) {
            return this.station.save({ action: 'savestation' }, data).$promise.then(function (result) {
                return true;
            }, function () {
                return false;
            });
        },

        updateStation: function (data) {
            return this.station.update({ action: 'updatestation' }, data).$promise.then(function (result) {
                return true;
            }, function () {
                return false;
            });
        }
    };

    return stationServices;
}]);

appRoot.controller('StationController', [
    '$scope', '$state', '$stateParams', '$location', '$q', 'StationService', 'AppSettings', 'FailuresService', 'SectionService', 'NotificationService',
function ($scope, $state, $stateParams, $location, $q, StationService, AppSettings, FailuresService, SectionService, NotificationService) {
    $scope.vm = {};

    $scope.getAll = function () {
        FailuresService.getUsers().then(function (data) {
            $scope.vm.users = data;
            $scope.vm.usersDict = data.reduce(function (array, item, index) { array[item.id] = item; return array; }, {});
            StationService.getStations().then(function (stations) {
                $scope.vm.stations = stations.map(function (item) {
                    item.asteUser = item.asteId ? $scope.vm.usersDict[item.asteId] : null;
                    item.cseUser = item.cseId ? $scope.vm.usersDict[item.cseId] : null;
                    item.jeUser = item.jeId ? $scope.vm.usersDict[item.jeId] : null;
                    item.esmUser = item.esmId ? $scope.vm.usersDict[item.esmId] : null;
                    return item;
                });
            });
        });
    };

    $scope.getUsers = function () {
        FailuresService.getUsers().then(function(data) {
            $scope.vm.users = data;
            $scope.vm.usersDict = data.reduce(function (array, item, index) { array[item.id] = item; return item; })
        });
    };

    $scope.getSections = function () {
        SectionService.getSections().then(function (data) {
            $scope.vm.sections = data;
        });
    }


    $scope.getFilteredEmployees = function (searchKey) {
        if (searchKey && searchKey.length >= 2) {
            var defer = $q.defer();
            var data = $scope.vm.users.filter(function (item) { return item.displayName.toLowerCase().indexOf(searchKey.toLowerCase()) > -1 || item.email.toLowerCase().indexOf(searchKey.toLowerCase()) > -1; });
            if (data.length == 0) {
                data.push({ noResults: true });
            }

            defer.resolve(data);
            return defer.promise;
        }
    }

    $scope.save = function () {
        if ($scope.departments.$valid) {
            var modelCopy = angular.copy($scope.model);
            modelCopy.asteId = modelCopy.asteUser && modelCopy.asteUser.id ? modelCopy.asteUser.id : null;
            modelCopy.cseId = modelCopy.cseUser && modelCopy.cseUser.id ? modelCopy.cseUser.id : null;
            modelCopy.jeId = modelCopy.jeUser && modelCopy.jeUser.id ? modelCopy.jeUser.id : null;
            modelCopy.esmId = modelCopy.esmUser && modelCopy.esmUser.id ? modelCopy.esmUser.id : null;

            StationService.saveStation(modelCopy).then(function (result) {
                if (result) {
                    $scope.showForm = false;
                    $scope.getAll();
                    NotificationService.information('Saved Successfully');
                }
                else {
                    NotificationService.information('An error was encountered while saving this station.  Please try again.');
                }
            });
        }
        else {
            NotificationService.information('fill all required fields');
        }
    };

    $scope.delete = function (Department) {
        StationService.deleteStation(Department.id).then(function (data) {
            if (data) {
                NotificationService.information('Deleted Successfully');
                $scope.getAll();
            }
            else {
                NotificationService.information('An error was encountered while deleting this station.  Please try again.');
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
            var modelCopy = angular.copy($scope.model);
            modelCopy.asteId = modelCopy.asteUser && modelCopy.asteUser.id ? modelCopy.asteUser.id : null;
            modelCopy.cseId = modelCopy.cseUser && modelCopy.cseUser.id ? modelCopy.cseUser.id : null;
            modelCopy.jeId = modelCopy.jeUser && modelCopy.jeUser.id ? modelCopy.jeUser.id : null;
            modelCopy.esmId = modelCopy.esmUser && modelCopy.esmUser.id ? modelCopy.esmUser.id : null;

            StationService.updateStation(modelCopy).then(function (result) {
                if (result) {
                    $scope.showUpdateButton = false;
                    $scope.showForm = false;
                    $scope.getAll();
                    NotificationService.information('Updated Successfully');
                }
                else {
                    NotificationService.information('An error was encountered while updating this station.  Please try again.');
                }
            });
        }
        else {
            NotificationService.information('fill all required fields');
        }
    };

    $scope.vm.tableHeaders = [
{ name: 'name', title: 'Station Name',  sortReverse: false },
    { name: 'code', title: 'Station Code', sortReverse: false },
    { name: 'sectionName', title: 'Section Name', sortReverse: false },
    { name: 'asteName', title: 'ASTE Name', sortReverse: false },
    { name: 'cseName', title: 'CSE Name', sortReverse: false },
    { name: 'esmName', title: 'ESM Name', sortReverse: false },
    { name: 'jeName', title: 'JE Name', sortReverse: false },
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
        //$scope.getUsers();
        $scope.getSections();
        $scope.getAll();
    };

    init();
}
]);