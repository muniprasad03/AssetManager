appRoot.controller('failureGearSummaryController', [
    '$scope', '$state', '$stateParams', '$location', '$filter', '$http', 'ReportService', 'UserService', 'NotificationService', 'SharedModel', '$uibModal', 'AppSettings',
    function ($scope, $state, $stateParams, $location, $filter, $http, ReportService, UserService, NotificationService, SharedModel, $uibModal, AppSettings) {
    console.log('Instantiated reports');
    $scope.vm = {};
    $scope.userGridOptions = angular.copy(AppSettings.gridSettings);
    $scope.vm.errorCount = 4;
    $scope.vm.scrollSettings = {
        background: 'rgb(206,208,211)',
        cursorwidth: '10px',
        autohidemode: 'leave'
    };

    $scope.vm.maxHeight = 240 + 37;

    $scope.vm.userFilter = { id: 0, title: 'All', items: [] };
    $scope.vm.sectionFilter = { id: 0, title: 'All', items: [] };
        $scope.vm.stationTypeFilter = { id: -1, title: 'All', items: [] };

    $scope.vm.stationFilter = { id: 0, title: 'All', items: [] };
    $scope.vm.reportedFilter = { id: 0, title: 'All', items: [] };
    $scope.vm.gearFaultFilter = { id: 0, title: 'All', items: [] };
    $scope.vm.subGearFaultFilter = { id: 0, title: 'All', items: [] };
    $scope.vm.manufactureFilter = { id: 0, title: 'All', items: [] };
    
    $scope.getFailureMangeInfo = function () {
        ReportService.getFailureMangeInfo().then(function (data) {
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
            $scope.getAll();
        });
    }

    $scope.getAll = function () {
        var date = new Date();
        $scope.vm.fromDate = new Date(date.setDate(date.getDate() - 30));
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
                $scope.vm.failures = pointers;
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
                    $scope.removeSelection($scope.vm.stationTypes);
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


    $scope.$watch('vm.gearFaultFilter', function (oldVal, newVal) {
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
                $scope.vm.currentManufactures = angular.copy($scope.vm.manufactures)
                $scope.removeSelection($scope.vm.gearFaults);
            }

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


    $scope.downloadStatsFile = function () {
        if ($scope.vm.fromDate && $scope.vm.toDate && new Date($scope.vm.fromDate).getTime() <= new Date($scope.vm.toDate).getTime()) {

            var reportModel = $scope.getFilterModel();

            reportModel.name = 'stationstats';

            $http({
                method: 'post',
                url: 'api/report/StationSummary/Export',
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


            //window.location.href = '/api/report/StationSummary/Export?name=stationstats&format=excel&FromDate=' + $scope.vm.fromDate.dateOnlyString() + '&toDate=' + $scope.vm.toDate.dateOnlyString() +
            //    '&SearchKey=' + '' + '&SectionFilter=' + $scope.vm.sectionFilter.id + '&StationFilter=' + $scope.vm.stationFilter.id + '&UserFilter=' + $scope.vm.userFilter.id + '&ReportedFilter=' + $scope.vm.reportedFilter.id + '&GearAtFaultFilter=' + $scope.vm.gearFaultFilter.id;
        }
        else {
            NotificationService.error("Select Valid Date.");
        }
    }

    var filterData = function () {
        var addedStations = {};
        $scope.vm.gearFaultColumns = {};
        var gridData = [];
        var result = angular.copy($scope.vm.rawData);
        //if ($scope.vm.stationFilter.id != 0)
        //{
        //    result = result.filter(function (item) { return item.stationId == $scope.vm.stationFilter.id; });
        //    var gridRow = {};
        //    gridRow = { no: 1, stationId: $scope.vm.stationFilter.id, stationName: $scope.vm.stationFilter.title, total: 0 };
        //    gridData.push(gridRow);
        //}
        //else if ($scope.vm.stations.length != $scope.vm.currentStations.length)
        //{
        //    var stationsMap = $scope.vm.currentStations.reduce(function (o, v, i) { o[v.id] = v; return o; }, {});
        //    result = result.filter(function (item) { return stationsMap[item.stationId] != null; });
        //    $scope.vm.currentStations.forEach(function (station, index) {
        //        var gridRow = {};
        //        gridRow = { no: index + 1, stationId: station.id, stationName: station.name, total: 0 };
        //        gridData.push(gridRow);
        //    });
        //}
        //else {
        //    $scope.vm.stations.forEach(function (station, index) {
        //        var gridRow = {};
        //        gridRow = { no: index + 1, stationId: station.id, stationName: station.name, total: 0 };
        //        gridData.push(gridRow);
        //    });
        //}

        //if ($scope.vm.gearFaultFilter.id != 0) {
        //    result = result.filter(function (item) { return item.gearFaultId == $scope.vm.gearFaultFilter.id; });
        //}

        //if ($scope.vm.reportedFilter.id != 0) {
        //    result = result.filter(function (item) { return item.reportedId == $scope.vm.reportedFilter.id; });
        //}

        $scope.vm.currentStations.forEach(function (station, index) {
            var gridRow = {};
            gridRow = { no: index + 1, stationId: station.id, stationName: station.name, total: 0 };
            gridData.push(gridRow);
        });
        
        $scope.vm.failures = angular.copy(result);
        $scope.vm.failures.forEach(function (failure) {
            var gridRow = gridData.find(function (item) { return item.stationId == failure.stationId });
            gridRow[failure.gearFaultId + 'fault'] = 1 + (gridRow[failure.gearFaultId + 'fault'] || 0)
            gridRow['total'] = 1 + (gridRow['total'] || 0)
            if (!(failure.gearFaultId in $scope.vm.gearFaultColumns)) {
                $scope.vm.gearFaultColumns[failure.gearFaultId + 'fault'] = failure;
            }
        });

        initalizeGrid(gridData);
    };

    var initalizeGrid = function (gridData) {
        var columnDefs = [
            {
                field: 'no',
                displayName: 'SL No',
                cellClass: 'ui-grid-cell',
                width: 60,
                cellTemplate: '<div class="ui-grid-cell-contents" data-ng-class="{error: row.entity.total >= grid.appScope.vm.errorCount}"><span  title="{{row.entity.no}}">{{row.entity.no}}</span></div>',
                enablePinning: true,
                pinnedLeft: true,
                headerTooltip: true,
                enableGrouping: false
            },
            {
                field: 'stationName',
                displayName: 'Station Name',
                cellTemplate: '<div class="ui-grid-cell-contents"><span><a title="{{grid.getCellValue(row,col)}}" data-ng-class="{error: row.entity.total >= grid.appScope.vm.errorCount}">{{grid.getCellValue(row,col)}}</a></span></div>',
                cellClass: 'ui-grid-cell',
                type: 'number',
                width: 100,
                enablePinning: true,
                pinnedLeft: true,
                headerTooltip: true,
                enableGrouping: false
            },
            {
                field: 'total',
                displayName: 'Total',
                cellClass: 'ui-grid-cell',
                width: 80,
                cellTemplate: '<div class="ui-grid-cell-contents" data-ng-class="{error: row.entity.total >= grid.appScope.vm.errorCount}"><span  title="{{row.entity.total}}">{{row.entity.total}}</span></div>',
                enablePinning: true,
                pinnedLeft: true,
                headerTooltip: true,
                enableGrouping: false
            },
        ];

        columnDefs.AddGearColumn = function (head) {
            this.push({
                name: head.id + 'fault',
                displayName: head.name,
                cellClass: 'ui-grid-cell non-deduction ui-grid-cell-contents',
                width: 80,
                cellTemplate: '<div data-ng-class="{error: row.entity.total >= grid.appScope.vm.errorCount}">{{grid.getCellValue(row, col)}}</div>',
                headerCellClass: 'non-deduction',
                cellTooltip: true,
                headerTooltip: true,
                type: 'number',
                //treeAggregationType: uiGridGroupingConstants.aggregation.SUM,
                //customTreeAggregationFinalizerFn: function (aggregation) { aggregation.rendered = uiGridExtensions.formatAggregation(aggregation); },
                //groupingShowGroupingMenu: false
            });

            $scope.vm.maxHeight += 80;
        };

        if ($scope.vm.gearFaultFilter.id == 0) {
            $scope.vm.gearFaults.forEach(function (h) { columnDefs.AddGearColumn(h) });
        }
        else {
            $scope.vm.gearFaultFilter.forEach(function (h) {
                columnDefs.AddGearColumn(h);
            });
        }

        $scope.userGridOptions.columnDefs = angular.copy(columnDefs);
        //var data = [{ employeeNumber: 1, fullName: 'test' }, { employeeNumber: 2, fullName: 'test' }];
        $scope.gridData = gridData;
        $scope.userGridOptions.data = 'gridData | filter: vm.searchText';
    }

    var init = function () {
        $scope.SortValue = 'None';
        $scope.SortByPredicate = 'none';
        $scope.searchText = '';
        $scope.getFailureMangeInfo();
    };

    init();

}]);