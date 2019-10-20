
appRoot.controller('dashboardController', [
    '$scope', '$state', '$stateParams', '$location', '$filter', '$uibModal', 'ReportService', 'UserService', 'NotificationService', 'SharedModel', 'AppSettings',
function ($scope, $state, $stateParams, $location, $filter, $uibModal, ReportService, UserService, NotificationService, SharedModel, AppSettings) {
    console.log('Instantiated reports');
    var donutChartOptions = angular.copy(AppSettings.donutChartOptions);
    donutChartOptions.height = 250;
    donutChartOptions.donutRatio = 0.40;
    donutChartOptions.growOnHover = false;
    var colorCodes = ['#90CC6D', '#E3D850', '#FFB272', '#FF7C7C', '#C888FD', '#2EB059', '#555555', '#483D8B', '#2F4F4F', '#4F4F2F', '#008B8B'];
    $scope.costFailureMonthView = 0;
    $scope.gearFailureMonthView = 0;

    donutChartOptions.height = 300;
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
    function seedData(s, count) {


        var p = [];
        s.forEach(function (item, index) {
            var employees = (item.value / count) * 100;
            p.push({ key: item.label + ' - ' + item.value, y: employees, color: getColor(index), id: item.id });
        });

        return p;
    }


    /* main code*/

    $scope.vm = {};

    $scope.vm.experienceDonutChart = { chart: donutChartOptions };

    var getCostStats = function () {
        ReportService.getChargableStats().then(function (data) {
            var toDayCount = data.toDayChargbleCount + data.toDayNonChargbleCount;
            var toDayData = [];
            if (data.toDayChargbleCount) {
                toDayData.push({
                    "label": "Chargable Failures",
                    "value": data.toDayChargbleCount
                });
            }
            if (data.thisMonthNonChargbleCount) {
                toDayData.push(
                {
                    "label": "Non-Chargable Failures",
                    "value": data.toDayNonChargbleCount
                });
            }

            var thisMonthCount = data.thisMonthChargbleCount + data.thisMonthNonChargbleCount;
            var thisMonthData = [];
            if (data.thisMonthChargbleCount) {
                thisMonthData.push({
                    "label": "Chargable Failures",
                    "value": data.thisMonthChargbleCount
                });
            }
            if (data.thisMonthNonChargbleCount) {
                thisMonthData.push(
                {
                    "label": "Non-Chargable Failures",
                    "value": data.thisMonthNonChargbleCount
                });
            }

            
            var lastMonthData = [];
            var lastMonthCount = data.lastMonthChargbleCount + data.lastMonthNonChargbleCount;
            if (data.lastMonthChargbleCount) {
                lastMonthData.push({
                    "label": "Chargable Failures",
                    "value": data.lastMonthChargbleCount
                });
            }
            if (data.lastMonthNonChargbleCount) {
                lastMonthData.push(
                {
                    "label": "Non-Chargable Failures",
                    "value": data.lastMonthNonChargbleCount
                });
            }

            $scope.vm.lastMonthExperienceRanges = seedData(lastMonthData, lastMonthCount);
            $scope.vm.thisMonthExperienceRanges = seedData(thisMonthData, thisMonthCount);
            $scope.vm.toDayExperienceRanges = seedData(toDayData, toDayCount);
            $scope.vm.experienceRanges = angular.copy($scope.vm.toDayExperienceRanges);
    });

    }

    var getGearFaultStats = function () {
        ReportService.getGearFaultStats().then(function (data) {
            var lastMonthData = [];
            var lastMonthCount = 0;
            Object.keys(data.lastMonthStats).forEach(function (item) {
                lastMonthData.push({
                    "label": item.toUpperCase(),
                    "value": data.lastMonthStats[item].count,
                    "id": data.lastMonthStats[item].id
                });
                lastMonthCount += data.lastMonthStats[item].count;
            });

            var toDayData = [];
            var toDayCount = 0;
            Object.keys(data.toDayStats).forEach(function (item) {
                toDayData.push({
                    "label": item.toUpperCase(),
                    "value": data.toDayStats[item].count,
                    "id": data.toDayStats[item].id
                });
                toDayCount += data.toDayStats[item].count;
            });

            var thisMonthData = [];
            var thisMonthCount = 0;
            Object.keys(data.thisMonthStats).forEach(function (item) {
               thisMonthData.push({
                   "label": item.toUpperCase(),
                   "value": data.thisMonthStats[item].count,
                   "id": data.thisMonthStats[item].id
                });
                thisMonthCount += data.thisMonthStats[item].count;
            });

            $scope.vm.lastMonthGearfaultRanges = seedData(lastMonthData, lastMonthCount);
            $scope.vm.thisMonthGearfaultRanges = seedData(thisMonthData, thisMonthCount);
            $scope.vm.toDayGearfaultRanges = seedData(toDayData, toDayCount);
            $scope.vm.gearfaultRanges = angular.copy($scope.vm.thisMonthGearfaultRanges);
            $scope.gearFailureMonthView = 1;
        });
    }

    $scope.getFailures = function (reported, section) {
        window.location.href = "#/reports/failures?monthView=" + $scope.gearFailureMonthView + "&section=" + section + "&reported=" + reported;
    }

    $scope.getGearFailures = function (gear) {
        window.location.href = "#/reports/failures?monthView=" + $scope.gearFailureMonthView + "&gear=" + gear;
    }

    $scope.getLateFailures = function () {
        window.location.href = "#/reports/failures?monthView=" + $scope.gearFailureMonthView + "&late=" + 1;
    }

    var getStationStats = function () {
        var monthData = [];
        Object.keys($scope.stationsCountDict).forEach(function (item) {
            monthData.push({
                "label": item.toUpperCase(),
                "value": $scope.stationsCountDict[item]
            });
        });

        var stationStatstemp = seedData(monthData, $scope.vm.failures.length);
        $scope.vm.stationStats = angular.copy(stationStatstemp);
    }

    $scope.vm.scrollSettings = {
        background: 'rgb(206,208,211)',
        cursorwidth: '5px',
        autohidemode: false
    };

    $scope.vm.userFilter = { id: 0, title: 'All' };
    $scope.vm.sectionFilter = { id: 0, title: 'All' };

    $scope.vm.stationFilter = { id: 0, title: 'All' };
    $scope.vm.reportedFilter = { id: 0, title: 'All' };
    $scope.vm.gearFaultFilter = { id: 0, title: 'All' };

    $scope.vm.tableHeaders = [
     { name: 'sfrNo', title: 'SFRNo', sortReverse: false },
     { name: 'reported', title: 'Reported', sortReverse: false },
     { name: 'station', title: 'Station', sortReverse: false },
     { name: 'gearFault', title: 'Gear at Fault', sortReverse: false },
     { name: 'description', title: 'Description', sortReverse: false },
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

    $scope.setCostStats = function () {
        if ($scope.costFailureMonthView == 2) {
            $scope.vm.experienceRanges = angular.copy($scope.vm.lastMonthExperienceRanges);
        }
        else if ($scope.costFailureMonthView == 1) {
            $scope.vm.experienceRanges = angular.copy($scope.vm.thisMonthExperienceRanges);
        }
        else {
            $scope.vm.experienceRanges = angular.copy($scope.vm.toDayExperienceRanges);
        }
    }

    $scope.setGearStats = function () {
        if ($scope.gearFailureMonthView == 2) {
            $scope.vm.gearfaultRanges = angular.copy($scope.vm.lastMonthGearfaultRanges);
            $scope.getFailureMangeInfo(2);
        }
        else if ($scope.gearFailureMonthView == 1) {
            $scope.vm.gearfaultRanges = angular.copy($scope.vm.thisMonthGearfaultRanges);
            $scope.getFailureMangeInfo(1);
        }
        else {
            $scope.vm.gearfaultRanges = angular.copy($scope.vm.toDayGearfaultRanges);
            $scope.getFailureMangeInfo(0);
        }
    }

    $scope.getFailureMangeInfo = function (monthView) {
        ReportService.getFailureDashboardInfo(monthView).then(function (data) {
            $scope.vm.sections = data.sections;
            $scope.vm.stations = data.stations;
            $scope.vm.mainStations = [];
            $scope.vm.ibs = [];
            $scope.vm.gates = [];
            data.stations.forEach(function (s) { if (s.stationType === 0) { $scope.vm.mainStations.push(s); }; });
            data.stations.forEach(function (s) { if (s.stationType === 1) { $scope.vm.ibs.push(s); }; });
            data.stations.forEach(function (s) { if (s.stationType === 2) { $scope.vm.gates.push(s); }; });
            $scope.vm.gearFaults = data.gearFaults;
            $scope.vm.reporteds = data.reporteds;
            $scope.vm.stationGearData = data.stationGearData;
            $scope.vm.lateCount = data.lateCount;
            $scope.vm.currentStations = data.stations;
            $scope.vm.monthFailures = data.failures;
            $scope.totalMonthDuration = 0;
            $scope.vm.monthFailures.forEach(function (item) {
                $scope.totalMonthDuration = $scope.totalMonthDuration + item.totalDuration || 0;
            });

            var avgMonthTotalDuaration = $scope.totalMonthDuration / $scope.vm.monthFailures.length;
            $scope.avgMonthTotalDuaration = avgMonthTotalDuaration && avgMonthTotalDuaration > 0 ? $filter('decimalToHHMM')(avgMonthTotalDuaration) : "";
        });
    }

    $scope.getAll = function () {
        var date = new Date();
        $scope.vm.fromDate = new Date(new Date().setHours(23, 59, 59, 999));
        $scope.vm.toDate = new Date(new Date().setHours(23, 59, 59, 999));
        $scope.get();
    };


    $scope.getSavedTime = function (dateTime) {
        if (!dateTime) {
            return null;
        }
        return $filter("stringToDate")(dateTime, "dd-MMM-yyyy HH:mm");
    };

    $scope.get = function () {
        if ($scope.vm.fromDate) {
            $scope.vm.toDate = $scope.vm.fromDate;
            ReportService.getFailures($scope.vm.fromDate, $scope.vm.toDate).then(function (pointers) {
                $scope.vm.failures = pointers;
                var val = Math.ceil(Math.max.apply(Math, pointers.map(function (o) { return o.totalDuration; })));
                val = val < 8 ? 8 : val + 1;
                setRows(val);
                $scope.stationsCountDict = {};
                $scope.totalDuration = 0;
                $scope.vm.failures.forEach(function (item) {
                    //$filter('date')
                    item.stimeOfOccurance = $scope.getSavedTime(item.timeOfOccurance);
                    item.stimeSignalMainInformed = $scope.getSavedTime(item.timeSignalMainInformed);
                    item.stimeSignalMainReached = $scope.getSavedTime(item.timeSignalMainReached);
                    item.stimeRectified = $scope.getSavedTime(item.timeRectified);
                    item.duration = item.totalDuration && item.totalDuration > 0 ? $filter('decimalToHHMM')(item.totalDuration) : "";
                    item.durationStamp = item.totalDuration && item.totalDuration > 0 ? $filter('decimalToHHMMTimeStamp')(item.totalDuration) : "";
                    item.fillDuration = item.totalDuration * $scope.rowheight;
                    $scope.stationsCountDict[item.station] = 1 + ($scope.stationsCountDict[item.station] || 0);
                    $scope.totalDuration = $scope.totalDuration + item.totalDuration || 0;
                });

                $scope.stationsCount = Object.keys($scope.stationsCountDict).length;
                getStationStats();
                var avgTotalDuaration = $scope.totalDuration / $scope.vm.failures.length;
                $scope.avgTotalDuaration = avgTotalDuaration && avgTotalDuaration > 0 ? $filter('decimalToHHMM')(avgTotalDuaration) : "";
                $scope.vm.rawData = angular.copy($scope.vm.failures);
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

    var setRows = function (maxValue) {
        $scope.rows = [];
        var scaleHours = maxValue;
        var rowheight = 450 / scaleHours;
        for (var i = 0; i <= scaleHours; i++) {
            $scope.rows.push({ top: (i * rowheight), label: scaleHours - i, lableTop: (i * rowheight) - 6 });
        }
        $scope.rowheight = rowheight;
    }

    var init = function () {
        $scope.SortValue = 'None';
        $scope.SortByPredicate = 'none';
        $scope.searchText = '';
        $scope.getFailureMangeInfo(1);
        //getCostStats();
        getGearFaultStats();
        $scope.getAll();
    };

    init();


}]);