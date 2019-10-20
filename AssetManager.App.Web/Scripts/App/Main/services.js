/*global Image*/
/*jshint es5: true */
/// <reference path="~/scripts/angular.js" /> 
/// <reference path="~/scripts/jquery-1.9.1.js" />

//Service to store the default configurations used on the client side.

appRoot.services = angular.module('xstore.services', []).factory('AppSettings', [
        '$resource', '$q',  function ($resource, $q) {
            // These settings are applied across site. For tenant \ org specific setting loop at settings.js
            var publicProfile = $resource('api/me/publicprofile');

            var setting = {
                //Standard grid settings
                gridSettings: {
                    rowHeight: 50,
                    showGridFooter: true,
                    showColumnFooter: false,
                    filterOptions: {},
                    columnFooterHeight: 40,
                    selectionRowHeaderWidth: 50,
                    treeRowHeaderAlwaysVisible: false,
                    groupingShowAggregationMenu: true,
                    groupingNullLabel: null,
                    enableColumnResizing: false,
                    enableFiltering: false,
                    enableColumnMenus: false,
                    enableVerticalScrollbar: 0,
                    enableHorizontalScrollbar: 0,
                    enableGridMenu: false,
                    paginationPageSizes: [100, 200, 500],
                    paginationPageSize: 100,
                    enablePaginationControls: true,
                    paginationCurrentPage: 1,
                    gridMenuCustomItems: [
                        {
                            title: 'Hide Search',
                            icon: 'icon-search3',
                            leaveOpen: false,
                            order: 0,
                            action: function ($event) {
                                //this binds to gridApi instance
                                if (this.grid) {
                                    this.grid.options.enableFiltering = !this.grid.options.enableFiltering;
                                    this.grid.api.core.notifyDataChange("column");
                                }
                            },
                            shown: function () {
                                return this.grid && this.grid.options.enableFiltering;
                            }
                        },
                        {
                            title: 'Show Search',
                            icon: 'icon-search3',
                            leaveOpen: false,
                            order: 0,
                            action: function ($event) {
                                //this binds to gridApi instance
                                if (this.grid) {
                                    this.grid.options.enableFiltering = !this.grid.options.enableFiltering;
                                    this.grid.api.core.notifyDataChange("column");
                                }
                            },
                            shown: function () {
                                return this.grid && !this.grid.options.enableFiltering;
                            }
                        }
                    ]
                },
                pagedGridSettings: {
                    enableHorizontalScrollbar: 0,
                    rowHeight: 50,
                    selectionRowHeaderWidth: 50,
                    enableColumnResizing: false,
                    enableFiltering: false,
                    enableColumnMenus: false,
                    enableGridMenu: false,
                    paginationPageSizes: [100, 200, 500],
                    paginationPageSize: 100,
                    enablePaginationControls: true
                },
                fileUploadSettings: {
                    location: "/api/fileupload/default",
                    maxFileSize: 5000000,
                    maxNumberOfFiles: 1,
                    acceptFileTypes: undefined,
                    uploadTo: "api/fileupload/default"
                },
                donutChartOptions: {
                    type: 'pieChart',
                    height: 200,
                    donut: true,
                    color: function (d, i) {
                        return d.color;
                    },
                    x: function (d) {
                        return d.key;
                    },
                    y: function (d) {
                        return d.y;
                    },
                    showLabels: false,

                    pie: {
                        startAngle: function (d) {
                            return d.startAngle;
                        },
                        endAngle: function (d) {
                            return d.endAngle;
                        },
                        donutRatio: 0.94
                    },
                    transitionDuration: 500,
                    showLegend: false,
                    valueFormat: function (d) {
                        return d3.format("%")(d / 100);
                    },
                    tooltipContent: function (key, y, e, graph) {
                        return '<h4 style="text-align:center;margin:10px 10px;">' + key.data.key + '</h4>';
                    },
                    legend: {
                        margin: {
                            top: 5,
                            right: 70,
                            bottom: 5,
                            left: 0
                        }
                    }
                },
                modelBlurSettings: {
                    updateOn: 'blur'
                },
                scrollSettings: {
                    background: 'rgb(206,208,211)',
                    cursorwidth: '10px',
                    autohidemode: 'leave'
                },
                fixedScrollSetting: {
                    background: 'rgb(206,208,211)',
                    cursorwidth: '10px',
                    autohidemode: false
                }
            };

            return setting;
        }
])
    .factory('NotificationService', [
        '$rootScope', function ($rootScope) {
            var notificationService = {
                information: function (message) {
                    $rootScope.$broadcast("notificationBroadcast", { "Message": message, "Type": 'information' });
                },
                success: function (message) {
                    $rootScope.$broadcast("notificationBroadcast", { "Message": message, "Type": 'success' });
                },
                error: function (message) {
                    $rootScope.$broadcast("notificationBroadcast", { "Message": message, "Type": 'error' });
                }
            };
            return notificationService;
        }
    ])
    .factory('authService', [
        '$resource', function ($resource) {
            return {
                /*ToDo: Authentication purpose*/
                getUser: function (callback) {
                    $resource("api/mytime/jobtitle").get(callback);
                },
                generateRole: function () {
                    /*this is resolved before the router loads the view and model*/
                }
            };
        }
    ]).factory('Utils', [
        '$q', function ($q) {
            return {
                isImage: function (src) {
                    var deferred = $q.defer();
                    var image = new Image();
                    image.onerror = function () {
                        deferred.resolve(false);
                    };
                    image.onload = function () {
                        deferred.resolve(true);
                    };
                    image.src = src;
                    return deferred.promise;
                },
                getGuid: function () {
                    var d = new Date().getTime();
                    if (window.performance && typeof window.performance.now === "function") {
                        d += performance.now();; //use high-precision timer if available
                    }
                    var guid = 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function (c) {
                        var r = (d + Math.random() * 16) % 16 | 0;
                        d = Math.floor(d / 16);
                        return (c == 'x' ? r : (r & 0x3 | 0x8)).toString(16);
                    });
                    return guid;
                }
            };
        }
    ]).factory('ImageService', [
        '$filter', 'Utils', function ($filter, Utils) {
            var imageService = {
                getImageUrl: function (imageRelativeUrl, versionKey) {
                    if (!imageRelativeUrl && imageRelativeUrl !== "") {
                        return;
                    }
                    var imageUrl = $filter('storageAccountUrl')(versionKey + imageRelativeUrl);
                    Utils.isImage(imageUrl).then(function (result) {
                        return result ? imageUrl : $filter('storageAccountUrl')(imageRelativeUrl);
                    });
                }
            };
            return imageService;
        }
    ]).factory('DateServices', function () {
        dateservices = {
            toJavaScriptDate: function (value) {
                var dt = new Date(value);
                return (dt.getMonth() + 1) + "/" + dt.getDate() + "/" + dt.getFullYear();
            }
        }
        return dateservices;
    }).factory("InvoiceServices", ['$q', '$timeout', function ($q, $timeout) {
        var invoice = {};
        invoice.setProject = function (data) {
            invoice.project = data;
        };
        invoice.getProject = function () {
            var defer = $q.defer();
            invoice.project ? defer.resolve(invoice.project) : defer.reject("error");
            return defer.promise;
        };
        return invoice;
    }])
    .filter('timeFormatter', function () {
        return function (input, format) {
            var hhmmRegEx = /^(?:\d|[01]\d|2[0-3]):[0-5]\d$/, decimalRegEx = /^(?:\d|[01]\d|2[0-3])?(\.\d{1,2})?$/, hours = 0, minutes = 0;
            switch (format) {
                case 'hhmm':
                    if (hhmmRegEx.test(input)) {
                        return input;
                    } else if (!isNaN(input)) {
                        if (input != "") {
                            hours = Math.floor(input);
                            minutes = Math.round((parseFloat(input) - Math.floor(input)) * 60);

                            if (minutes > 59) {
                                hours = hours + 1;
                                minutes = 0;
                            }
                            return minutes > 9 ? hours + ":" + minutes : hours + ":0" + minutes;
                        } else {
                            return "0:00";
                        }
                    } else {
                        return null;
                    }
                    break;
                case 'decimal':
                    if (hhmmRegEx.test(input)) {
                        return parseInt(input.split(":")[0], 10) + parseFloat(input.split(":")[1] / 60);
                    } else if (!isNaN(input) && input != "") {
                        return parseFloat(input);
                    } else {
                        return 0;
                    }
                    break;
                default:
                    return null;
            }
        };
    }).filter('shortName', function () {
        return function (name) {
            var shortName = "";
            if (name) {
                name.trim().split(' ').forEach(function (n) {
                    if (n != "") {
                        shortName = shortName.concat(n[0]);
                    }
                });
            }
            return shortName;
        }
    }).filter('userFriendlyDate', [
        '$filter', function ($filter) {
            return function (input, format) {
                var inputDate;
                if (typeof (input) == "string") {
                    inputDate = new Date(new Date(input).getTime() + new Date().getTimezoneOffset() * 60000);
                }
                else {
                    inputDate = new Date(input);
                }

                var todayDate = new Date();
                if (inputDate.getMonth() === todayDate.getMonth()) {
                    if (inputDate.getDate() === todayDate.getDate()) {
                        return "Today";
                    } else if (inputDate.getDate() === todayDate.getDate() + 1) {
                        return "Tomorrow";
                    }
                }
                return $filter('date')(inputDate, format);
            };
        }
    ]).filter('commentsFilter', function () {
        var filtered = [];
        return function (items) {
            angular.forEach(items, function (comment) {
                if (comment.parentCommentId == 0) {
                    filtered.push(comment);
                }
            });
            return filtered;
        }
    }).filter('commentsDateFilter', function () {
        var dt = "";
        return function (date) {
            var diff = Math.abs(new Date(date) - new Date());
            var minutes = Math.floor((diff / 1000) / 60);
            var hours = Math.floor(minutes / 60);
            var days = Math.ceil(hours / 24);
            var oneDay = 24 * 60 * 60 * 1000;
            if (minutes < 60) {
                dt = minutes <= 1 ? "Just now" : minutes + " minutes ago";
            }
            else if (hours < 24) {
                dt = hours == 1 ? hours + " hour ago" : hours + " hours ago";
            }
            else {
                res = Math.round(Math.ceil((new Date(date).getTime() - new Date().getTime()) / (oneDay)));
                return res == -1 ? "1 Day ago" : res < -1 && res > -7 ? Math.abs(res) + " Days ago" : res <= -7 && res > -30 ? (Math.round(Math.abs(res / 7)) == 1 ? " 1 Week ago" : Math.round(Math.abs(res / 7)) + " Weeks ago") : res <= -30 && res > -365 ? (Math.round(Math.abs(res / 30)) == 1 ? "1 Month ago" : Math.round(Math.abs(res / 30)) + " Months ago") : res <= -365 ? (Math.round(Math.abs(res / 365)) == 1 ? "1 Year ago" : +Math.round(Math.abs(res / 365)) + " Years ago") : "";
            }
            return dt;
        };
    }).filter('pollDateFilter', function () {
        var dt = "";
        return function (date) {
            var diff = Math.abs(new Date(date) - new Date());
            var minutes = Math.floor((diff / 1000) / 60);
            var hours = Math.floor(minutes / 60);
            var days = Math.ceil(hours / 24);
            if (days < 3) {
                dt = days == 1 ? days + " day" : days + " days";
            }
            else {
                dt = new Date(date);
            }
            return dt;
        };
    }).filter('abs', function () {
        return function (val) {
            return Math.abs(val);
        }
    }).filter('shiftTime', ['$filter', function ($filter) {
        return function (input) {
            var date = new Date(input);
            return $filter('date')(input, 'h:mm a');
        };
    }]).filter('parseUrl', function () {
        var urls = /(\b(https?|ftp):\/\/[A-Z0-9+&@#\/%?=~_|!:,.;-]*[-A-Z0-9+&@#\/%=~_|])/gim;
        var emails = /(\w+@[a-zA-Z_]+?\.[a-zA-Z]{2,6})/gim;

        return function (text) {
            if (text.match(urls)) {
                text = text.replace(urls, "<a href=\"$1\" target=\"_blank\">$1</a>");
            }
            if (text.match(emails)) {
                text = text.replace(emails, "<a href=\"mailto:$1\">$1</a>");
            }
            return text;
        };
    }).filter('regexFilter', function () {   //this filter is used to filter the array with regular expression
        return function (input, field, regex) {
            var patt = new RegExp(regex);
            var out = [];
            for (var i = 0; i < input.length; i++) {
                if (input[i][field] && patt.test(input[i][field].toUpperCase()))
                    out.push(input[i]);
            }
            return out;
        };
    }).filter('ordinal', function () {

        var numberWithSuffix = function (n) {
            return Math.floor(n / 10) === 1 ? 'th' : (n % 10 === 1 ? 'st' : (n % 10 === 2 ? 'nd' : (n % 10 === 3 ? 'rd' : 'th')));
        }
        return function (input) {
            var num = parseInt(input, 10);
            return isNaN(num) ? '' : numberWithSuffix(num);
        };
    }).filter('decimalToHHMM', function () {
        return function (hours) {
            if (!hours) {
                return 0;
            }
            var sign = hours < 0 ? "-" : "";
            //var hr = Math.floor(Math.abs(hours));
            //var min = Math.floor((Math.abs(hours) * 60) % 60);
            var min = Math.round((Math.abs(hours) * 60));
            return sign + (min < 10 ? "0" : "") + min + " Mins";
        }
    }).filter('decimalToHHMMTimeStamp', function () {
        return function (hours) {
            if (!hours) {
                return 0;
            }
            var sign = hours < 0 ? "-" : "";
            //var hr = Math.floor(Math.abs(hours));
            //var min = Math.floor((Math.abs(hours) * 60) % 60);
            var min = Math.round((Math.abs(hours) * 60));
            return sign + (min < 10 ? "0" : "") + min;
        }
    }).service('CSV', [
        '$q', function ($q) {

            var EOL = encodeURIComponent('\r\n');
            var DATA_URI_PREFIX = "data:text/csv;charset=utf-8,";

            /**
     * Stringify one field
     * @param data
     * @param delimier
     * @returns {*}
     */
            this.stringifyField = function (data, delimier, quoteText) {
                if (typeof data === 'string') {
                    data = data.replace(/"/g, '""'); // Escape double qoutes
                    if (quoteText || data.indexOf(',') > -1 || data.indexOf('\n') > -1 || data.indexOf('\r') > -1) {
                        data = delimier + data + delimier;
                    }
                    return encodeURIComponent(data);
                }

                if (typeof data === 'boolean') {
                    return data ? 'TRUE' : 'FALSE';
                }

                return data;
            };

            /**
     * Creates a csv from a data array
     * @param data
     * @param options
     *  * header - Provide the first row (optional)
     *  * fieldSep - Field separator, default: ','
     * @param callback
     */
            this.stringify = function (data, options) {
                var def = $q.defer();

                var that = this;
                var csv;
                var csvContent = "";

                var dataPromise = $q.when(data).then(function (responseData) {
                    responseData = angular.copy(responseData);
                    // Check if there's a provided header array
                    if (angular.isDefined(options.header) && options.header) {
                        var encodingArray, headerString;

                        encodingArray = [];
                        angular.forEach(options.header, function (title, key) {
                            this.push(that.stringifyField(title, options.txtDelim, options.quoteStrings));
                        }, encodingArray);

                        headerString = encodingArray.join(options.fieldSep ? options.fieldSep : ",");
                        csvContent += headerString + EOL;
                    }

                    var arrData;

                    if (angular.isArray(responseData)) {
                        arrData = responseData;
                    } else {
                        arrData = responseData();
                    }

                    angular.forEach(arrData, function (row, index) {
                        var dataString, infoArray;

                        infoArray = [];

                        angular.forEach(row, function (field, key) {
                            this.push(that.stringifyField(field, options.txtDelim, options.quoteStrings));
                        }, infoArray);

                        dataString = infoArray.join(options.fieldSep ? options.fieldSep : ",");
                        csvContent += index < arrData.length ? dataString + EOL : dataString;
                    });

                    if (window.navigator.msSaveOrOpenBlob) {
                        csv = csvContent;
                    } else {
                        csv = DATA_URI_PREFIX + csvContent;
                    }
                    def.resolve(csv);
                });

                if (typeof dataPromise.catch === 'function') {
                    dataPromise.catch(function (err) {
                        def.reject(err);
                    });
                }

                return def.promise;
            };
        }
    ]).filter('propsFilter', function () {
        return function (items, props) {
            var out = [];

            if (angular.isArray(items)) {
                items.forEach(function (item) {
                    var itemMatches = false;

                    var keys = Object.keys(props);
                    for (var i = 0; i < keys.length; i++) {
                        var prop = keys[i];
                        var text = props[prop].toLowerCase();
                        if (item[prop].toString().toLowerCase().indexOf(text) !== -1) {
                            itemMatches = true;
                            break;
                        }
                    }

                    if (itemMatches) {
                        out.push(item);
                    }
                });
            } else {
                // Let the output be the input untouched
                out = items;
            }

            return out;
        };
    }).filter('ReportService', ['$resource', '$q', function ($resource, $q) {

        reportedServices = {
            reported: $resource('api/failure/:action/:id', {}, { update: { method: 'PUT' }, drop: { method: 'DELETE' } }),

            getUsers: function () {
                var reporteds = [];
                return this.reported.query({ action: 'getUsers' }).$promise.then(function (reporteds) {
                    return reporteds;
                });
            }
        }
            return reportedServices;
        }]).filter('stringToDate', ['$filter', function ($filter) {
        return function (input, format) {
            if (input) {
                var date = new Date();
                if (typeof (input) == "string") {
                    date = new Date(new Date(input).getTime() + new Date().getTimezoneOffset() * 60000);
                }
                else {
                    date = new Date(input);
                }

                return $filter("date")(date, format);
            }
            return input;
        }
    }]).filter('currencyToWords', function () {

        return function (amount) {
            var currencyToWordConvert = function (amount) {
                var ones = ["", "one", "two", "three", "four", "five", "six", "seven", "eight", "nine", "ten", "eleven", "twelve", "thirteen", "fourteen", "fifteen", "sixteen", "seventeen", "eighteen", "nineteen"];
                var tens = ["", "", "twenty", "thirty", "fourty", "fifty", "sixty", "seventy", "eighty", "ninety"];

                if ((amount < 0) || (amount > 999999999)) {
                    return "NUMBER OUT OF RANGE!";
                }

                var crore = Math.floor(amount / 10000000);
                amount -= crore * 10000000;
                var lac = Math.floor(amount / 100000);
                amount -= lac * 100000;
                var thousand = Math.floor(amount / 1000);
                amount -= thousand * 1000;
                var hunderad = Math.floor(amount / 100);
                amount = amount % 100;
                var ten = Math.floor(amount / 10);
                var one = Math.floor(amount % 10);
                var res = "";

                if (crore > 0) {
                    res += (currencyToWordConvert(crore) + " crore");
                }
                if (lac > 0) {
                    res += (((res == "") ? "" : " ") +
                    currencyToWordConvert(lac) + " lac");
                }
                if (thousand > 0) {
                    res += (((res == "") ? "" : " ") +
                        currencyToWordConvert(thousand) + " thousand");
                }

                if (hunderad) {
                    res += (((res == "") ? "" : " ") +
                        currencyToWordConvert(hunderad) + " hundred");
                }

                if (ten > 0 || one > 0) {
                    if (!(res == "")) {
                        res += " and ";
                    }
                    if (ten < 2) {
                        res += ones[ten * 10 + one];
                    }
                    else {

                        res += tens[ten];
                        if (one > 0) {
                            res += ("-" + ones[one]);
                        }
                    }
                }
                if (res == "") {
                    res = "zero";
                }
                return res;
            }
            return currencyToWordConvert(amount);
        }
    }).service("CalendarService", [
        function () {
            return {
                addToCalendar: function (event, calType) {
                    var formatTime = function (date) {
                        date = new Date(date);
                        date = new Date(date.setDate(date.getDate() - 1));
                        return date.toISOString().replace(/-|:|\.\d+/g, '');
                    },
                        MS_IN_MINUTES = 60 * 1000,
                        href;

                    switch (calType) {
                        case "google":
                            href = encodeURI([
                                'https://www.google.com/calendar/render',
                                '?action=TEMPLATE',
                                '&text=' + (event.title || ''),
                                '&dates=' + (formatTime(event.start) || ''),
                                '/' + (formatTime(event.end) || ''),
                                '&details=' + (event.description || ''),
                                '&location=' + (event.address || ''),
                                '&sprop=&sprop=name:'
                            ].join(''));
                            window.open(href);
                            break;
                        case "yahoo":
                            var eventDuration = event.end ? ((event.end.getTime() - event.start.getTime()) / MS_IN_MINUTES) : event.duration;
                            // Yahoo dates are crazy, we need to convert the duration from minutes to hh:mm
                            var yahooHourDuration = eventDuration < 600 ?
                                '0' + Math.floor((eventDuration / 60)) :
                                Math.floor((eventDuration / 60)) + '';

                            var yahooMinuteDuration = eventDuration % 60 < 10 ?
                                '0' + eventDuration % 60 :
                                eventDuration % 60 + '';

                            var yahooEventDuration = yahooHourDuration + yahooMinuteDuration;

                            // Remove timezone from event time
                            var st = formatTime(new Date(event.start - (event.start.getTimezoneOffset() *
                                MS_IN_MINUTES))) || '';
                            href = encodeURI([
                                'http://calendar.yahoo.com/?v=60&view=d&type=20',
                                '&title=' + (event.title || ''),
                                '&st=' + st,
                                '&dur=' + (yahooEventDuration || ''),
                                '&desc=' + (event.description || ''),
                                '&in_loc=' + (event.address || '')
                            ].join(''));
                            window.open(href);
                            break;
                        default:
                            var startTime = formatTime(event.start);
                            var endTime = formatTime(event.end); //calculateEndTime(event);
                            var href = encodeURI(
                                'data:text/calendar;charset=utf8,' + [
                                    'BEGIN:VCALENDAR',
                                    'VERSION:2.0',
                                    'BEGIN:VEVENT',
                                    'URL:' + event.url,
                                    'DTSTART:' + (startTime || ''),
                                    'DTEND:' + (endTime || ''),
                                    'SUMMARY:' + (event.title || ''),
                                    'DESCRIPTION:' + (event.description || ''),
                                    'LOCATION:' + (event.address || ''),
                                    'END:VEVENT',
                                    'END:VCALENDAR'
                                ].join('\n'));
                            //window.location.href = href;
                            var mywindow = window.open(href, 'mywindow');
                            break;
                    }

                }
            };
        }
    ]);

/*Constant object to represent a enumeration. The valueObject format should be
    { 
        key1: { id:0, //other properties }, 
        key2: { id:1, //other properties }
    }
    The return object will have properties obj.key1 and obj.key2 for direct access and methods getAll and getById(id)
*/
appRoot.factory('Constants', [function () {
    var Constants = function (valueObject) {
        angular.extend(this, valueObject);
    };
    Constants.prototype.getById = function (id) {
        var idPropertyKey = Object.keys(this).find(function (key) { return this[key].id === id; }, this);
        return idPropertyKey ? this[idPropertyKey] : null;
    };
    Constants.prototype.getAll = function () {
        return Object.keys(this).map(function (key) { return this[key]; }, this);
    };
    return Constants;
}]);

appRoot.factory("ListNavService", function () {
    var listIds = [];
    var listNavService = {
        getListIds: function () {
            return listIds;
        },
        addListIds: function (array) {
            listIds = array;
        }
    };

    return listNavService;
});

angular.module('LoadingServices', [])
    .config(['$httpProvider', function ($httpProvider) {
        $httpProvider.interceptors.push('myHttpInterceptor');
    }
    ])
// register the interceptor as a service, intercepts ALL angular ajax http calls
    .factory('myHttpInterceptor', ["$injector", "$q", function ($injector, $q) {
        return {
            // optional method
            'request': function (config) {
                // do something on request
                if (config.url != "api/heartbeat/datetime") {
                    $('.loading').show();
                };
                return config;
            },

            // optional method
            'requestError': function (rejection) {
                // do something on error
                $('.loading').show();
                return $q.reject(rejection);
            },

            // optional method
            'response': function (response) {
                // do something on success
                var myHttp = $injector.get('$http');
                if (myHttp.pendingRequests.length == 0) {
                   $('.loading').hide();
                }
                return response;
            },

            // optional method
            'responseError': function (rejection) {
                // do something on error
                var myHttp = $injector.get('$http');
                if (myHttp.pendingRequests.length == 0) {
                    $('.loading').hide();
                }
                return $q.reject(rejection);
            }
        };
    }
    ]);