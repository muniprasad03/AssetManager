
appRoot.controller('compareStatsController', [
    '$scope', '$q', '$state', '$stateParams', '$location', '$filter', '$http', '$uibModal', 'ReportService', 'UserService', 'NotificationService', 'SharedModel', 'AppSettings',
    function ($scope, $q, $state, $stateParams, $location, $filter, $http, $uibModal, ReportService, UserService, NotificationService, SharedModel, AppSettings) {
    console.log('Instantiated compare stats');
    var donutChartOptions = angular.copy(AppSettings.donutChartOptions);
    donutChartOptions.height = 250;
    donutChartOptions.donutRatio = 0.40;
    donutChartOptions.growOnHover = false;
    var colorCodes = ['#90CC6D', '#E3D850', '#FFB272', '#FF7C7C', '#C888FD', '#2EB059', '#555555', '#483D8B', '#2F4F4F', '#4F4F2F', '#008B8B'];

    donutChartOptions.height = 260;
    donutChartOptions.donutRatio = 0.40;
    donutChartOptions.growOnHover = false;
    donutChartOptions.showLabels = true;
    donutChartOptions.labelType = "percent";
    
    //donutChartOptions.legendPosition = "right";
    donutChartOptions.tooltipContent = function (key, y, e, graph) {
        console.log(key);
        return '<h4 style="text-align:center;margin:10px 10px;">' + key.data.key + '</h4>'; 
    };

    var getColor = function (index) {
        return colorCodes[index] != null ? colorCodes[index] : "#" + ('000000' + ((1 << 24) * Math.random() | 0).toString(16)).slice(-6);
    }

    $scope.vm = {};

    // Seed data to populate donut pie chart
    // Seed data to populate donut pie chart
    function seedData(s, count) {
        var p = [];
        s.forEach(function (item, index) {
            var employees = (item.value / count) * 100;
            p.push({ key: item.label + ' - ' + item.value, y: employees, color: getColor(index) });
        });

        return p;
    }

    /* main code*/

    $scope.vm = {};

    $scope.vm.experienceDonutChart = { chart: donutChartOptions };

    var getCostStats = function () {
            var lastMonthData = [];
            if ($scope.chargableFailuresCount) {
                lastMonthData.push({
                    "label": "Chargable Failures",
                    "value": $scope.chargableFailuresCount
                });
            }
            if ($scope.nonChargableFailureCount) {
                lastMonthData.push(
                {
                    "label": "Non-Chargable Failures",
                    "value": $scope.nonChargableFailureCount
                });
            }
            $scope.vm.monthExperienceRanges = seedData(lastMonthData, $scope.chargableFailuresCount + $scope.nonChargableFailureCount);
            $scope.vm.experienceRanges = angular.copy($scope.vm.monthExperienceRanges);
    }

    var getDepartmentStats = function () {
        var monthData = [];
        Object.keys($scope.departmentStats).forEach(function (item) {
            monthData.push({
                "label": item.toUpperCase(),
                "value": $scope.departmentStats[item]
            });
        });

        $scope.vm.monthDepartmentStats = seedData(monthData, $scope.vm.failures.length);
        $scope.vm.departmentRanges = angular.copy($scope.vm.monthDepartmentStats);
    }

    var getGearFaultStats = function () {
            var monthData = [];
            Object.keys($scope.gearFaultStats).forEach(function (item) {
                monthData.push({
                    "label": item.toUpperCase(),
                    "value": $scope.gearFaultStats[item]
                });
            });

            $scope.vm.montGearfaultRanges = seedData(monthData, $scope.vm.failures.length);
            $scope.vm.gearfaultRanges = angular.copy($scope.vm.montGearfaultRanges);
    }

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

    $scope.setCostStats = function () {
        if ($scope.costFailureMonthView) {
            $scope.vm.experienceRanges = angular.copy($scope.vm.monthExperienceRanges);
        }
        else {
            $scope.vm.experienceRanges = angular.copy($scope.vm.dayExperienceRanges);
        }
    }

    $scope.setGearStats = function () {
        if ($scope.gearFailureMonthView) {
            $scope.vm.gearfaultRanges = angular.copy($scope.vm.montGearfaultRanges);
        }
        else {
            $scope.vm.gearfaultRanges = angular.copy($scope.vm.dayGearfaultRanges);
        }
    }

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
        });
    }

    $scope.getAll = function () {
        var date = new Date();
        $scope.vm.fromDate = new Date(new Date().setHours(23, 59, 59, 999));
        $scope.vm.toDate = new Date(new Date().setHours(23, 59, 59, 999));
        $scope.vm.fromDate2 = new Date(new Date().setHours(23, 59, 59, 999));
        $scope.vm.toDate2 = new Date(new Date().setHours(23, 59, 59, 999));
        $scope.vm.fromDate2.setHours(-1);
        $scope.vm.toDate2.setHours(-1);
        $scope.get()
    };


    $scope.getSavedTime = function (dateTime) {
        if (!dateTime) {
            return null;
        }
        return $filter("stringToDate")(dateTime, "dd-MMM-yyyy HH:mm");
    };

    $scope.get = function () {
        if ($scope.vm.fromDate && $scope.vm.toDate && new Date($scope.vm.fromDate).getTime() <= new Date($scope.vm.toDate).getTime() &&
              $scope.vm.fromDate2 && $scope.vm.toDate2 && new Date($scope.vm.fromDate2).getTime() <= new Date($scope.vm.toDate2).getTime()  ) {
                //$scope.vm.toDate = $scope.vm.fromDate;
            var filterModel = $scope.getFilterModel();
            var filterModel1 = $scope.getFilterModel();
            filterModel1.fromDate = $scope.vm.fromDate2.dateOnlyString();
            filterModel1.toDate = $scope.vm.toDate2.dateOnlyString();
            $q.all([ReportService.getFilterFailures(filterModel), ReportService.getFilterFailures(filterModel1)]).then(function (data) {
                $scope.vm.failures2 = data[1];
                $scope.vm.failures1 = data[0];

                //$scope.vm.failures.forEach(function (item) {
                //    //$filter('date')
                //    item.stimeOfOccurance = $scope.getSavedTime(item.timeOfOccurance);
                //    item.stimeSignalMainInformed = $scope.getSavedTime(item.timeSignalMainInformed);
                //    item.stimeSignalMainReached = $scope.getSavedTime(item.timeSignalMainReached);
                //    item.stimeRectified = $scope.getSavedTime(item.timeRectified);
                //    item.duration = item.totalDuration && item.totalDuration > 0 ? $filter('decimalToHHMM')(item.totalDuration) : "";
                //    item.durationStamp = item.totalDuration && item.totalDuration > 0 ? $filter('decimalToHHMMTimeStamp')(item.totalDuration) : "";
                //});

                $scope.vm.rawData1 = angular.copy($scope.vm.failures1);
                $scope.vm.rawData2 = angular.copy($scope.vm.failures2);
                filterData();
            });
        } else {
            NotificationService.error("Select Valid Date.");
        }
    }

    $scope.showFailureDetails = function (failure) {
        $scope.vm.currentFailure = failure;
        $scope.failureModelInstance = $uibModal.open({
            templateUrl: 'failure-detail',
            scope: $scope
        });
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
            if (userItems.length) {
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


    var setRows = function (maxValue) {
        var x = maxValue / 10;
        $scope.rowScale = Math.ceil(x / 10) * 10;
        var heighestValue = $scope.rowScale * 11;
        $scope.rows = [];
        var scaleHours = 11;
        var rowheight = 450 / scaleHours;
        for (var i = 0; i <= scaleHours; i++) {
            $scope.rows.push({ top: (i * rowheight), label: $scope.rowScale * (scaleHours - i), lableTop: (i * rowheight) - 6 });
        }

        $scope.rowheight = rowheight;
    }

    $scope.downloadCompareFile = function () {
        if ($scope.vm.fromDate && $scope.vm.toDate && new Date($scope.vm.fromDate).getTime() <= new Date($scope.vm.toDate).getTime() &&
            $scope.vm.fromDate2 && $scope.vm.toDate2 && new Date($scope.vm.fromDate2).getTime() <= new Date($scope.vm.toDate2).getTime()) {

            var reportModel = $scope.getFilterModel();

            reportModel.fromDate1 = $scope.vm.fromDate.dateOnlyString();
            reportModel.toDate1 = $scope.vm.toDate.dateOnlyString();
            reportModel.fromDate2 = $scope.vm.fromDate2.dateOnlyString();
            reportModel.toDate2 = $scope.vm.toDate2.dateOnlyString();
            reportModel.name = 'comparestats';


            $http({
                method: 'post',
                url: 'api/report/compare/Export',
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


            //window.location.href = '/api/report/compare/Export?name=comparestats&format=excel&FromDate1=' + $scope.vm.fromDate.dateOnlyString() + '&toDate1=' + $scope.vm.toDate.dateOnlyString() +
            //    '&FromDate2=' + $scope.vm.fromDate2.dateOnlyString() + '&toDate2=' + $scope.vm.toDate2.dateOnlyString() + '&SearchKey=' + '' + '&SectionFilter=' + $scope.vm.sectionFilter.id + '&StationFilter=' + $scope.vm.stationFilter.id + '&UserFilter=' + $scope.vm.userFilter.id + '&ReportedFilter=' + $scope.vm.reportedFilter.id + '&GearAtFaultFilter=' + $scope.vm.gearFaultFilter.id;
        }
        else {
            NotificationService.error("Select Valid Date.");
        }
    }

    var filterData = function () {
        $scope.vm.failures1 = filterFailures($scope.vm.rawData1);
        $scope.vm.failures2 = filterFailures($scope.vm.rawData2);

        $scope.gearFaultStats1 = {};
        $scope.vm.failures1.forEach(function (item) {
            $scope.gearFaultStats1[item.gearFault] = 1 + ($scope.gearFaultStats1[item.gearFault] || 0);
        });

        $scope.gearFaultStats2 = {};
        $scope.vm.failures2.forEach(function (item) {
            $scope.gearFaultStats2[item.gearFault] = 1 + ($scope.gearFaultStats2[item.gearFault] || 0);
        });

        var valuesArray = Object.values($scope.gearFaultStats1).concat(Object.values($scope.gearFaultStats2));
        var val = valuesArray.length > 0 ? Math.ceil(Math.max.apply(Math, valuesArray)) : 0;
        setRows(val);

        setFailureStats();
    };

    var setFailureStats = function () {
        $scope.vm.failureStats = [];
        $scope.vm.totalcount1 = 0;
        $scope.vm.totalcount2 = 0;
        if (Object.keys($scope.gearFaultStats1).length > 0 || Object.keys($scope.gearFaultStats2).length > 0) {
            $scope.vm.gearFaults.forEach(function (item) {
                var count1 = $scope.gearFaultStats1[item.name] || 0, count2 = $scope.gearFaultStats2[item.name] || 0;
                var val1 = (count1 / $scope.rowScale) * $scope.rowheight, val2 = (count2 / $scope.rowScale) * $scope.rowheight;
                $scope.vm.totalcount1 += count1; 
                $scope.vm.totalcount2 += count2;
                $scope.vm.failureStats.push({ name: item.name, count1: count1, count2: count2, val1: val1, val2: val2 });
            });
        }
    };

    var filterFailures = function (data) {
        var result = angular.copy(data);
        //if ($scope.vm.stationFilter.id != 0) {
        //    result = result.filter(function (item) { return item.stationId == $scope.vm.stationFilter.id; });
        //}
        //else if ($scope.vm.stations && $scope.vm.stations.length != $scope.vm.currentStations.length) {
        //    var stationsMap = $scope.vm.currentStations.reduce(function (o, v, i) { o[v.id] = v; return o; }, {});
        //    result = result.filter(function (item) { return stationsMap[item.stationId] != null; });
        //}

        //if ($scope.vm.gearFaultFilter.id != 0) {
        //    result = result.filter(function (item) { return item.gearFaultId == $scope.vm.gearFaultFilter.id; });
        //}

        //if ($scope.vm.reportedFilter.id != 0) {
        //    result = result.filter(function (item) { return item.reportedId == $scope.vm.reportedFilter.id; });
        //}

        return angular.copy(result);
    };

    var init = function () {
        $scope.SortValue = 'None';
        $scope.SortByPredicate = 'none';
        $scope.searchText = '';
        $scope.getFailureMangeInfo();

        $scope.getAll();
    };

    init();
}]);