appRoot.factory("UserService", ['$resource', '$q', function ($resource, $q) {
    function User(args) {
        this.source = args.Source;
        this.destination = args.Destination;
        this.dataType = args.DataType;
        this.isMapped = false;
    }


    userServices = {
        user: $resource('api/user/:action/:id', { id: '@id', action: '@action' }, { update: { method: 'PUT' }, drop: { method: 'DELETE' } }),

        currentUser: $resource("/api/user/getUser"),
        getAll: $resource("/api/user/getUsers"),

        getUsers: function () {
            var users = [];
            return this.getAll.query().$promise.then(function (users) {
                
                return users;
            });
        },

        getUser: function (id) {
            return this.currentUser.get({ Id: id }).$promise.then(function (user) {
                return user;
            });
        },
        
        getLogins: function (from, to) {
            var failures = [];
            return this.user.query({ action: 'getlogins', from: from ? from.dateOnlyString() : '', to: to ? to.dateOnlyString() : '' }).$promise.then(function (failures) {
                return failures;
            });
        },


    };

    return userServices;
}]);


appRoot.controller('userController', [
    '$scope', '$q', '$state', '$stateParams', '$location', 'UserService', 'FailuresService', 'StationService', 'NotificationService',
function ($scope, $q, $state, $stateParams, $location, UserService, FailuresService, StationService, NotificationService) {
    $scope.vm = {};
    $scope.vm.groupEmployeesList = [];

    var removeduplicates = function (sourceAr, targetAr) {
        if (targetAr.length == 0) {
            return sourceAr;
        }

        for (var i = 0; i < sourceAr.length; i++) {
            for (var j = 0; j < targetAr.length; j++) {
                if (targetAr[j].id == sourceAr[i].id) {
                    sourceAr.splice(i, 1);
                    removeduplicates(sourceAr, targetAr);
                    break;
                }
            }
        }
        return sourceAr;
    };

    $scope.vm.tableHeaders = [
{ name: 'email', title: 'Email', sortReverse: false },
{ name: 'displayName', title: 'Display Name', sortReverse: false },
{ name: 'designation', title: 'Designation', sortReverse: false },
{ name: 'phoneNumber', title: 'Phone Number', sortReverse: false },
{ name: 'isAdmin', title: 'Is Admin', sortReverse: false },
{ name: 'isSFREditor', title: 'Is SFR Editor', sortReverse: false },
{ name: 'isReportViewer', title: 'Is Report Viewer', sortReverse: false }
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
            $scope.showForm = false;

            StationService.getStations().then(function (stations) {
                $scope.vm.stations = stations;
                $scope.vm.stationsDict = stations.reduce(function (array, item, index) { array[item.id] = item; return array; }, {});
            });

            UserService.getUsers().then(function (data) {
                $scope.vm.users = data;
                $scope.vm.userMap = $scope.vm.users.reduce(function (o, v, i) {
                    o[v.id] = v;
                    return o;
                }, {});
            });

        };

        $scope.vm.selectEmployee = function () {
            $scope.vm.groupEmployeesList.push({
                id: $scope.vm.groupUser.id,
                name: $scope.vm.groupUser.name,
            });
            $scope.vm.groupUser = null;
        };

        $scope.vm.removeEmployee = function (id) {
            $scope.vm.groupEmployeesList.splice(id, 1);
        };

        $scope.getFilteredEmployees = function (searchKey) {
            if (searchKey && searchKey.length >= 2) {
                var defer = $q.defer();
                var data = $scope.vm.stations.filter(function (item) { return item.name.indexOf(searchKey) > -1 || item.code.indexOf(searchKey) > -1 });
                if (data.length == 0) {
                    data.push({ noResults: true });
                }

                defer.resolve(removeduplicates(data, $scope.vm.groupEmployeesList));
                return defer.promise;
            }
        }

        $scope.addItem = function (data) {
            $scope.showForm = true;
            $scope.showUpdateButton = false;
            $scope.model = {};
            $scope.model.isAdmin = false;
            $scope.model.isSFREditor = false;
            $scope.model.isReportViewer = false;
            $scope.vm.groupEmployeesList = [];
            $scope.vm.groupUser = null;
        };

        $scope.update = function () {
            $scope.model.groupedStations = $scope.vm.groupEmployeesList.map(function (item) { return item.id; });
            if ($scope.userForm.$valid) {
                userServices.user.update({ action: 'update', id: $scope.model.id }, $scope.model).$promise.then(function (result) {
                    if (result.isDeleted) {
                        $scope.showUpdateButton = false;
                        $scope.showForm = false;
                        init();
                        NotificationService.information('Updated Successfully');
                    }
                    else {
                        NotificationService.information('An error was encountered while updating this User.');
                    }
                });
            }
            else {
                NotificationService.information('fill all required fields');
            }
        };

        $scope.save = function () {
            if ($scope.userForm.$valid) {
                $scope.model.groupedStations = $scope.vm.groupEmployeesList.map(function (item) { return item.id; });
                userServices.user.get({id: 0, action: 'emailExsits', email: $scope.model.email }).$promise.then(function (data) {
                    if (!data.emailExsists) {
                        userServices.user.save({ action: 'add' }, $scope.model).$promise.then(function (result) {
                            if (result.id) {
                                $scope.showForm = false;
                                init();
                                NotificationService.information('User Added Successfully');
                            }
                            else {
                                NotificationService.information('An error was encountered while saving this User.  Please try again.');
                            }
                        }, function () {
                            NotificationService.information('An error was encountered while saving this User.  Please try again.');
                        });
                    }
                    else {
                        NotificationService.information('User with same email already exists.');
                    }
                }, function (error) {
                    NotificationService.information('An error was encountered while saving this User.  Please try again.');
                })
            }
            else {
                NotificationService.information('fill all required fields');
            }
        };

        $scope.modify = function (user) {
            $scope.showForm = true;
            $scope.model = angular.copy(user);
            $scope.showUpdateButton = true;
            $scope.vm.groupUser = null;
            setGroupedStations();
        };

        $scope.cancel = function () {
            $scope.showForm = false;
            $scope.showUpdateButton = false;
        };

        var setGroupedStations = function (stations) {
            $scope.vm.groupEmployeesList = [];
            $scope.model.groupedStations.filter(function (item) {
                var user = $scope.vm.stationsDict[item];
                $scope.vm.groupEmployeesList.push({
                    id: user.id,
                    name: user.name,
                });
            });
        };

        $scope.resetPassword = function (user) {
            if (confirm("Are Sure Do you Want to Reset Password?")) {
                userServices.user.update({ action: 'resetpassword', id: user.id }, user).$promise.then(function (result) {
                    NotificationService.information('User password has been reset to 123456');
                }, function (error) {
                    NotificationService.information('An error was encountered while password reset. Please try again.');
                });
            }
        };

        init();
    }]);