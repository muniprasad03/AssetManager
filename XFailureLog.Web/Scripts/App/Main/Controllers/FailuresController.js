appRoot.factory("FailuresService", ['$resource', '$q', 'NotificationService', function ($resource, $q, NotificationService) {

    failuresServices = {
        failure: $resource('api/failure/:action/:id', { action: '@action' }, { update: { method: 'PUT' }, drop: { method: 'DELETE' } }),

        getFailures: function (from, to) {
            var failures = [];
            return this.failure.query({ action: 'getfailures', from: from ? from.dateOnlyString() : '', to: to ? to.dateOnlyString() : '' }).$promise.then(function (failures) {
                return failures;
            });
        },

        getFailureMangeInfo : function () {
            return this.failure.get({ action: 'getfailureManageInfo' }).$promise.then(function (data) {
                return data;
            });
        },

        getUsers: function () {
            var failures = [];
            return this.failure.query({ action: 'getUsers' }).$promise.then(function (failures) {
                return failures;
            });
        },

        getfailure: function (id) {
            return this.failure.get({ action: 'detail', Id: id }).$promise.then(function (data) {
                return data;
            });
        },

        deletefailure: function (id) {
            return this.failure.drop({ action: '', id: id }).$promise;
        },

        savefailure: function (data) {
            return this.failure.save({ action: 'savefailure' }, data).$promise;
        },

        updatefailure: function (data) {
            return this.failure.update({ action: 'updatefailure' }, data).$promise;
        }
    };

    return failuresServices;
}]);

appRoot.controller('BlockRequestController', [
    '$scope', '$state', '$stateParams', '$location', '$filter', 'FailuresService', 'UserService', 'NotificationService', 'SharedModel',
function ($scope, $state, $stateParams, $location, $filter, FailuresService, UserService, NotificationService, SharedModel) {
    console.log('Instantiated failureController');
    $scope.vm = {};
    $scope.vm.directions = [{ id: 1, name: "UP" }, { id: 2, name: "Dowm" }, { id: 3, name: "SL" }, { id: 4, name: "YO" }, { id: 5, name: "CR Line" }]

    $scope.costDepartments = ["S&T"];
    $scope.nonCostDepartments = ["Engineering", "Operating", "Electrical", "OHE", "C&W", "Miscellaneous"]

    $scope.getUnits = function (search) {
        var newSupes = $scope.model && $scope.model.failureChargeable ? $scope.costDepartments.slice() : $scope.nonCostDepartments.slice();

        if (search && newSupes.find(function (ele) { return ele.toLowerCase() == search.toLowerCase() }) == null) {
            newSupes.unshift(search);
        }
        return newSupes;
    }

    $scope.vm.tableHeaders = [
      { name: 'sfrNo', title: 'SFRNo', sortReverse: false },
      { name: 'reported', title: 'Reported', sortReverse: false },
      { name: 'station', title: 'Station', sortReverse: false },
      { name: 'gearFault', title: 'Gear at Fault', sortReverse: false },
      { name: 'description', title: 'Description', sortReverse: false },
        { name: 'causeOfFailureValue', title: 'Cause Of Failure', sortReverse: false },
        { name: 'subCauseOfFailureValue', title: 'SubCause Of Failure', sortReverse: false },
      { name: 'timeOfOccurance', title: 'Time Of Occurance', sortReverse: false },
      { name: 'timeSignalMainInformed', title: 'Time Signal Main Informed', sortReverse: false },
      { name: 'timeSignalMainReached', title: 'Time Signal Main Reached', sortReverse: false },
      { name: 'timeRectified', title: 'Time Rectified', sortReverse: false },
      { name: 'duration', title: 'Duration', sortReverse: false },
    ];

    $scope.vm.sortTableData = function (header) {
        $scope.vm.currentSortingElement = header;
        $scope.vm.sortType = header.name;
        header.sortReverse = !header.sortReverse;
        $scope.vm.sortReverse = header.sortReverse;
    };

    $scope.delete = function (product) {
        FailuresService.deletefailure(product.id).then(function (data) {
            if (data) {
                NotificationService.information('Failure Deleted Successfully.');
                $scope.get();
            }
            else {
                NotificationService.information('Error in deleting Failure. Please try again.');
            }
        });
    };

    $scope.getExportDataSource = function () {
        var dataSource = [];
        var resultData = $filter("filter")($scope.vm.failures, $scope.searchText);
        for (var i = 0; i < resultData.length; i += 1) {
            var x = resultData[i];
            try {
                var item = {
                    Name: x.name,
                    Date: $filter('date')(x.date),
                    Program: x.program,
                    Area: x.area,
                    WorkInvolved: x.workInvolved,
                    StaffNominated: x.staffNominated,
                    Substitude: x.substitude,
                    Remarks: x.remarks,
                    Result: x.result ? "Completed" : "Not Completed"
                };
                dataSource.push(item);
            } catch (msg) {
                console.log(x);
                console.log(msg);   
            }
        }
        return dataSource;
    }

    $scope.getExportHeaders = function () {
        return ['Name', 'Date', 'Program', 'Area', 'Work Involved', 'StaffNominated', 'Substitude', 'Remarks', 'Result'];
    }

    $scope.getFailureMangeInfo = function () {
        FailuresService.getFailureMangeInfo().then(function (data) {
            $scope.vm.sections = data.sections;
            $scope.vm.boards = data.boards;
            $scope.vm.departments = data.departments;
        });
    }

    $scope.getAll = function () {
        var date = new Date();
        $scope.vm.fromDate = new Date(date.setDate(date.getDate() - 30));
        $scope.vm.toDate = new Date(new Date().setHours(23, 59, 59, 999));
        $scope.get()
    };

    $scope.get = function () {
        if ($scope.vm.fromDate && $scope.vm.toDate && new Date($scope.vm.fromDate).getTime() <= new Date($scope.vm.toDate).getTime()) {
            FailuresService.getFailures($scope.vm.fromDate, $scope.vm.toDate).then(function (pointers) {
                $scope.vm.failures = pointers;
                $scope.vm.failures.forEach(function (item) {
                    item.duration = item.totalDuration && item.totalDuration > 0 ? $filter('decimalToHHMM')(item.totalDuration) : "";
                });
                $scope.vm.rawData = angular.copy($scope.vm.failures);
            });
        } else {
            NotificationService.error("Select Valid Dates.");
        }
    }

    $scope.save = function (data) {
        if ($scope.failure.$valid) {
                var model = $scope.getSavingModel($scope.model);
                FailuresService.savefailure(model).then(function (result) {
                    $scope.showForm = false;
                    $scope.get();
                    NotificationService.information('Saved Successfully');

                }, function (error) {
                    NotificationService.information('An error was encountered while saving this Request.  Please try again.');
                });
        }
        else {
            NotificationService.information('fill all required fields');
        }
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

    $scope.modify = function (category) {
        $scope.showForm = true;
        $scope.model = angular.copy(category);
        $scope.model.timeOfOccurance = $scope.getSavedTime($scope.model.timeOfOccurance);
        $scope.model.timeSignalMainInformed = $scope.getSavedTime($scope.model.timeSignalMainInformed);
        $scope.model.timeSignalMainReached = $scope.getSavedTime($scope.model.timeSignalMainReached);
        $scope.model.timeRectified = $scope.getSavedTime($scope.model.timeRectified);
        $scope.model.station = $scope.vm.stations.find(function (item) { return item.id == $scope.model.stationId; });
        $scope.model.manufacturer = $scope.vm.manufactures.find(function (item) { return item.id == $scope.model.manufactureId; });
        $scope.model.causeOfFailureItem = $scope.vm.causeOfFailures.find(function (item) { return item.id == $scope.model.causeOfFailureId; });
        //#scope.model.gearId = category.gearId;
        $scope.model.subCauseOfFailureItem = $scope.vm.subCauseOfFailure.find(function (item) { return item.id == $scope.model.subCauseOfFailureId; });
        $scope.model.dateOfInstallOn = $scope.model.dateOfInstallOn ? new Date($scope.model.dateOfInstallOn) : $scope.model.dateOfInstallOn;
        $scope.model.esmLastVisitOn = $scope.model.esmLastVisitOn ? new Date($scope.model.esmLastVisitOn) : $scope.model.esmLastVisitOn;
        $scope.model.sseLastVisitOn = $scope.model.sseLastVisitOn ? new Date($scope.model.sseLastVisitOn) : $scope.model.sseLastVisitOn;
        $scope.model.jeLastVisitOn = $scope.model.jeLastVisitOn ? new Date($scope.model.jeLastVisitOn) : $scope.model.jeLastVisitOn;
        $scope.showUpdateButton = true;
    }

    $scope.getSavingModel = function (item) {
        var model = angular.copy(item);
        //model.timeOfOccurance = $scope.getSavingTime(model.timeOfOccurance);
        //model.timeSignalMainInformed = $scope.getSavingTime(model.timeSignalMainInformed);
        //model.timeSignalMainReached = $scope.getSavingTime(model.timeSignalMainReached);
        //model.timeRectified = $scope.getSavingTime(model.timeRectified);
        //model.dateOfInstallOn = item.dateOfInstallOn ? item.dateOfInstallOn.dateOnlyString() : item.dateOfInstallOn;
        //model.esmLastVisitOn = item.esmLastVisitOn ? item.esmLastVisitOn.dateOnlyString() : item.esmLastVisitOn;
        //model.sseLastVisitOn = item.sseLastVisitOn ? item.sseLastVisitOn.dateOnlyString() : item.sseLastVisitOn;
        //model.jeLastVisitOn = item.jeLastVisitOn ? item.jeLastVisitOn.dateOnlyString() : item.jeLastVisitOn;
        //model.numberOfTrainsLate = item.numberOfTrainsLate > 0 ? parseInt(item.numberOfTrainsLate) : 0;
        return model;
    };

    $scope.getSavingTime = function (givenDate) {
        if (givenDate) {
            var date = new Date(givenDate);
            date.setSeconds(0);
            var localOffSet = new Date().getTimezoneOffset() * 60000;
            return new Date(date.getTime() - localOffSet);
        }
        else {
            return null;
        }
    }

    $scope.getDuration = function () {
        if ($scope.model.timeOfOccurance && $scope.model.timeRectified && $scope.model.timeOfOccurance <= $scope.model.timeRectified) {
            var diff = Math.abs(new Date($scope.model.timeOfOccurance) - new Date($scope.model.timeRectified));
            var minutes = parseFloat((diff / 1000) / 60).toFixed(2);
            var hours = parseFloat((minutes / 60).toFixed(2));
            return $filter('decimalToHHMM')(hours);
        }

        return "";
    }

    $scope.selectStation = function (item) {
        if ($scope.model.section) {
            $scope.model.sectionId = $scope.model.section.id;
        }
    }

    $scope.setDuration = function () {
        $scope.model.duration = $scope.getDuration();
    }

    $scope.getSavedTime = function (dateTime) {
        if (!dateTime) {
            return null;
        }
        return new SharedModel.StringToDate(dateTime);
    };

    $scope.isGearIdValid = function () {
        if ($scope.model.gearFaultId <= 17) {
            return $scope.model.gearId !== null;
        }

        return true;
    }   

    $scope.update = function (data) {
        if ($scope.failure.$valid && $scope.isGearIdValid()) {
            if (($scope.model.timeOfOccurance == null || $scope.model.timeRectified == null) || ($scope.model.timeOfOccurance <= $scope.model.timeRectified)) {
            var model = $scope.getSavingModel($scope.model);
            FailuresService.updatefailure(model).then(function (result) {
                    $scope.showForm = false;
                    $scope.showUpdateButton = false;
                    $scope.get();
                    NotificationService.information('Updated Successfully');
            }, function (error) {
                NotificationService.information('An error was encountered while saving this failure.  Please try again.');
            });
            }
            else {
                NotificationService.information('Time Occurance should be less than the time Rectified.  Please Change Times.');
            }
        }
        else {
            NotificationService.information('fill all required fields');
        }        
    };

    var init = function () {
        $scope.SortValue = 'None';
        $scope.SortByPredicate = 'none';
        $scope.searchText = '';
        $scope.getFailureMangeInfo();

        UserService.getUser().then(function (user) {
            $scope.vm.profile = user;
        }, function (error) {
            console.log(error);
            });

        $scope.getAll();
        var header = $scope.vm.tableHeaders.find(function (item) { return item.name == 'timeOfOccurance'; });
        $scope.vm.sortTableData(header);
    };

    init();
}
]);