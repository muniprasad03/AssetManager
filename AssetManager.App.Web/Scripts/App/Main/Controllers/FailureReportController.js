appRoot.factory("ReportService", ['$resource', '$q', 'NotificationService', function ($resource, $q, NotificationService) {

    failuresServices = {
        failure: $resource('api/report/:action/:id', { action: '@action' }, { update: { method: 'PUT' }, drop: { method: 'DELETE' } }),

        getFailures: function (from, to) {
            var failures = [];
            return this.failure.query({ action: 'getfailures', from: from ? from.dateOnlyString() : '', to: to ? to.dateOnlyString() : '' }).$promise.then(function (failures) {
                return failures;
            });
        },

        getFilterFailures: function (model) {
            var failures = [];
            return this.failure.save({ action: 'failures' }, model).$promise.then(function (failures) {
                return failures.data;
            });
        },

        getFilterCauseFailures: function (model) {
            var failures = [];
            return this.failure.save({ action: 'failureCauses' }, model).$promise.then(function (failures) {
                return failures.data;
            });
        },

        getChargableStats: function () {
            return this.failure.get({ action: 'costStats' }).$promise.then(function (data) {
                return data;
            });
        },

        getGearFaultStats: function () {
            return this.failure.get({ action: 'gearfaultStats' }).$promise.then(function (data) {
                return data;
            });
        },

        getExportFailures: function (model) {
            return this.failure.save({ action: 'failure/Export' }, model).$promise.then(function (data, staus, headers) {
                return data;
            });
        },

        getFailureMangeInfo: function () {
            return this.failure.get({ action: 'getfailureManageInfo' }).$promise.then(function (data) {
                return data;
            });
        },

        getFailureCauseMangeInfo: function () {
            return this.failure.get({ action: 'getfailureCauseManageInfo' }).$promise.then(function (data) {
                return data;
            });
        },

        getFailureDashboardInfo: function (monthView) {
            return this.failure.get({ action: 'getfailureDashboardInfo', monthView: monthView }).$promise.then(function (data) {
                return data;
            });
        },
    };

    return failuresServices;
}]);

appRoot.controller('failureReportController', [
    '$scope', '$state', '$stateParams', '$location', '$filter', 'ReportService', 'UserService', 'NotificationService', 'SharedModel', '$uibModal', '$http',
    function ($scope, $state, $stateParams, $location, $filter, ReportService, UserService, NotificationService, SharedModel, $uibModal, $http) {
        console.log('Instantiated reports');
        $scope.vm = {};

        $scope.vm.scrollSettings = {
            background: 'rgb(206,208,211)',
            cursorwidth: '10px',
            autohidemode: 'leave'
        };

        $scope.vm.userFilter = { id: 0, title: 'All', items: [] };
        $scope.vm.sectionFilter = { id: 0, title: 'All', items: [] };
        $scope.vm.stationTypeFilter = { id: -1, title: 'All', items: [] };

        $scope.vm.stationFilter = { id: 0, title: 'All', items: [] };
        $scope.vm.reportedFilter = { id: 0, title: 'All', items: [] };
        $scope.vm.gearFaultFilter = { id: 0, title: 'All', items: [] };
        $scope.vm.subGearFaultFilter = { id: 0, title: 'All', items: [] };
        $scope.vm.manufactureFilter = { id: 0, title: 'All', items: [] };
        $scope.vm.punctualityFilter = { id: -1, title: 'All', items: [] };

        $scope.vm.tableHeaders = [
            { name: 'sfrNo', title: 'SFRNo', sortReverse: false },
            { name: 'timeOfOccurance', title: 'Time Of Occurance', sortReverse: false },
            { name: 'reported', title: 'Reported', sortReverse: false },
            { name: 'station', title: 'Station', sortReverse: false },
            { name: 'gearFault', title: 'Gear at Fault', sortReverse: false },
            { name: 'subGearFault', title: 'Sub Gear at Fault', sortReverse: false },
            { name: 'causeOfFailureValue', title: 'Cause', sortReverse: false },
            //{ name: 'timeSignalMainInformed', title: 'Time Signal Main Informed', sortReverse: false },
            //{ name: 'timeSignalMainReached', title: 'Time Signal Main Reached', sortReverse: false },
            { name: 'timeRectified', title: 'Time Rectified', sortReverse: false },
            { name: 'duration', title: 'Duration', sortReverse: false },
            { name: 'updatedByName', title: 'Updated By', sortReverse: false },
        ];

        $scope.vm.sortTableData = function (header) {
            $scope.vm.currentSortingElement = header;
            $scope.vm.sortType = header.name;
            header.sortReverse = !header.sortReverse;
            $scope.vm.sortReverse = header.sortReverse;
        };

        $scope.getExportDataSource = function () {
            var dataSource = [];
            var resultData = $filter("filter")($scope.vm.failures, $scope.searchText);
            for (var i = 0; i < resultData.length; i += 1) {
                var x = resultData[i];
                try {
                    var item = {
                        SFRNo: x.sfrNo,
                        Reported: x.reported,
                        Station: x.station,
                        gearatFault: x.gearFault,
                        BreifDescription: x.description,
                        causeOfFailure: x.causeOfFailure,
                        trainLossPunctuality: x.trainLossPunctual,
                        trainDetained: x.trainDetained,
                        failureChargeable: x.failureChargeable ? "Yes" : "No",
                        department: x.department,
                        timeOfOccurance: x.stimeOfOccurance,
                        timeSignalMainInformed: x.stimeSignalMainInformed,
                        timeSignalMainReached: x.stimeSignalMainReached,
                        timeRectified: x.stimeRectified,
                        duration: x.duration,
                        updatedByName: x.updatedByName
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
            return ['SFRNo', 'Reported', 'Station', 'Gear at Fault', 'Breif Description', 'Cause of Failure', 'Train Loss Punctuality', 'Train Detained', 'Failure Chargeable', 'Department', 'Time of Occurance', 'Time Signal Main Informed', 'Time Signal Main Reached', 'Time Rectified', 'Duration', 'Updated By'];
        }

        $scope.getFailureMangeInfo = function () {
            ReportService.getFailureMangeInfo().then(function (data) {
                $scope.vm.sections = data.sections;
                $scope.vm.stations = data.stations;
                $scope.vm.stationTypes = [{ name: 'Station', id: 0 }, { name: 'IB', id: 1 }, { name: 'LC Gate', id: 2 }];
                $scope.vm.gearFaults = data.gearFaults;
                $scope.vm.reporteds = data.reporteds;
                $scope.vm.users = data.users;
                $scope.vm.currentUsers = data.users;
                $scope.vm.currentStations = data.stations;
                $scope.vm.manufactures = data.manufactures;
                $scope.vm.currentManufactures = data.manufactures;
                $scope.vm.subGearFaults = data.subGearFaults;
                $scope.vm.currentSubGearFaults = data.subGearFaults;
                var date = new Date();

                if ($stateParams.monthView != undefined) {
                    var montView = $stateParams.monthView;
                    if (montView == 0) {
                        $scope.vm.fromDate = new Date(new Date().setHours(23, 59, 59, 999));
                        $scope.vm.toDate = new Date(new Date().setHours(23, 59, 59, 999));
                    }
                    else if (montView == 1) {
                        $scope.vm.fromDate = new Date(new Date(date.getFullYear(), date.getMonth(), 1).setHours(23, 59, 59, 999));
                        $scope.vm.toDate = new Date(new Date().setHours(23, 59, 59, 999));
                    }
                    else {
                        $scope.vm.toDate = new Date(new Date(date.getFullYear(), date.getMonth(), 0).setHours(23, 59, 59, 999));
                        $scope.vm.fromDate = new Date(new Date($scope.vm.toDate.getFullYear(), $scope.vm.toDate.getMonth(), 1).setHours(23, 59, 59, 999));

                    }
                }
                else {
                    $scope.vm.fromDate = new Date(date.setDate(date.getDate() - 3));
                    $scope.vm.toDate = new Date(new Date().setHours(23, 59, 59, 999));
                }

                if ($stateParams.section > 0) {
                    var section = $scope.vm.sections.find(function (item) { return item.id == $stateParams.section });
                    if (section != null) {
                        section.selected = true;
                        $scope.updateSectionFilter(section);
                    }
                }

                if ($stateParams.reported > 0) {
                    var reported = $scope.vm.reporteds.find(function (item) { return item.id == $stateParams.reported });
                    if (reported != null) {
                        reported.selected = true;
                        $scope.updateReportedFilter(reported);
                    }
                }

                if ($stateParams.gear > 0) {
                    var reported = $scope.vm.gearFaults.find(function (item) { return item.id == $stateParams.gear });
                    if (reported != null) {
                        reported.selected = true;
                        $scope.updateGearFaultFilter(reported);
                    }
                }

                if ($stateParams.late == 1) {
                    $scope.vm.punctualityFilter = { id: 1, title: 'Loss Punctuality', items: [] };
                }

                if ($stateParams.late == 0) {
                    $scope.vm.punctualityFilter = { id: 0, title: 'Punctual', items: [] };
                }

                $scope.get()

            });
        }

        $scope.getAll = function () {
            var date = new Date();
            $scope.vm.fromDate = new Date(date.setDate(date.getDate() - 3));
            $scope.vm.toDate = new Date(new Date().setHours(23, 59, 59, 999));
            $scope.get()
        };

        $scope.showFailureDetails = function (failure) {
            $scope.vm.currentFailure = failure;
            $scope.failureModelInstance = $uibModal.open({
                templateUrl: 'failure-detail',
                scope: $scope
            });
        }

        $scope.getSavedTime = function (dateTime) {
            if (!dateTime) {
                return null;
            }
            return $filter("stringToDate")(dateTime, "dd-MMM-yyyy HH:mm");
        };

        $scope.get = function () {
            if ($scope.vm.fromDate && $scope.vm.toDate && new Date($scope.vm.fromDate).getTime() <= new Date($scope.vm.toDate).getTime()) {
                var filterModel = $scope.getFilterModel();
                ReportService.getFilterFailures(filterModel).then(function (pointers) {
                    //ReportService.getFailures($scope.vm.fromDate, $scope.vm.toDate).then(function (pointers) {
                    $scope.vm.failures = pointers;
                    $scope.vm.failures.forEach(function (item) {
                        item.stimeOfOccurance = $scope.getSavedTime(item.timeOfOccurance);
                        item.stimeSignalMainInformed = $scope.getSavedTime(item.timeSignalMainInformed);
                        item.stimeSignalMainReached = $scope.getSavedTime(item.timeSignalMainReached);
                        item.stimeRectified = $scope.getSavedTime(item.timeRectified);
                        item.duration = item.totalDuration && item.totalDuration > 0 ? $filter('decimalToHHMM')(item.totalDuration) : "";
                    });

                    $scope.vm.rawData = angular.copy($scope.vm.failures);
                    filterData();
                });
            } else {
                NotificationService.error("Select Valid Dates.");
            }
        }

        $scope.getFilterModel = function () {
            var timeOfOccurenceOrder = 0;
            var totalTimeOrder = 0;
            if ($scope.vm.sortType == "timeOfOccurance") {
                timeOfOccurenceOrder = $scope.vm.sortReverse ? 2 : 1;
            }
            else if ($scope.vm.sortType == "duration") {
                totalTimeOrder = $scope.vm.sortReverse ? 2 : 1;
            }

            var model = {
                fromDate: $scope.vm.fromDate.dateOnlyString(),
                format: 'Excel',
                toDate: $scope.vm.toDate.dateOnlyString(),
                sectionFilter: $scope.vm.sectionFilter.id,
                stationFilter: $scope.vm.stationFilter.id,
                stationTypeFilter: $scope.vm.stationTypeFilter.id,
                userFilter: $scope.vm.userFilter.id,
                reportedFilter: $scope.vm.reportedFilter.id,
                punctualityFilter: $scope.vm.punctualityFilter.id,
                gearAtFaultFilter: $scope.vm.gearFaultFilter.id,
                subGearAtFaultFilter: $scope.vm.subGearFaultFilter.id,
                manufactureFilter: $scope.vm.manufactureFilter.id,
                timeOfOccurenceOrder: timeOfOccurenceOrder,
                totalTimeOrder: totalTimeOrder
            };

            model.sections = $scope.vm.sectionFilter.items.map(function (value) { return value.id; }) || [];
            model.stationTypes = $scope.vm.stationTypeFilter.items.map(function (value) { return value.id; }) || [];
            model.stations = $scope.vm.stationFilter.items.map(function (value) { return value.id; }) || [];
            model.reporteds = $scope.vm.reportedFilter.items.map(function (value) { return value.id; }) || [];
            model.users = $scope.vm.userFilter.items.map(function (value) { return value.id; }) || [];
            model.gears = $scope.vm.gearFaultFilter.items.map(function (value) { return value.id; }) || [];
            model.subGears = $scope.vm.subGearFaultFilter.items.map(function (value) { return value.id; }) || [];
            model.manufatures = $scope.vm.manufactureFilter.items.map(function (value) { return value.id; }) || [];

            return model;
        };

        $scope.$watch('vm.sectionFilter', function (newVal, oldVal) {
            if (newVal && oldVal != newVal) {
                $scope.vm.userFilter = { id: 0, title: 'All', items: [] };
                $scope.vm.stationFilter = { id: 0, title: 'All', items: [] };
                $scope.vm.stationTypeFilter = { id: -1, title: 'All', items: [] };

                if ($scope.vm.sectionFilter.id != 0) {
                    var sectionsMap = $scope.vm.sectionFilter.items.reduce(function (o, v, i) { o[v.id] = v; return o; }, {});
                    $scope.vm.currentStations = $scope.vm.stations.filter(function (item) {
                        return sectionsMap[item.sectionId] != null;
                    });

                    $scope.vm.currentUsers = $scope.vm.users.filter(function (item) {
                        return $scope.vm.currentStations.find(function (station) { return (station.asteId == item.id || station.cseId == item.id || station.jeId == item.id || station.esmId == item.id); }) != null;
                    });
                }
                else {
                    $scope.vm.currentUsers = angular.copy($scope.vm.users);
                    $scope.vm.currentStations = angular.copy($scope.vm.stations);
                    $scope.removeSelection($scope.vm.sections);
                }

                $scope.removeSelection($scope.vm.stationTypes);
                $scope.removeSelection($scope.vm.currentUsers);
                $scope.removeSelection($scope.vm.currentStations);
                filterData();
            }
        });

        $scope.removeSelection = function (itemsArray) {
            itemsArray.forEach(function (item) {
                if (item.selected) {
                    item.selected = false;
                }
            });
        }

        $scope.$watch('vm.userFilter', function (newVal, oldVal) {
            if (newVal && oldVal != newVal) {
                $scope.vm.stationFilter = { id: 0, title: 'All', items: [] };

                if ($scope.vm.sectionFilter.id != 0) {
                    var sectionsMap = $scope.vm.sectionFilter.items.reduce(function (o, v, i) { o[v.id] = v; return o; }, {});
                    $scope.vm.currentStations = $scope.vm.stations.filter(function (item) {
                        return sectionsMap[item.sectionId] != null;
                    });
                }
                else {
                    $scope.vm.currentStations = angular.copy($scope.vm.stations);
                }

                if ($scope.vm.stationTypeFilter.id != -1) {
                    var typesMap = $scope.vm.stationTypeFilter.items.reduce(function (o, v, i) { o[v.id] = v; return o; }, {});
                    $scope.vm.currentStations = $scope.vm.currentStations.filter(function (item) {
                        return typesMap[item.stationType] != null;
                    });
                }

                if ($scope.vm.userFilter.id != 0) {
                    var usersMap = $scope.vm.userFilter.items.reduce(function (o, v, i) { o[v.id] = v; return o; }, {});
                    $scope.vm.currentStations = $scope.vm.currentStations.filter(function (station) {
                        if (usersMap[station.asteId] != null || usersMap[station.cseId] != null || usersMap[station.jeId] != null || usersMap[station.esmId] != null) {
                            return true;
                        }
                    });
                }
                else {
                    $scope.removeSelection($scope.vm.currentUsers);
                }

                $scope.removeSelection($scope.vm.currentStations);

                filterData();
            }
        });

        $scope.$watch('vm.stationFilter', function (newVal, oldVal) {
            if (newVal && oldVal != newVal) {
                if (newVal.id == 0) {
                    $scope.removeSelection($scope.vm.currentStations);
                }

                filterData();
            }
        });

        $scope.$watch('vm.reportedFilter', function (newVal, oldVal) {
            if (newVal && oldVal != newVal) {
                if (newVal.id == 0) {
                    $scope.removeSelection($scope.vm.reporteds);
                }
                filterData();
            }
        });

        $scope.$watch('vm.gearFaultFilter', function (newVal, oldVal) {
            if (newVal && oldVal != newVal) {
                $scope.vm.subGearFaultFilter = { id: 0, title: 'All', items: [] };
                //$scope.vm.manufactureFilter = { id: 0, title: 'All', items: [] };

                if ($scope.vm.gearFaultFilter.id != 0) {
                    var gearsMap = $scope.vm.gearFaultFilter.items.reduce(function (o, v, i) { o[v.id] = v; return o; }, {});
                    $scope.vm.currentSubGearFaults = $scope.vm.subGearFaults.filter(function (item) {
                        return gearsMap[item.gearFaultId] != null;
                    });

                    //$scope.vm.currentManufactures = $scope.vm.manufactures.filter(function (item) {
                    //    return gearsMap[item.gearFaultId] != null;
                    //});
                }
                else {
                    $scope.vm.currentSubGearFaults = angular.copy($scope.vm.subGearFaults)
                    //$scope.vm.currentManufactures = angular.copy($scope.vm.manufactures)
                    $scope.removeSelection($scope.vm.gearFaults);
                }

                filterData();
            }
        });

        $scope.$watch('vm.subGearFaultFilter', function (newVal, oldVal) {
            if (newVal && oldVal != newVal) {
                if (newVal.id == 0) {
                    $scope.removeSelection($scope.vm.currentSubGearFaults);
                }
                filterData();
            }
        });

        $scope.$watch('vm.manufactureFilter', function (newVal, oldVal) {
            if (newVal && oldVal != newVal) {
                if (newVal.id == 0) {
                    $scope.removeSelection($scope.vm.currentManufactures);
                }
                filterData();
            }
        });

        $scope.$watch('vm.stationTypeFilter', function (newVal, oldVal) {
            if (newVal && oldVal != newVal) {
                $scope.vm.userFilter = { id: 0, title: 'All', items: [] };
                $scope.vm.stationFilter = { id: 0, title: 'All', items: [] };

                if ($scope.vm.stationTypeFilter.id != -1) {
                    var sectionsMap = $scope.vm.stationTypeFilter.items.reduce(function (o, v, i) { o[v.id] = v; return o; }, {});
                    $scope.vm.currentStations = $scope.vm.stations.filter(function (item) {
                        return sectionsMap[item.stationType] != null;
                    });

                    $scope.vm.currentUsers = $scope.vm.users.filter(function (item) {
                        return $scope.vm.currentStations.find(function (station) { return (station.asteId == item.id || station.cseId == item.id || station.jeId == item.id || station.esmId == item.id); }) != null;
                    });
                }
                else {
                    $scope.vm.currentUsers = angular.copy($scope.vm.users);
                    $scope.vm.currentStations = angular.copy($scope.vm.stations);
                    $scope.removeSelection($scope.vm.stationTypeFilter);
                }

                $scope.removeSelection($scope.vm.currentUsers);
                $scope.removeSelection($scope.vm.currentStations);
                filterData();
            }
        });

        $scope.updateSectionFilter = function (section) {
            var sectionFilter = angular.copy($scope.vm.sectionFilter);
            if (section.selected) {
                $scope.vm.sectionFilter = { id: -1, title: "Some", items: sectionFilter.items || [] };
                $scope.vm.sectionFilter.items.push(section);
            }
            else {
                var sectionItems = sectionFilter.items.filter(function (val) { if (val.id != section.id) { return val; } });
                if (sectionItems.length == 0) {
                    $scope.vm.sectionFilter = { id: 0, title: 'All', items: [] };
                }
                else {
                    $scope.vm.sectionFilter = {
                        id: -1, title: "Some", items: sectionItems
                    };
                }
            }
        }

        $scope.updateStationTypeFilter = function (section) {
            var sectionFilter = angular.copy($scope.vm.stationTypeFilter);
            if (section.selected) {
                $scope.vm.stationTypeFilter = { id: -2, title: "Some", items: sectionFilter.items || [] };
                $scope.vm.stationTypeFilter.items.push(section);
            }
            else {
                var sectionItems = sectionFilter.items.filter(function (val) { if (val.id != section.id) { return val; } });
                if (sectionItems.length == 0) {
                    $scope.vm.stationTypeFilter = { id: -1, title: 'All', items: [] };
                }
                else {
                    $scope.vm.stationTypeFilter = {
                        id: -2, title: "Some", items: sectionItems
                    };
                }
            }
        }

        $scope.updateUserFilter = function (section) {
            var userFilter = angular.copy($scope.vm.userFilter);
            if (section.selected) {
                $scope.vm.userFilter = { id: -1, title: "Some", items: userFilter.items || [] };
                $scope.vm.userFilter.items.push(section);
            }
            else {
                var userItems = userFilter.items.filter(function (val) { if (val.id != section.id) { return val; } });
                if (userItems.length == 0) {
                    $scope.vm.userFilter = { id: 0, title: 'All', items: [] };
                }
                else {
                    $scope.vm.userFilter = {
                        id: -1, title: "Some", items: userItems
                    };
                }
            }
        }

        $scope.updateStationFilter = function (section) {
            var stationFilter = angular.copy($scope.vm.stationFilter);
            if (section.selected) {
                $scope.vm.stationFilter = { id: -1, title: "Some", items: stationFilter.items || [] };
                $scope.vm.stationFilter.items.push(section);
            }
            else {
                var stationItems = stationFilter.items.filter(function (val) { if (val.id != section.id) { return val; } });
                if (stationItems.length == 0) {
                    $scope.vm.stationFilter = { id: 0, title: 'All', items: [] };
                }
                else {
                    $scope.vm.stationFilter = {
                        id: -1, title: "Some", items: stationItems
                    };
                }

            }
        }

        $scope.updateGearFaultFilter = function (section) {
            var gearFaultFilter = angular.copy($scope.vm.gearFaultFilter);
            if (section.selected) {
                $scope.vm.gearFaultFilter = { id: -1, title: "Some", items: gearFaultFilter.items || [] };
                $scope.vm.gearFaultFilter.items.push(section);
            }
            else {
                var gearItmes = gearFaultFilter.items.filter(function (val) { if (val.id != section.id) { return val; } });
                if (gearItmes.length == 0) {
                    $scope.vm.gearFaultFilter = { id: 0, title: 'All', items: [] };
                }
                else {
                    $scope.vm.gearFaultFilter = {
                        id: -1, title: "Some", items: gearItmes
                    };
                }
            }
        }

        $scope.updateSubGearFaultFilter = function (section) {
            var subGearFaultFilter = angular.copy($scope.vm.subGearFaultFilter);
            if (section.selected) {
                $scope.vm.subGearFaultFilter = { id: -1, title: "Some", items: subGearFaultFilter.items || [] };
                $scope.vm.subGearFaultFilter.items.push(section);
            }
            else {
                var items = subGearFaultFilter.items.filter(function (val) { if (val.id != section.id) { return val; } });
                if (items.length == 0) {
                    $scope.vm.subGearFaultFilter = { id: 0, title: 'All', items: [] };
                }
                else {
                    $scope.vm.subGearFaultFilter = {
                        id: -1, title: "Some", items: items
                    };
                }
            }
        }


        $scope.updateManufactureFilter = function (section) {
            var manufactureFilter = angular.copy($scope.vm.manufactureFilter);
            if (section.selected) {
                $scope.vm.manufactureFilter = { id: -1, title: "Some", items: manufactureFilter.items || [] };
                $scope.vm.manufactureFilter.items.push(section);
            }
            else {
                var items = manufactureFilter.items.filter(function (val) { if (val.id != section.id) { return val; } });
                if (items.length == 0) {
                    $scope.vm.manufactureFilter = { id: 0, title: 'All', items: [] };
                }
                else {
                    $scope.vm.manufactureFilter = {
                        id: -1, title: "Some", items: items
                    };
                }
            }
        }

        $scope.updateReportedFilter = function (section) {
            var reportedFilter = angular.copy($scope.vm.reportedFilter);
            if (section.selected) {
                $scope.vm.reportedFilter = { id: -1, title: "Some", items: reportedFilter.items || [] };
                $scope.vm.reportedFilter.items.push(section);
            }
            else {
                var items = reportedFilter.items.filter(function (val) { if (val.id != section.id) { return val; } });
                if (items.length == 0) {
                    $scope.vm.reportedFilter = { id: 0, title: 'All', items: [] };
                }
                else {
                    $scope.vm.reportedFilter = {
                        id: -1, title: "Some", items: itmes
                    };
                }
            }
        }

        //$scope.updateSectionFilter = function (section) {
        //    var sectionFilter = angular.copy($scope.vm.sectionFilter);
        //    if (section.selected) {
        //        $scope.vm.sectionFilter = { id: -1, title: "Some", items: sectionFilter.items || [] };
        //        $scope.vm.sectionFilter.items.push(section);
        //    }
        //    else {
        //        $scope.vm.sectionFilter = {
        //            id: -1, title: "Some", items: sectionFilter.items.filter(function (val) { if (val.id != section.id) { return val; } })
        //        };
        //    }
        //}

        //$scope.updateUserFilter = function (section) {
        //    var userFilter = angular.copy($scope.vm.userFilter);
        //    if (section.selected) {
        //        $scope.vm.userFilter = { id: -1, title: "Some", items: userFilter.items || [] };
        //        $scope.vm.userFilter.items.push(section);
        //    }
        //    else {
        //        $scope.vm.userFilter = {
        //            id: -1, title: "Some", items: userFilter.items.filter(function (val) { if (val.id != section.id) { return val; } })
        //        };
        //    }
        //}

        //$scope.updateStationFilter = function (section) {
        //    var stationFilter = angular.copy($scope.vm.stationFilter);
        //    if (section.selected) {
        //        $scope.vm.stationFilter = { id: -1, title: "Some", items: stationFilter.items || [] };
        //        $scope.vm.stationFilter.items.push(section);
        //    }
        //    else {
        //        $scope.vm.stationFilter = {
        //            id: -1, title: "Some", items: stationFilter.items.filter(function (val) { if (val.id != section.id) { return val; } })
        //        };
        //    }
        //}

        //$scope.updateGearFaultFilter = function (section) {
        //    var gearFaultFilter = angular.copy($scope.vm.gearFaultFilter);
        //    if (section.selected) {
        //        $scope.vm.gearFaultFilter = { id: -1, title: "Some", items: gearFaultFilter.items || [] };
        //        $scope.vm.gearFaultFilter.items.push(section);
        //    }
        //    else {
        //        $scope.vm.gearFaultFilter = {
        //            id: -1, title: "Some", items: gearFaultFilter.items.filter(function (val) { if (val.id != section.id) { return val; } })
        //        };
        //    }
        //}

        //$scope.updateSubGearFaultFilter = function (section) {
        //    var subGearFaultFilter = angular.copy($scope.vm.subGearFaultFilter);
        //    if (section.selected) {
        //        $scope.vm.subGearFaultFilter = { id: -1, title: "Some", items: subGearFaultFilter.items || [] };
        //        $scope.vm.subGearFaultFilter.items.push(section);
        //    }
        //    else {
        //        $scope.vm.subGearFaultFilter = {
        //            id: -1, title: "Some", items: subGearFaultFilter.items.filter(function (val) { if (val.id != section.id) { return val; } })
        //        };
        //    }
        //}


        //$scope.updateManufactureFilter = function (section) {
        //    var manufactureFilter = angular.copy($scope.vm.manufactureFilter);
        //    if (section.selected) {
        //        $scope.vm.manufactureFilter = { id: -1, title: "Some", items: manufactureFilter.items || [] };
        //        $scope.vm.manufactureFilter.items.push(section);
        //    }
        //    else {
        //        $scope.vm.manufactureFilter = {
        //            id: -1, title: "Some", items: manufactureFilter.items.filter(function (val) { if (val.id != section.id) { return val; } })
        //        };
        //    }
        //}


        //$scope.updateReportedFilter = function (section) {
        //    var reportedFilter = angular.copy($scope.vm.reportedFilter);
        //    if (section.selected) {
        //        $scope.vm.reportedFilter = { id: -1, title: "Some", items: reportedFilter.items || [] };
        //        $scope.vm.reportedFilter.items.push(section);
        //    }
        //    else {
        //        $scope.vm.reportedFilter = {
        //            id: -1, title: "Some", items: reportedFilter.items.filter(function (val) { if (val.id != section.id) { return val; } })
        //        };
        //    }
        //}

        $scope.downloadFailureFile = function () {
            if ($scope.vm.fromDate && $scope.vm.toDate && new Date($scope.vm.fromDate).getTime() <= new Date($scope.vm.toDate).getTime()) {
                var timeOfOccurenceOrder = 0;
                var totalTimeOrder = 0;
                if ($scope.vm.sortType == "timeOfOccurance") {
                    timeOfOccurenceOrder = $scope.vm.sortReverse ? 2 : 1;
                }
                else if ($scope.vm.sortType == "duration") {
                    totalTimeOrder = $scope.vm.sortReverse ? 2 : 1;
                }

                var reportModel = $scope.getFilterModel();

                //var reportModel = {
                //    name: 'comparestats',
                //    format: 'Excel',
                //    fromDate: $scope.vm.fromDate.dateOnlyString(),
                //    toDate: $scope.vm.toDate.dateOnlyString(),
                //    sectionFilter: $scope.vm.sectionFilter.id,
                //    stationFilter: $scope.vm.stationFilter.id,
                //    userFilter: $scope.vm.userFilter.id,
                //    reportedFilter: $scope.vm.reportedFilter.id,
                //    gearAtFaultFilter: $scope.vm.gearFaultFilter.id,
                //    timeOfOccurenceOrder: timeOfOccurenceOrder,
                //    totalTimeOrder: totalTimeOrder
                //};

                $http({
                    method: 'post',
                    url: 'api/report/failure/Export',
                    responseType: 'arraybuffer',
                    data: reportModel,
                }).then(function (data, status, headers) {
                    headers = data.headers();

                    var filename = headers['content-disposition'].split(';')[1].split('=')[1];
                    var contentType = headers['content-type'];

                    var linkElement = document.createElement('a');
                    var blob = new Blob([data.data], { type: contentType });
                    var url = window.URL.createObjectURL(blob);

                    linkElement.setAttribute('href', url);
                    linkElement.setAttribute("download", filename);

                    var clickEvent = new MouseEvent("click", {
                        "view": window,
                        "bubbles": true,
                        "cancelable": false
                    });
                    linkElement.dispatchEvent(clickEvent);
                }, function (data) {
                    console.log(data);
                });

                //ReportService.getExportFailures(reportModel).then(function(data) {

                //}, function (error) {
                //    NotificationService.information('An error was encountered while exporting. Please try again.');
                //});

                //window.location.href = '/api/report/failure/Export?name=comparestats&format=excel&FromDate=' + $scope.vm.fromDate.dateOnlyString() + '&toDate=' + $scope.vm.toDate.dateOnlyString() +
                //    '&SearchKey=' + '' + '&SectionFilter=' + $scope.vm.sectionFilter.id + '&StationFilter=' + $scope.vm.stationFilter.id + '&UserFilter=' + $scope.vm.userFilter.id + '&ReportedFilter=' + $scope.vm.reportedFilter.id + '&GearAtFaultFilter=' + $scope.vm.gearFaultFilter.id +
                //    '&timeOfOccurenceOrder=' + timeOfOccurenceOrder + '&totalTimeOrder=' + totalTimeOrder;
            }
            else {
                NotificationService.error("Select Valid Date.");
            }
        }

        var filterData = function () {
            //var result = angular.copy($scope.vm.rawData);
            //if ($scope.vm.stationFilter.id != 0)
            //{
            //    result = result.filter(function (item) { return item.stationId == $scope.vm.stationFilter.id; });
            //}
            //else if ($scope.vm.stations.length != $scope.vm.currentStations.length)
            //{
            //    var stationsMap = $scope.vm.currentStations.reduce(function (o, v, i) { o[v.id] = v; return o; }, {});
            //    result = result.filter(function (item) { return stationsMap[item.stationId] != null; });
            //}

            //if ($scope.vm.gearFaultFilter.id != 0) {
            //    result = result.filter(function (item) { return item.gearFaultId == $scope.vm.gearFaultFilter.id; });
            //}

            //if ($scope.vm.reportedFilter.id != 0) {
            //    result = result.filter(function (item) { return item.reportedId == $scope.vm.reportedFilter.id; });
            //}

            //$scope.vm.failures = angular.copy(result);
        };

        var init = function () {
            $scope.SortValue = 'None';
            $scope.SortByPredicate = 'none';
            $scope.searchText = '';
            $scope.getFailureMangeInfo();
            //$scope.getAll();
            var header = $scope.vm.tableHeaders.find(function (item) { return item.name == 'timeOfOccurance'; });
            $scope.vm.sortTableData(header);
        };

        init();

    }]);



appRoot.controller('failureCauseReportController', [
    '$scope', '$state', '$stateParams', '$location', '$filter', 'ReportService', 'UserService', 'NotificationService', 'SharedModel', '$uibModal', '$http',
    function ($scope, $state, $stateParams, $location, $filter, ReportService, UserService, NotificationService, SharedModel, $uibModal, $http) {
        console.log('Instantiated reports');
        $scope.vm = {};

        $scope.vm.scrollSettings = {
            background: 'rgb(206,208,211)',
            cursorwidth: '10px',
            autohidemode: 'leave'
        };

        $scope.vm.userFilter = { id: 0, title: 'All', items: [] };
        $scope.vm.sectionFilter = { id: 0, title: 'All', items: [] };
        $scope.vm.stationTypeFilter = { id: -1, title: 'All', items: [] };

        $scope.vm.stationFilter = { id: 0, title: 'All', items: [] };
        $scope.vm.reportedFilter = { id: 0, title: 'All', items: [] };
        $scope.vm.gearFaultFilter = { id: 0, title: 'All', items: [] };
        $scope.vm.subGearFaultFilter = { id: 0, title: 'All', items: [] };
        $scope.vm.manufactureFilter = { id: 0, title: 'All', items: [] };
        $scope.vm.causeFilter = { id: 0, title: 'All', items: [] };
        $scope.vm.subCauseFilter = { id: 0, title: 'All', items: [] };

        $scope.vm.tableHeaders = [
            { name: 'sfrNo', title: 'SFRNo', sortReverse: false },
            { name: 'timeOfOccurance', title: 'Time Of Occurance', sortReverse: false },
            { name: 'reported', title: 'Reported', sortReverse: false },
            { name: 'station', title: 'Station', sortReverse: false },
            { name: 'gearFault', title: 'Gear at Fault', sortReverse: false },
            { name: 'subGearFault', title: 'Sub Gear at Fault', sortReverse: false },
            { name: 'causeOfFailureValue', title: 'Cause', sortReverse: false },
            { name: 'subCauseOfFailureValue', title: 'Sub Cause', sortReverse: false },
            //{ name: 'timeSignalMainReached', title: 'Time Signal Main Reached', sortReverse: false },
            { name: 'timeRectified', title: 'Time Rectified', sortReverse: false },
            { name: 'duration', title: 'Duration', sortReverse: false },
            { name: 'updatedByName', title: 'Updated By', sortReverse: false },
        ];

        $scope.vm.sortTableData = function (header) {
            $scope.vm.currentSortingElement = header;
            $scope.vm.sortType = header.name;
            header.sortReverse = !header.sortReverse;
            $scope.vm.sortReverse = header.sortReverse;
        };

        $scope.getExportDataSource = function () {
            var dataSource = [];
            var resultData = $filter("filter")($scope.vm.failures, $scope.searchText);
            for (var i = 0; i < resultData.length; i += 1) {
                var x = resultData[i];
                try {
                    var item = {
                        SFRNo: x.sfrNo,
                        Reported: x.reported,
                        Station: x.station,
                        gearatFault: x.gearFault,
                        BreifDescription: x.description,
                        causeOfFailure: x.causeOfFailure,
                        trainLossPunctuality: x.trainLossPunctual,
                        trainDetained: x.trainDetained,
                        failureChargeable: x.failureChargeable ? "Yes" : "No",
                        department: x.department,
                        timeOfOccurance: x.stimeOfOccurance,
                        timeSignalMainInformed: x.stimeSignalMainInformed,
                        timeSignalMainReached: x.stimeSignalMainReached,
                        timeRectified: x.stimeRectified,
                        duration: x.duration,
                        updatedByName: x.updatedByName
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
            return ['SFRNo', 'Reported', 'Station', 'Gear at Fault', 'Breif Description', 'Cause of Failure', 'Train Loss Punctuality', 'Train Detained', 'Failure Chargeable', 'Department', 'Time of Occurance', 'Time Signal Main Informed', 'Time Signal Main Reached', 'Time Rectified', 'Duration', 'Updated By'];
        }

        $scope.getFailureMangeInfo = function () {
            ReportService.getFailureCauseMangeInfo().then(function (data) {
                $scope.vm.sections = data.sections;
                $scope.vm.stationTypes = [{ name: 'Station', id: 0 }, { name: 'IB', id: 1 }, { name: 'LC Gate', id: 2 }];
                $scope.vm.stations = data.stations;
                $scope.vm.gearFaults = data.gearFaults;
                $scope.vm.reporteds = data.reporteds;
                $scope.vm.users = data.users;
                $scope.vm.currentUsers = data.users;
                $scope.vm.currentStations = data.stations;
                $scope.vm.manufactures = data.manufactures;
                $scope.vm.currentManufactures = data.manufactures;
                $scope.vm.subGearFaults = data.subGearFaults;
                $scope.vm.currentSubGearFaults = data.subGearFaults;
                $scope.vm.causeOfFailures = data.causeOfFailures;
                $scope.vm.subCauseOfFailure = data.subCauseOfFailure;
                $scope.vm.currentSubCauseOfFailure = data.subCauseOfFailure;

                var date = new Date();

                if ($stateParams.monthView != undefined) {
                    var montView = $stateParams.monthView;
                    if (montView == 0) {
                        $scope.vm.fromDate = new Date(new Date().setHours(23, 59, 59, 999));
                        $scope.vm.toDate = new Date(new Date().setHours(23, 59, 59, 999));
                    }
                    else if (montView == 1) {
                        $scope.vm.fromDate = new Date(new Date(date.getFullYear(), date.getMonth(), 1).setHours(23, 59, 59, 999));
                        $scope.vm.toDate = new Date(new Date().setHours(23, 59, 59, 999));
                    }
                    else {
                        $scope.vm.toDate = new Date(new Date(date.getFullYear(), date.getMonth(), 0).setHours(23, 59, 59, 999));
                        $scope.vm.fromDate = new Date(new Date($scope.vm.toDate.getFullYear(), $scope.vm.toDate.getMonth(), 1).setHours(23, 59, 59, 999));

                    }
                }
                else {
                    $scope.vm.fromDate = new Date(date.setDate(date.getDate() - 3));
                    $scope.vm.toDate = new Date(new Date().setHours(23, 59, 59, 999));
                }

                if ($stateParams.section > 0) {
                    var section = $scope.vm.sections.find(function (item) { return item.id == $stateParams.section });
                    if (section != null) {
                        section.selected = true;
                        $scope.updateSectionFilter(section);
                    }
                }

                if ($stateParams.reported > 0) {
                    var reported = $scope.vm.reporteds.find(function (item) { return item.id == $stateParams.reported });
                    if (reported != null) {
                        reported.selected = true;
                        $scope.updateReportedFilter(reported);
                    }
                }


                $scope.get()

            });
        }

        $scope.getAll = function () {
            var date = new Date();
            $scope.vm.fromDate = new Date(date.setDate(date.getDate() - 3));
            $scope.vm.toDate = new Date(new Date().setHours(23, 59, 59, 999));
            $scope.get()
        };

        $scope.showFailureDetails = function (failure) {
            $scope.vm.currentFailure = failure;
            $scope.failureModelInstance = $uibModal.open({
                templateUrl: 'failure-detail',
                scope: $scope
            });
        }

        $scope.getSavedTime = function (dateTime) {
            if (!dateTime) {
                return null;
            }
            return $filter("stringToDate")(dateTime, "dd-MMM-yyyy HH:mm");
        };

        $scope.get = function () {
            if ($scope.vm.fromDate && $scope.vm.toDate && new Date($scope.vm.fromDate).getTime() <= new Date($scope.vm.toDate).getTime()) {
                var filterModel = $scope.getFilterModel();
                ReportService.getFilterCauseFailures(filterModel).then(function (pointers) {
                    //ReportService.getFailures($scope.vm.fromDate, $scope.vm.toDate).then(function (pointers) {
                    $scope.vm.failures = pointers;
                    $scope.vm.failures.forEach(function (item) {
                        item.stimeOfOccurance = $scope.getSavedTime(item.timeOfOccurance);
                        item.stimeSignalMainInformed = $scope.getSavedTime(item.timeSignalMainInformed);
                        item.stimeSignalMainReached = $scope.getSavedTime(item.timeSignalMainReached);
                        item.stimeRectified = $scope.getSavedTime(item.timeRectified);
                        item.duration = item.totalDuration && item.totalDuration > 0 ? $filter('decimalToHHMM')(item.totalDuration) : "";
                    });

                    $scope.vm.rawData = angular.copy($scope.vm.failures);
                    filterData();
                });
            } else {
                NotificationService.error("Select Valid Dates.");
            }
        }

        $scope.getFilterModel = function () {
            var timeOfOccurenceOrder = 0;
            var totalTimeOrder = 0;
            if ($scope.vm.sortType == "timeOfOccurance") {
                timeOfOccurenceOrder = $scope.vm.sortReverse ? 2 : 1;
            }
            else if ($scope.vm.sortType == "duration") {
                totalTimeOrder = $scope.vm.sortReverse ? 2 : 1;
            }

            var model = {
                fromDate: $scope.vm.fromDate.dateOnlyString(),
                format: 'Excel',
                toDate: $scope.vm.toDate.dateOnlyString(),
                sectionFilter: $scope.vm.sectionFilter.id,
                stationFilter: $scope.vm.stationFilter.id,
                stationTypeFilter: $scope.vm.stationTypeFilter.id,
                userFilter: $scope.vm.userFilter.id,
                reportedFilter: $scope.vm.reportedFilter.id,
                gearAtFaultFilter: $scope.vm.gearFaultFilter.id,
                subGearAtFaultFilter: $scope.vm.subGearFaultFilter.id,
                manufactureFilter: $scope.vm.manufactureFilter.id,
                causeFilter: $scope.vm.causeFilter.id,
                subCauseFilter: $scope.vm.subCauseFilter.id,
                timeOfOccurenceOrder: timeOfOccurenceOrder,
                totalTimeOrder: totalTimeOrder
            };

            model.sections = $scope.vm.sectionFilter.items.map(function (value) { return value.id; }) || [];
            model.stationTypes = $scope.vm.stationTypeFilter.items.map(function (value) { return value.id; }) || [];
            model.stations = $scope.vm.stationFilter.items.map(function (value) { return value.id; }) || [];
            model.reporteds = $scope.vm.reportedFilter.items.map(function (value) { return value.id; }) || [];
            model.users = $scope.vm.userFilter.items.map(function (value) { return value.id; }) || [];
            model.gears = $scope.vm.gearFaultFilter.items.map(function (value) { return value.id; }) || [];
            model.subGears = $scope.vm.subGearFaultFilter.items.map(function (value) { return value.id; }) || [];
            model.manufatures = $scope.vm.manufactureFilter.items.map(function (value) { return value.id; }) || [];
            model.causes = $scope.vm.causeFilter.items.map(function (value) { return value.id; }) || [];
            model.subCauses = $scope.vm.subCauseFilter.items.map(function (value) { return value.id; }) || [];

            return model;
        };

        $scope.$watch('vm.sectionFilter', function (newVal, oldVal) {
            if (newVal && oldVal != newVal) {
                $scope.vm.userFilter = { id: 0, title: 'All', items: [] };
                $scope.vm.stationFilter = { id: 0, title: 'All', items: [] };
                $scope.vm.stationTypeFilter = { id: -1, title: 'All', items: [] };

                if ($scope.vm.sectionFilter.id != 0) {
                    var sectionsMap = $scope.vm.sectionFilter.items.reduce(function (o, v, i) { o[v.id] = v; return o; }, {});
                    $scope.vm.currentStations = $scope.vm.stations.filter(function (item) {
                        return sectionsMap[item.sectionId] != null;
                    });

                    $scope.vm.currentUsers = $scope.vm.users.filter(function (item) {
                        return $scope.vm.currentStations.find(function (station) { return (station.asteId == item.id || station.cseId == item.id || station.jeId == item.id || station.esmId == item.id); }) != null;
                    });
                }
                else {
                    $scope.vm.currentUsers = angular.copy($scope.vm.users);
                    $scope.vm.currentStations = angular.copy($scope.vm.stations);
                    $scope.removeSelection($scope.vm.sections);
                }

                $scope.removeSelection($scope.vm.stationTypes);
                $scope.removeSelection($scope.vm.currentUsers);
                $scope.removeSelection($scope.vm.currentStations);
                filterData();
            }
        });

        $scope.removeSelection = function (itemsArray) {
            itemsArray.forEach(function (item) {
                if (item.selected) {
                    item.selected = false;
                }
            });
        }

       $scope.$watch('vm.userFilter', function (newVal, oldVal) {
            if (newVal && oldVal != newVal) {
                $scope.vm.stationFilter = { id: 0, title: 'All', items: [] };

                if ($scope.vm.sectionFilter.id != 0) {
                    var sectionsMap = $scope.vm.sectionFilter.items.reduce(function (o, v, i) { o[v.id] = v; return o; }, {});
                    $scope.vm.currentStations = $scope.vm.stations.filter(function (item) {
                        return sectionsMap[item.sectionId] != null;
                    });
                }
                else {
                    $scope.vm.currentStations = angular.copy($scope.vm.stations);
                }

                if ($scope.vm.stationTypeFilter.id != -1) {
                    var typesMap = $scope.vm.stationTypeFilter.items.reduce(function (o, v, i) { o[v.id] = v; return o; }, {});
                    $scope.vm.currentStations = $scope.vm.currentStations.filter(function (item) {
                        return typesMap[item.stationType] != null;
                    });
                }

                if ($scope.vm.userFilter.id != 0) {
                    var usersMap = $scope.vm.userFilter.items.reduce(function (o, v, i) { o[v.id] = v; return o; }, {});
                    $scope.vm.currentStations = $scope.vm.currentStations.filter(function (station) {
                        if (usersMap[station.asteId] != null || usersMap[station.cseId] != null || usersMap[station.jeId] != null || usersMap[station.esmId] != null) {
                            return true;
                        }
                    });
                }
                else {
                    $scope.removeSelection($scope.vm.currentUsers);
                }

                $scope.removeSelection($scope.vm.currentStations);

                filterData();
            }
        });

        $scope.$watch('vm.stationTypeFilter', function (newVal, oldVal) {
            if (newVal && oldVal != newVal) {
                $scope.vm.userFilter = { id: 0, title: 'All', items: [] };
                $scope.vm.stationFilter = { id: 0, title: 'All', items: [] };

                if ($scope.vm.stationTypeFilter.id != -1) {
                    var sectionsMap = $scope.vm.stationTypeFilter.items.reduce(function (o, v, i) { o[v.id] = v; return o; }, {});
                    $scope.vm.currentStations = $scope.vm.stations.filter(function (item) {
                        return sectionsMap[item.stationType] != null;
                    });

                    $scope.vm.currentUsers = $scope.vm.users.filter(function (item) {
                        return $scope.vm.currentStations.find(function (station) { return (station.asteId == item.id || station.cseId == item.id || station.jeId == item.id || station.esmId == item.id); }) != null;
                    });
                }
                else {
                    $scope.vm.currentUsers = angular.copy($scope.vm.users);
                    $scope.vm.currentStations = angular.copy($scope.vm.stations);
                    $scope.removeSelection($scope.vm.stationTypeFilter);
                }

                $scope.removeSelection($scope.vm.currentUsers);
                $scope.removeSelection($scope.vm.currentStations);
                filterData();
            }
        });

        $scope.updateStationTypeFilter = function (section) {
            var sectionFilter = angular.copy($scope.vm.stationTypeFilter);
            if (section.selected) {
                $scope.vm.stationTypeFilter = { id: -2, title: "Some", items: sectionFilter.items || [] };
                $scope.vm.stationTypeFilter.items.push(section);
            }
            else {
                var sectionItems = sectionFilter.items.filter(function (val) { if (val.id != section.id) { return val; } });
                if (sectionItems.length == 0) {
                    $scope.vm.stationTypeFilter = { id: -1, title: 'All', items: [] };
                }
                else {
                    $scope.vm.stationTypeFilter = {
                        id: -2, title: "Some", items: sectionItems
                    };
                }
            }
        }

        $scope.$watch('vm.stationFilter', function (newVal, oldVal) {
            if (newVal && oldVal != newVal) {
                if (newVal.id == 0) {
                    $scope.removeSelection($scope.vm.currentStations);
                }

                filterData();
            }
        });

        $scope.$watch('vm.reportedFilter', function (newVal, oldVal) {
            if (newVal && oldVal != newVal) {
                if (newVal.id == 0) {
                    $scope.removeSelection($scope.vm.reporteds);
                }
                filterData();
            }
        });

        $scope.$watch('vm.gearFaultFilter', function (newVal, oldVal) {
            if (newVal && oldVal != newVal) {
                $scope.vm.subGearFaultFilter = { id: 0, title: 'All', items: [] };
                //$scope.vm.manufactureFilter = { id: 0, title: 'All', items: [] };

                if ($scope.vm.gearFaultFilter.id != 0) {
                    var gearsMap = $scope.vm.gearFaultFilter.items.reduce(function (o, v, i) { o[v.id] = v; return o; }, {});
                    $scope.vm.currentSubGearFaults = $scope.vm.subGearFaults.filter(function (item) {
                        return gearsMap[item.gearFaultId] != null;
                    });

                    //$scope.vm.currentManufactures = $scope.vm.manufactures.filter(function (item) {
                    //    return gearsMap[item.gearFaultId] != null;
                    //});
                }
                else {
                    $scope.vm.currentSubGearFaults = angular.copy($scope.vm.subGearFaults)
                    //$scope.vm.currentManufactures = angular.copy($scope.vm.manufactures)
                    $scope.removeSelection($scope.vm.gearFaults);
                }

                filterData();
            }
        });

        $scope.$watch('vm.subGearFaultFilter', function (newVal, oldVal) {
            if (newVal && oldVal != newVal) {
                if (newVal.id == 0) {
                    $scope.removeSelection($scope.vm.currentSubGearFaults);
                }
                filterData();
            }
        });

        $scope.$watch('vm.manufactureFilter', function (newVal, oldVal) {
            if (newVal && oldVal != newVal) {
                if (newVal.id == 0) {
                    $scope.removeSelection($scope.vm.currentManufactures);
                }
                filterData();
            }
        });


        $scope.$watch('vm.causeFilter', function (newVal, oldVal) {
            if (newVal && oldVal != newVal) {
                $scope.vm.subCauseFilter = { id: 0, title: 'All', items: [] };
                if ($scope.vm.causeFilter.id != 0) {
                    var gearsMap = $scope.vm.causeFilter.items.reduce(function (o, v, i) { o[v.id] = v; return o; }, {});
                    $scope.vm.currentSubCauseOfFailure = $scope.vm.subCauseOfFailure.filter(function (item) {
                        return gearsMap[item.causeOfFailureId] != null;
                    });

                }
                else {
                    $scope.vm.currentSubCauseOfFailure = angular.copy($scope.vm.subCauseOfFailure);
                    $scope.removeSelection($scope.vm.causeOfFailure);

                }

                filterData();
            }
        });

        $scope.$watch('vm.subCauseFilter', function (newVal, oldVal) {
            if (newVal && oldVal != newVal) {
                if ($scope.vm.subCauseFilter.id == 0) {
                    $scope.removeSelection($scope.vm.subCauseOfFailure);
                }
                filterData();
            }
        });

        $scope.updateSectionFilter = function (section) {
            var sectionFilter = angular.copy($scope.vm.sectionFilter);
            if (section.selected) {
                $scope.vm.sectionFilter = { id: -1, title: "Some", items: sectionFilter.items || [] };
                $scope.vm.sectionFilter.items.push(section);
            }
            else {
                var sectionItems = sectionFilter.items.filter(function (val) { if (val.id != section.id) { return val; } });
                if (sectionItems.length == 0) {
                    $scope.vm.sectionFilter = { id: 0, title: 'All', items: [] };
                }
                else {
                    $scope.vm.sectionFilter = {
                        id: -1, title: "Some", items: sectionItems
                    };
                }
            }
        }

        $scope.updateUserFilter = function (section) {
            var userFilter = angular.copy($scope.vm.userFilter);
            if (section.selected) {
                $scope.vm.userFilter = { id: -1, title: "Some", items: userFilter.items || [] };
                $scope.vm.userFilter.items.push(section);
            }
            else {
                var userItems = userFilter.items.filter(function (val) { if (val.id != section.id) { return val; } });
                if (userItems.length == 0) {
                    $scope.vm.userFilter = { id: 0, title: 'All', items: [] };
                }
                else {
                    $scope.vm.userFilter = {
                        id: -1, title: "Some", items: userItems
                    };
                }
            }
        }

        $scope.updateStationFilter = function (section) {
            var stationFilter = angular.copy($scope.vm.stationFilter);
            if (section.selected) {
                $scope.vm.stationFilter = { id: -1, title: "Some", items: stationFilter.items || [] };
                $scope.vm.stationFilter.items.push(section);
            }
            else {
                var stationItems = stationFilter.items.filter(function (val) { if (val.id != section.id) { return val; } });
                if (stationItems.length == 0) {
                    $scope.vm.stationFilter = { id: 0, title: 'All', items: [] };
                }
                else {
                    $scope.vm.stationFilter = {
                        id: -1, title: "Some", items: stationItems
                    };
                }

            }
        }

        $scope.updateGearFaultFilter = function (section) {
            var gearFaultFilter = angular.copy($scope.vm.gearFaultFilter);
            if (section.selected) {
                $scope.vm.gearFaultFilter = { id: -1, title: "Some", items: gearFaultFilter.items || [] };
                $scope.vm.gearFaultFilter.items.push(section);
            }
            else {
                var gearItmes = gearFaultFilter.items.filter(function (val) { if (val.id != section.id) { return val; } });
                if (gearItmes.length == 0) {
                    $scope.vm.gearFaultFilter = { id: 0, title: 'All', items: [] };
                }
                else {
                    $scope.vm.gearFaultFilter = {
                        id: -1, title: "Some", items: gearItmes
                    };
                }
            }
        }

        $scope.updateSubGearFaultFilter = function (section) {
            var subGearFaultFilter = angular.copy($scope.vm.subGearFaultFilter);
            if (section.selected) {
                $scope.vm.subGearFaultFilter = { id: -1, title: "Some", items: subGearFaultFilter.items || [] };
                $scope.vm.subGearFaultFilter.items.push(section);
            }
            else {
                var items = subGearFaultFilter.items.filter(function (val) { if (val.id != section.id) { return val; } });
                if (items.length == 0) {
                    $scope.vm.subGearFaultFilter = { id: 0, title: 'All', items: [] };
                }
                else {
                    $scope.vm.subGearFaultFilter = {
                        id: -1, title: "Some", items: items
                    };
                }
            }
        }


        $scope.updateManufactureFilter = function (section) {
            var manufactureFilter = angular.copy($scope.vm.manufactureFilter);
            if (section.selected) {
                $scope.vm.manufactureFilter = { id: -1, title: "Some", items: manufactureFilter.items || [] };
                $scope.vm.manufactureFilter.items.push(section);
            }
            else {
                var items = manufactureFilter.items.filter(function (val) { if (val.id != section.id) { return val; } });
                if (items.length == 0) {
                    $scope.vm.manufactureFilter = { id: 0, title: 'All', items: [] };
                }
                else {
                    $scope.vm.manufactureFilter = {
                        id: -1, title: "Some", items: items
                    };
                }
            }
        }

        $scope.updateSubCauseFilter = function (section) {
            var subCauseFilter = angular.copy($scope.vm.subCauseFilter);
            if (section.selected) {
                $scope.vm.subCauseFilter = { id: -1, title: "Some", items: subCauseFilter.items || [] };
                $scope.vm.subCauseFilter.items.push(section);
            }
            else {
                var items = subCauseFilter.items.filter(function (val) { if (val.id != section.id) { return val; } });
                if (items.length == 0) {
                    $scope.vm.subCauseFilter = { id: 0, title: 'All', items: [] };
                }
                else {
                    $scope.vm.subCauseFilter = {
                        id: -1, title: "Some", items: items
                    };
                }
            }
        }

        $scope.updateCauseFilter = function (section) {
            var causeFilter = angular.copy($scope.vm.causeFilter);
            if (section.selected) {
                $scope.vm.causeFilter = { id: -1, title: "Some", items: causeFilter.items || [] };
                $scope.vm.causeFilter.items.push(section);
            }
            else {
                var items = causeFilter.items.filter(function (val) { if (val.id != section.id) { return val; } });
                if (items.length == 0) {
                    $scope.vm.causeFilter = { id: 0, title: 'All', items: [] };
                }
                else {
                    $scope.vm.causeFilter = {
                        id: -1, title: "Some", items: items
                    };
                }
            }
        }


        $scope.updateReportedFilter = function (section) {
            var reportedFilter = angular.copy($scope.vm.reportedFilter);
            if (section.selected) {
                $scope.vm.reportedFilter = { id: -1, title: "Some", items: reportedFilter.items || [] };
                $scope.vm.reportedFilter.items.push(section);
            }
            else {
                var items = reportedFilter.items.filter(function (val) { if (val.id != section.id) { return val; } });
                if (items.length == 0) {
                    $scope.vm.reportedFilter = { id: 0, title: 'All', items: [] };
                }
                else {
                    $scope.vm.reportedFilter = {
                        id: -1, title: "Some", items: itmes
                    };
                }
            }
        }

        $scope.downloadFailureFile = function () {
            if ($scope.vm.fromDate && $scope.vm.toDate && new Date($scope.vm.fromDate).getTime() <= new Date($scope.vm.toDate).getTime()) {
                var timeOfOccurenceOrder = 0;
                var totalTimeOrder = 0;
                if ($scope.vm.sortType == "timeOfOccurance") {
                    timeOfOccurenceOrder = $scope.vm.sortReverse ? 2 : 1;
                }
                else if ($scope.vm.sortType == "duration") {
                    totalTimeOrder = $scope.vm.sortReverse ? 2 : 1;
                }

                var reportModel = $scope.getFilterModel();

                //var reportModel = {
                //    name: 'comparestats',
                //    format: 'Excel',
                //    fromDate: $scope.vm.fromDate.dateOnlyString(),
                //    toDate: $scope.vm.toDate.dateOnlyString(),
                //    sectionFilter: $scope.vm.sectionFilter.id,
                //    stationFilter: $scope.vm.stationFilter.id,
                //    userFilter: $scope.vm.userFilter.id,
                //    reportedFilter: $scope.vm.reportedFilter.id,
                //    gearAtFaultFilter: $scope.vm.gearFaultFilter.id,
                //    timeOfOccurenceOrder: timeOfOccurenceOrder,
                //    totalTimeOrder: totalTimeOrder
                //};

                $http({
                    method: 'post',
                    url: 'api/report/failurecause/Export',
                    responseType: 'arraybuffer',
                    data: reportModel,
                }).then(function (data, status, headers) {
                    headers = data.headers();

                    var filename = headers['content-disposition'].split(';')[1].split('=')[1];
                    var contentType = headers['content-type'];

                    var linkElement = document.createElement('a');
                    var blob = new Blob([data.data], { type: contentType });
                    var url = window.URL.createObjectURL(blob);

                    linkElement.setAttribute('href', url);
                    linkElement.setAttribute("download", filename);

                    var clickEvent = new MouseEvent("click", {
                        "view": window,
                        "bubbles": true,
                        "cancelable": false
                    });
                    linkElement.dispatchEvent(clickEvent);
                }, function (data) {
                    console.log(data);
                });

                //ReportService.getExportFailures(reportModel).then(function(data) {

                //}, function (error) {
                //    NotificationService.information('An error was encountered while exporting. Please try again.');
                //});

                //window.location.href = '/api/report/failure/Export?name=comparestats&format=excel&FromDate=' + $scope.vm.fromDate.dateOnlyString() + '&toDate=' + $scope.vm.toDate.dateOnlyString() +
                //    '&SearchKey=' + '' + '&SectionFilter=' + $scope.vm.sectionFilter.id + '&StationFilter=' + $scope.vm.stationFilter.id + '&UserFilter=' + $scope.vm.userFilter.id + '&ReportedFilter=' + $scope.vm.reportedFilter.id + '&GearAtFaultFilter=' + $scope.vm.gearFaultFilter.id +
                //    '&timeOfOccurenceOrder=' + timeOfOccurenceOrder + '&totalTimeOrder=' + totalTimeOrder;
            }
            else {
                NotificationService.error("Select Valid Date.");
            }
        }

        var filterData = function () {

        };

        var init = function () {
            $scope.SortValue = 'None';
            $scope.SortByPredicate = 'none';
            $scope.searchText = '';
            $scope.getFailureMangeInfo();
            //$scope.getAll();
            var header = $scope.vm.tableHeaders.find(function (item) { return item.name == 'timeOfOccurance'; });
            $scope.vm.sortTableData(header);
        };

        init();

    }]);

appRoot.controller('loginReportController', [
    '$scope', '$state', '$stateParams', '$location', '$filter', 'UserService', 'AppSettings', 'NotificationService', 'SharedModel',
    function ($scope, $state, $stateParams, $location, $filter, UserService, AppSettings, NotificationService, SharedModel) {
        $scope.vm = {};
        $scope.vm.fromDate = new Date(new Date().setHours(23, 59, 59, 999));
        $scope.vm.toDate = new Date(new Date().setHours(23, 59, 59, 999));

        $scope.getSavedTime = function (dateTime) {
            if (!dateTime) {
                return null;
            }
            return $filter("date")(dateTime, "dd-MMM-yyyy HH:mm");
        };

        $scope.vm.tableHeaders = [
            { name: 'userName', title: 'User', sortReverse: false },
            { name: 'displayName', title: 'DisplayName', sortReverse: false },
            { name: 'loginStatus', title: 'Action', sortReverse: false },
            { name: 'LoginTime', title: 'Date Time', sortReverse: false }
        ];

        $scope.vm.sortTableData = function (header) {
            $scope.vm.currentSortingElement = header;
            $scope.vm.sortType = header.name;
            header.sortReverse = !header.sortReverse;
            $scope.vm.sortReverse = header.sortReverse;
        };

        $scope.get = function () {
            if ($scope.vm.fromDate && $scope.vm.toDate && new Date($scope.vm.fromDate).getTime() <= new Date($scope.vm.toDate).getTime()) {
                UserService.getLogins($scope.vm.fromDate, $scope.vm.toDate).then(function (pointers) {
                    $scope.vm.logins = pointers;
                    $scope.vm.logins.forEach(function (item) {
                        item.loginStatusName = item.loginStatus == 1 ? "Login" : "LogOut";
                        item.loginDateTimeValue = $scope.getSavedTime(item.loginTime);
                    });
                });
            }
        }       

		$scope.getExportDataSource = function () {
            var dataSource = [];
            var resultData = $filter("filter")($scope.vm.logins, $scope.searchText);
            for (var i = 0; i < resultData.length; i += 1) {
                var x = resultData[i];
                try {
                    var item = {
                        user: x.userName,
                        displayName: x.displayName,
                        Action: x.loginStatusName,
                        dateTime: x.loginDateTimeValue,
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
            return ['User', 'Display Name', 'Action', 'Date Time'];
        }

		
		
        var init = function () {
            $scope.SortValue = 'None';
            $scope.SortByPredicate = 'none';
            $scope.searchText = '';
            $scope.get();
        };

        init();
    }
]);
