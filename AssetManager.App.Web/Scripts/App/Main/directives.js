/*global event, setTimeout, navigator, clearTimeout, Blob, alert*/
/*jshint sub:true*/
/// <reference path="~/scripts/angular.js" />
/// <reference path="~/scripts/jquery-1.8.2.js" />
appRoot.directives = angular.module('xstore.directives', [])
    .directive('xstoreFileUpload', function () {
        return {
            restrict: 'E',
            replace: true,
            transclude: true,
            scope: {
                virtualContainer: '@',
                options: '=',
                uploadFile: '='
            },
            template: $('#picture-template')[0].innerHTML,
            controller: function ($scope) { },
            // The linking function will add behavior to the template
            link: function (scope, element, attrs) {
                $(document).bind('dragover', function (e) {
                    var dropZone = $('.dropzone'),
                        foundDropzone,
                        timeout = window.dropZoneTimeout;
                    if (!timeout) {
                        dropZone.addClass('in');
                    } else {
                        clearTimeout(timeout);
                    }
                    var found = false,
                        node = e.target;

                    do {

                        if ($(node).hasClass('dropzone')) {
                            found = true;
                            foundDropzone = $(node);
                            break;
                        }

                        node = node.parentNode;

                    } while (node);

                    dropZone.removeClass('in hover');

                    if (found) {
                        foundDropzone.addClass('hover');
                    }

                    window.dropZoneTimeout = setTimeout(function () {
                        window.dropZoneTimeout = null;
                        dropZone.removeClass('in hover');
                    }, 100);
                });
                $(document).bind('drop dragover', function (e) {
                    e.preventDefault();
                });
                element.find('#fileupload').fileupload({
                    dataType: 'json',
                    maxFileSize: scope.options.maxFileSize ? scope.options.maxFileSize : 500000,
                    maxNumberOfFiles: scope.options.maxNumberOfFiles ? scope.options.maxNumberOfFiles : 1,
                    acceptFileTypes: scope.options.acceptFileTypes,
                    dropZone: $(".dropzone"),
                    url: scope.options.uploadTo + '/' + scope.virtualContainer,
                    add: function (e, data) {
                        var fileType = data.files[0].name.split('.').pop();
                        if (scope.options.allowedFileTypes && scope.options.allowedFileTypes.indexOf(fileType.toLowerCase()) < 0) {
                            alert('Invalid file type, aborted');
                            return false;
                        }
                        $('.loading').show();
                        scope.$apply();
                        data.submit();
                    },
                    done: function (e, data) {
                        $.each(data.result, function (index, file) {
                            file.size = (file.size / (1024 * 1024));
                            if (scope.options.maxNumberOfFiles == 1) {
                                scope.uploadFile[0] = file;
                            } else {
                                scope.uploadFile.push(file);
                            }
                            scope.$apply();
                        });
                        $('.loading').hide();
                    }
                });
            }
        };
    }).directive('xstoreSingleFileUpload', function () {
        return {
            restrict: 'E',
            replace: true,
            transclude: true,
            scope: {
                virtualContainer: '@',
                options: '=',
                uploadFile: '='
            },
            template: $('#picture-template')[0].innerHTML,
            controller: function ($scope) { },
            // The linking function will add behavior to the template
            link: function (scope, element, attrs) {
                element.find('#fileupload').fileupload({
                    dataType: 'json',
                    maxFileSize: scope.options.maxFileSize ? scope.options.maxFileSize : 500000,
                    maxNumberOfFiles: scope.options.maxNumberOfFiles ? scope.options.maxNumberOfFiles : 1,
                    acceptFileTypes: scope.options.acceptFileTypes,
                    dropZone: $(".dropzone"),
                    url: scope.options.uploadTo + '/' + scope.virtualContainer,
                    add: function (e, data) {
                        var fileType = data.files[0].name.split('.').pop();
                        if (scope.options.allowedFileTypes && scope.options.allowedFileTypes.indexOf(fileType.toLowerCase()) < 0) {
                            alert('Invalid file type, aborted');
                            return false;
                        }
                        $('.loading').show();
                        scope.$apply();
                        data.submit();
                    },
                    done: function (e, data) {
                        $.each(data.result, function (index, file) {
                            file.size = (file.size / (1204 * 1024));
                            scope.uploadFile = file;
                            scope.$apply();
                        });
                        $('.loading').hide();
                    }
                });
            }
        };
    }).directive('imgCropped', [
        '$rootScope', '$filter', function ($rootScope, $filter) {
            return {
                restrict: 'E',
                replace: true,
                scope: { source: '=source', selected: '&' },
                link: function (scope, element, attr) {
                    var myImg,
                        clear = function () {
                            if (myImg) {
                                myImg.next().remove();
                                myImg.remove();
                                myImg = undefined;
                            }
                        };
                    scope.$watch('source', function (newValue, oldValue) {
                        clear();
                        if (newValue) {
                            element.after('<img />');
                            myImg = element.next();
                            myImg.attr('src', $filter('storageAccountUrl')(newValue));
                            $(myImg).Jcrop({
                                bgFade: true,
                                bgOpacity: 0.2,
                                trackDocument: true,
                                keySupport: false,
                                boxWidth: 450,
                                onSelect: function (x) {
                                    scope.selected({ cords: x });
                                },
                                setSelect: [73, 340, 340, 73],
                                aspectRatio: 1
                            }, function () {
                                // Use the API to get the real image size  
                                var bounds = this.getBounds();
                                window.boundx = bounds[0];
                                window.boundy = bounds[1];
                            });
                        }
                    });
                    scope.$on('$destroy', clear);
                }
            };
        }
    ])
    .directive('xstorePostDataNotification', function () {
        return function (scope, element, attrs) {
            scope.$on('notificationBroadcast', function (event, args) {
                scope.notificationMessage = args.Message;
                $('.notification').miniNotification({ time: 3000 });
            });
        };
    })
    .directive('validationMessages', function () {
        return {
            scope: {
                modelController: '=',
                formSubmit: '='
            },
            restrict: 'EA',
            link: function (scope, elm, attrs) {
                if (!scope.modelController) {
                    console.log('Requires a html attribute data-model-controller. This should point to the input field model controller.');
                }
                scope.$watch('modelController.$error', function (newValue) {
                    if (newValue) {
                        scope.errorMessages = [];
                        angular.forEach(newValue, function (value, key) {
                            if (value && attrs[key + 'Error']) {
                                scope.errorMessages.push(attrs[key + 'Error']);
                            }
                        });
                    }
                }, true);
            },
            template: '<div><small class="error" ng-repeat="message in errorMessages" ng-show= "(!modelController.$pristine && $first) || formSubmit" class="warning">{{message}}</small></div>'
        };
    })
    .directive('ngUpdateOnBlur', function () {
        return {
            restrict: 'A',
            require: 'ngModel',
            priority: '100',
            link: function (scope, elm, attr, ngModelCtrl) {
                if (attr.type === 'radio' || attr.type === 'checkbox' || attr.type === 'select') {
                    return;
                }

                elm.unbind('input').unbind('keydown').unbind('change');
                elm.bind('blur', function () {
                    scope.$apply(function () {
                        ngModelCtrl.$setViewValue(elm.val());
                    });
                });
            }
        };
    })
    .directive('xstoreCustomValidator', [
        '$timeout', '$parse', function ($timeout, $parse) {
            return {
                restrict: 'A',
                require: 'ngModel',
                link: function (scope, elm, attr, ngModelCtrl) {
                    ngModelCtrl.$parsers.push(function (value) {
                        var fn = $parse(attr.validateFunction);
                        var result = fn(scope, { 'value': value });
                        if (result || result === false) {
                            if (result.then) {
                                result.then(function (data) { //For promise type result object
                                    ngModelCtrl.$setValidity(attr.appcrestCustomValidator, data);
                                }, function (error) {
                                    ngModelCtrl.$setValidity(attr.appcrestCustomValidator, false);
                                });
                            } else {
                                ngModelCtrl.$setValidity(attr.appcrestCustomValidator, result);
                                return result ? value : undefined; //For boolean result return based on boolean value
                            }
                        }
                        return value;
                    });
                }
            };
        }
    ])
    .directive('authorize', function (authService) {
        return {
            restrict: 'A',
            prioriry: 100000,
            scope: false,
            link: function () {
            },
            compile: function (element, attr, linker) {
                var accessDenied = true;
                authService.getUser(function (employeeRole) {
                    var user = {};

                    user.role = employeeRole.name == "hradmin" ? "hradmin" : "employee";
                    var attributes = attr.roles.split(",");
                    for (var i in attributes) {
                        if (user.role == attributes[i]) {
                            accessDenied = false;
                        }
                    }
                    if (accessDenied) {
                        element.children().remove();
                        element.remove();
                    }
                });


            }
        };
    })
    .directive('uploadAFile', [
        '$timeout', 'NotificationService', function ($timeout, NotificationService) {
            return {
                restrict: 'A',
                templateUrl: 'fileupload',
                transclude: true,
                scope: {
                    url: '@',
                    fileTypes: '@',
                    maxFileSize: '@',
                    viewModel: '=',
                    onFileUploaded: '&'
                },
                link: function (scope, element, attrs) {
                    $timeout(function () {
                        $('.file-upload').fileupload({
                            dataType: 'json',
                            acceptFileTypes: scope.fileTypes,
                            maxFileSize: scope.maxFileSize,
                            maxNumberOfFiles: 1,
                            add: function (e, data) {
                                var fileType = data.files[0].name.split('.').pop();
                                if (scope.fileTypes && scope.fileTypes.indexOf(fileType) < 0) {
                                    alert('Invalid file type, aborted');
                                    return false;
                                }
                                $('.loading').show();
                                scope.$apply();
                                data.submit();
                            },
                            done: function (e, data) {
                                scope.onFileUploaded({ fileProperties: data.result });
                                $('.loading').hide();
                            },
                            fail: function (e, error) {
                                $('.loading').hide();
                                NotificationService.error("Oops.. failed to upload. please check the file format.");
                                scope.$apply();
                            }
                        });
                    }, 1000);
                    scope.uploadFile = function () {
                        $timeout(function () {
                            element.find(".file-upload").trigger('click');
                        }, 100);
                    };
                }
            };
        }
    ])
     .directive('fileUpload', function () {
         return {
             restrict: 'E',
             template: '<div ng-transclude ng-model="__userFiles"></div>',
             replace: true,
             transclude: true,
             scope: {
                 __userFiles: '=ngModel'
             },
             link: function (scope, el, attr) {
                 var fileName,
                     uri;

                 fileName = attr.name || 'userFile';

                 el.append('<input style="display: none !important;" type="file" ' + (attr.multiple == 'true' ? 'multiple' : '') + ' accept="' + (attr.accept ? attr.accept : '') + '" name="' + fileName + '"/>');
                 uri = attr.uri || '/upload/upload';

                 function uploadFile(file, uri, index) {
                     var xhr = new XMLHttpRequest(),
                         fd = new FormData(),
                         progress = 0;

                     xhr.open('POST', uri, true);
                     xhr.onreadystatechange = function () {
                         scope.__userFiles[index].status = {
                             code: xhr.status,
                             statusText: xhr.statusText,
                             response: xhr.response
                         };
                         scope.$apply();
                     };
                     xhr.upload.addEventListener("progress", function (e) {
                         progress = parseInt(e.loaded / e.total * 100);
                         scope.__userFiles[index].percent = progress;
                         scope.$apply();
                     }, false);
                     fd.append(fileName, file);
                     xhr.send(fd);
                     return {
                         name: file.name,
                         size: file.size,
                         type: file.type,
                         status: {},
                         percent: 0
                     }
                 }

                 el.bind('click', function () {
                     scope.$eval(el.find('input')[0].click());
                 });

                 angular.element(el.find('input')[0]).bind('change', function (e) {
                     var files = e.srcElement.files || e.dataTransfer.files;
                     var list = [];
                     for (var i = 0, f; f = files[i]; i++) {
                         list.push(uploadFile(f, uri, i));
                     }

                     e.srcElement.files = [];
                     e.srcElement.value = '';

                     scope.__userFiles = list;
                     scope.$apply();
                 })
             }
         }
     })

    .directive('breadcrumbs', [
        '$log', '$parse', '$interpolate', function ($log, $parse) {
            return {
                restrict: 'EA',
                replace: false,
                scope: {
                    itemDisplayNameResolver: '&'
                },
                templateUrl: 'breadcrumb',
                controller: [
                    '$scope', '$state', '$stateParams', function ($scope, $state, $stateParams) {

                        var defaultResolver = function (state) {
                            var displayName = state.title;
                            return displayName;
                        };

                        var isCurrent = function (state) {
                            return $state.$current.name === state.name;
                        };

                        var setNavigationState = function () {
                            $scope.$navigationState = {
                                currentState: $state.$current,
                                params: $stateParams,
                                getDisplayName: function (state) {
                                    if ($scope.hasCustomResolver) {
                                        return $scope.itemDisplayNameResolver({
                                            defaultResolver: defaultResolver,
                                            state: state,
                                            isCurrent: isCurrent(state)
                                        });
                                    } else {
                                        return defaultResolver(state);
                                    }
                                },
                                isCurrent: function (state) {
                                    return isCurrent(state);
                                }
                            };
                        };

                        $scope.$on('$stateChangeSuccess', function () {
                            setNavigationState();
                        });

                        setNavigationState();
                    }
                ],
                link: function (scope, element, attrs, controller) {
                    scope.hasCustomResolver = angular.isDefined(attrs.itemDisplayNameResolver);
                }
            };
        }
    ])
    .directive('profilePicturePreview', [
        'Utils', '$filter', function (Utils, $filter) {
            return {
                restrict: 'A',
                scope: {
                    model: '=model'
                },
                link: function (scope, element, attrs) {
                    scope.$watch('model', function (newVal, oldVal) {
                        if (newVal && newVal.width) {
                            var imageUrl = $filter('storageAccountUrl')(attrs.profilePicturePreview + "/" + newVal.imageUrl);
                            Utils.isImage(imageUrl).then(function (result) {
                                if (result) {
                                    angular.element(element).attr("src", imageUrl);
                                } else {
                                    var rx = $(element).parent().width() / scope.model.width,
                                        ry = $(element).parent().height() / scope.model.height;

                                    $(element).css({
                                        width: Math.round(rx * scope.model.originalWidth) + 'px',
                                        height: Math.round(ry * scope.model.originalHeight) + 'px',
                                        marginLeft: '-' + Math.round(rx * scope.model.marginLeft) + 'px',
                                        marginTop: '-' + Math.round(ry * scope.model.marginTop) + 'px',
                                        maxWidth: 'none'
                                    });
                                }
                            });
                        }
                    });
                }
            };
        }
    ])
    .directive('timesheetContenteditable', [
        '$timeout', '$filter', function ($timeout, $filter) {
            return {
                restrict: 'A', // only activate on element attribute
                require: '?ngModel', // get a hold of NgModelController
                link: function (scope, element, attrs, ngModel) {
                    if (!ngModel) {
                        return;
                    } // do nothing if no ng-model
                    // Listen for change events to enable binding
                    element.on('blur', function () {
                        scope.$apply(read);
                        element.parent().removeClass("entry-active");
                        //$("#timesheetCommentEntry").hide();
                    });

                    element.on('focus', function () {
                        element.parent().addClass("entry-active");
                        $timeout(function () {
                            var selection = window.getSelection();
                            var range = document.createRange();
                            range.selectNodeContents(element[0]);
                            selection.removeAllRanges();
                            selection.addRange(range);
                        }, 0);
                    });

                    element.keydown(function (e) {
                        // Allow: backspace, delete, tab, escape, . , :, left arrow, right arrow
                        if ($.inArray(e.keyCode, [8, 46, 9, 27, 110, 190, 186, 37, 39]) != -1 ||
                            // Allow: Ctrl+A
                            (e.keyCode == 65 && e.ctrlKey === true)) {
                            // let it happen, don't do anything
                            return;
                        }
                        // Ensure that it is a number and stop the keypress
                        if ((e.shiftKey || (e.keyCode < 48 || e.keyCode > 57)) && (e.keyCode < 96 || e.keyCode > 105)) {
                            e.preventDefault();
                        }
                    });

                    // Write data to the model
                    function read() {
                        var html = element.html().trim();
                        if ((html && html != "") || (html == "" && ngModel.$viewValue >= 0)) {
                            var timeInHHMM = $filter('timeFormatter')(html, 'hhmm');
                            var timeInDecimal = $filter('timeFormatter')(html, 'decimal');
                            element.html(timeInHHMM != null ? timeInHHMM : "0:00");
                            if (timeInDecimal < 24 && ngModel.$viewValue != timeInDecimal) {
                                ngModel.$setViewValue(timeInDecimal);
                            } else if (timeInDecimal >= 24 && ngModel.$viewValue != timeInDecimal) {
                                element.html("0:00");
                                ngModel.$setViewValue(0);
                            }
                        }
                    }
                }
            };
        }
    ])
    .directive('xstoreContenteditable', [
        '$timeout', '$filter', function ($timeout, $filter) {
            return {
                restrict: 'A', // only activate on element attribute
                require: '?ngModel', // get a hold of NgModelController
                link: function (scope, element, attrs, ngModel) {
                    if (!ngModel) {
                        return;
                    } // do nothing if no ng-model
                    // Specify how UI should be updated
                    ngModel.$render = function () {
                        element.html(ngModel.$viewValue || '');
                    };
                    // Listen for change events to enable binding
                    element.on('blur', function () {
                        scope.$apply(read);
                    });

                    element.on('focus', function () {
                        $timeout(function () {
                            var selection = window.getSelection();
                            var range = document.createRange();
                            range.selectNodeContents(element[0]);
                            selection.removeAllRanges();
                            selection.addRange(range);
                        }, 0);
                    });

                    // Write data to the model
                    function read() {
                        var html = element.html();
                        if (html) {
                            element.html(html);
                            ngModel.$setViewValue(html);
                        } else if (html == "") {
                            element.html(null);
                            ngModel.$setViewValue(null);
                        }
                    }

                }
            };
        }
    ])
.directive('timesheetComment', [
'$timeout', function ($timeout) {
    return {
        restrict: 'A',
        scope: {
            submitted: '=',
        },
        link: function (scope, element, attrs) {
            var activeTaskIndex = null;
            var activeWeekDayKey = null;

            //scope.$on('activeTimesheetEntryChanged', function (evt, args) {
            //        if (activeTaskIndex == args.taskId && activeWeekDayKey == args.weekDayKey) {
            //            $("#timesheetCommentEntry").toggleClass("comment-window-display");
            //        } else {
            //            $("#timesheetCommentEntry").addClass("comment-window-display");
            //            activeTaskIndex = args.taskId;
            //            activeWeekDayKey = args.weekDayKey;
            //        }

            //    });

            element.on('click', function (event) {
                if (!scope.submitted) {
                    event.stopPropagation();
                    if ($(element).parent('.timesheet-entry-block')) {
                        $("#timesheetCommentEntry").css({
                            "top": $(element).parent('.timesheet-entry-block').position().top + $(element).parent('.timesheet-entry-block').outerHeight() - 220,
                            "left": $(element).parent().position().left + ($(element).parent().width()) / 2 - 100,
                            "display": "block"
                        });
                        $("#timesheetCommentEntry p").attr("tabindex", element.attr("tabindex"));
                    }
                }
            });

            element.on('focus', function (event) {
                if (!scope.submitted) {
                    event.stopPropagation();
                    if ($(element).parent('.timesheet-entry-block')) {
                        $("#timesheetCommentEntry").css({
                            "top": $(element).parent('.timesheet-entry-block').position().top + $(element).parent('.timesheet-entry-block').outerHeight() - 220,
                            "left": $(element).parent().position().left + ($(element).parent().width()) / 2 - 100,
                            "display": "block"
                        });
                        $("#timesheetCommentEntry p").attr("tabindex", element.attr("tabindex"));
                    }
                }
            });

            $(".timesheet-comment p").on('blur', function () {
                $("#timesheetCommentEntry").hide();
            });

            $('.timesheet-comment p').on('click', function (event) {
                event.stopPropagation();
            });
            $('body').on('click', function () {
                $("#timesheetCommentEntry").hide();
            });
        }
    };
}

])
    .directive('dateOnly', function () {
        return {
            restrict: 'A',
            require: 'ngModel',
            link: function (scope, elm, attr, ngModelCtrl) {
                ngModelCtrl.$parsers.push(function (value) {
                    // Changing for dates time part so that it is ignored 
                    if (value instanceof Date) {
                        value.setHours(23);
                        value.setMinutes(59);
                        value.setSeconds(59);
                        return value;
                    }
                    return value;

                });
            }
        };
    })
    .directive('xstoreGridResize', [
        '$timeout', function ($timeout) {
            return {
                restrict: 'A',
                link: function (scope, element, attrs) {
                    function setGridHeight() {
                        element.height($(window).height() - (element.offset().top + 45));
                    }

                    $(window).resize(function () {
                        setGridHeight();
                    });

                    setGridHeight();
                }
            };
        }
    ])
    .directive('xstoreGridScroll', [
        '$timeout', function ($timeout) {
            return {
                restrict: 'A',
                link: function (scope, element, attrs) {
                    $timeout(function () {
                        element.find('.ui-grid-render-container-body .ui-grid-viewport').niceScroll({ autohidemode: false, background: 'rgb(206,208,211)', cursorwidth: "10px" });
                    }, 0);

                    //element.find('.ui-grid-viewport').mouseover(function () {
                    //    element.find('.ui-grid-render-container-body .ui-grid-viewport').getNiceScroll().resize();
                    //});
                }
            };
        }

    ]).directive('xstoreGridMonitor', [
        '$timeout', function ($timeout) {
            return {
                require: 'uiGrid',
                scope: false,
                link: function ($scope, $elm, $attrs, uiGridCtrl) {
                    var timeOutId;
                    function startTimeout() {
                        clearTimeout(timeOutId);

                        timeOutId = setTimeout(function () {
                            uiGridCtrl.grid.gridHeight = (uiGridCtrl.grid.options.rowHeight * uiGridCtrl.grid.rows.length) + $($elm.find('.ui-grid-header')[0]).outerHeight() + 1;
                            uiGridCtrl.grid.refresh();
                            //after all start timeout again
                            startTimeout();
                        }, 250);
                    }

                    startTimeout();

                    $elm.on('$destroy', function () {
                        clearTimeout(timeOutId);
                    });
                }
            }
        }

    ]).directive('xstoreGridFlexHeight', [
        '$timeout', function ($timeout) {
            return {
                restrict: 'A',
                require: 'uiGrid',
                scope: false,
                link: function ($scope, $elm, $attrs, uiGridCtrl) {
                    var timeOutId;

                    var flexBaseOffset = (!isNaN(parseFloat($attrs.flexBaseOffset)) && isFinite($attrs.flexBaseOffset)) ? parseInt($attrs.flexBaseOffset) : 45;
                    var thresholdRows = parseInt($attrs.xhrGridFlexHeight);

                    function updateGridHeight(newHeight) {
                        if ($elm.height() != newHeight) {
                            uiGridCtrl.grid.api.core.raise.gridDimensionChanged($elm.height(), $elm.width(), newHeight, $elm.width())
                            $elm.height(uiGridCtrl.grid.gridHeight = newHeight);
                            uiGridCtrl.grid.queueGridRefresh();
                        }
                    };

                    function setFlexHeight(rowHeight, headerFooterHeight, totalRows) {
                        //if threshold rows provided then set height based on no.of rows to show
                        if (thresholdRows) {
                            var visibleRows = uiGridCtrl.grid.getVisibleRowCount();
                            updateGridHeight((uiGridCtrl.grid.options.rowHeight * (visibleRows < thresholdRows ? visibleRows : thresholdRows) + headerFooterHeight));
                        }

                        else {
                            var offsetHeight = $(window).height() - ($elm.offset().top + flexBaseOffset);
                            var maxHeight = (rowHeight * totalRows) + headerFooterHeight;

                            if (maxHeight > offsetHeight) {
                                updateGridHeight(offsetHeight);
                            }
                            else {
                                updateGridHeight(maxHeight);
                            }
                        }
                    }

                    function startTimeout() {
                        clearTimeout(timeOutId);

                        timeOutId = setTimeout(function () {
                            var headerFooterHeight = $($elm.find('.ui-grid-header')[0]).outerHeight() + 1 + ($($elm.find('.ui-grid-pager-panel')[0]).outerHeight() || 0)
                            var footerInfoHeight = ($($elm.find('.ui-grid-footer-info')[0]).outerHeight() || 0) + 1 + ($($elm.find('.ui-grid-footer-panel')[0]).outerHeight() || 0);

                            headerFooterHeight += footerInfoHeight;

                            setFlexHeight(uiGridCtrl.grid.options.rowHeight, headerFooterHeight, uiGridCtrl.grid.rows.length);
                            //after operations start timeout again.
                            startTimeout();
                        }, 100);
                    }

                    startTimeout();

                    $elm.on('$destroy', function () {
                        clearTimeout(timeOutId);
                    });
                }
            }
        }
    ]).directive('xstoreElementHeight', function () {
        return {
            restrict: 'A',
            link: function (scope, element, attrs) {
                function setEelementHeight() {
                    element.height($(window).height() - (element.offset().top));
                }

                $(window).resize(function () {
                    setEelementHeight();
                });

                setEelementHeight();
            }
        };
    })
    .directive('ngCsv', [
        '$parse', '$q', 'CSV', '$document', '$timeout', function ($parse, $q, CSV, $document, $timeout) {
            return {
                restrict: 'AC',
                scope: {
                    data: '&ngCsv',
                    filename: '@filename',
                    header: '&csvHeader',
                    txtDelim: '@textDelimiter',
                    quoteStrings: '@quoteStrings',
                    fieldSep: '@fieldSeparator',
                    lazyLoad: '@lazyLoad',
                    ngClick: '&'
                },
                controller: [
                    '$scope',
                    '$element',
                    '$attrs',
                    '$transclude',
                    function ($scope, $element, $attrs, $transclude) {
                        $scope.csv = '';

                        if (!angular.isDefined($scope.lazyLoad) || $scope.lazyLoad != "true") {
                            if (angular.isArray($scope.data)) {
                                $scope.$watch("data", function (newValue) {
                                    $scope.buildCSV();
                                }, true);
                            }
                        }

                        $scope.getFilename = function () {
                            return $scope.filename || 'download.csv';
                        };

                        function getBuildCsvOptions() {
                            var options = {
                                txtDelim: $scope.txtDelim ? $scope.txtDelim : '"',
                                quoteStrings: $scope.quoteStrings
                            };
                            if (angular.isDefined($attrs.csvHeader)) {
                                options.header = $scope.$eval($scope.header);
                            }
                            options.fieldSep = $scope.fieldSep ? $scope.fieldSep : ",";

                            return options;
                        }

                        /**
                   * Creates the CSV and updates the scope
                   * @returns {*}
                   */
                        $scope.buildCSV = function () {
                            var deferred = $q.defer();

                            CSV.stringify($scope.data(), getBuildCsvOptions()).then(function (csv) {
                                $scope.csv = csv;
                                deferred.resolve(csv);
                            });
                            $scope.$apply(); // Old angular support

                            return deferred.promise;
                        };
                    }
                ],
                link: function (scope, element, attrs) {
                    function doClick() {
                        if (window.navigator.msSaveOrOpenBlob) {
                            var blob = new Blob([scope.csv], {
                                type: "text/csv;charset=utf-8;"
                            });
                            navigator.msSaveBlob(blob, scope.getFilename());
                        } else {

                            var downloadLink = angular.element('<a></a>');
                            downloadLink.attr('href', scope.csv);
                            downloadLink.attr('download', scope.getFilename());

                            $document.find('body').append(downloadLink);
                            $timeout(function () {
                                downloadLink[0].click();
                                downloadLink.remove();
                            }, null);
                        }

                    }

                    element.bind('click', function (e) {
                        scope.buildCSV().then(function (csv) {
                            doClick();
                        });
                        scope.$apply();
                    });
                }
            };
        }
    ])
    .directive('xstoreDefaultPagingSearch', [
        '$filter', function ($filter) { // Implements default filtering, paging. Cannot be used with server side paging.
            return {
                restrict: 'A',
                scope: {
                    source: '=', // Represents all records. Filtering is done on this
                    gridSource: '=', // Represents page\filtered subset of records. Should be the source to which ng-grid binds
                    gridOptions: '=', // ng-grid options to watch;
                    filter: '=' // custom filter used with `filter` filter. Should be a object. 

                },
                link: function (scope, element, attrs) {
                    scope.$watch('source', function (newVal, oldVal) { // Fires when data is assigned first time
                        if (newVal && newVal !== oldVal) {
                            setGridData(getPagedData(scope.source, scope.gridOptions.pagingOptions.pageSize, scope.gridOptions.pagingOptions.currentPage, scope.gridOptions.filterOptions.filterText, scope.filter));
                        }
                    });

                    scope.$watch('gridOptions.pagingOptions', function (newVal, oldVal) { //Page changes, size changes
                        if (newVal !== oldVal) {
                            setGridData(getPagedData(scope.source, scope.gridOptions.pagingOptions.pageSize, scope.gridOptions.pagingOptions.currentPage, scope.gridOptions.filterOptions.filterText, scope.filter));
                        }
                    }, true);

                    scope.$watch('gridOptions.filterOptions', function (newVal, oldVal) { // String filter changes
                        if (newVal !== oldVal) {
                            setGridData(getPagedData(scope.source, scope.gridOptions.pagingOptions.pageSize, scope.gridOptions.pagingOptions.currentPage, scope.gridOptions.filterOptions.filterText, scope.filter));
                        }
                    }, true);

                    scope.$watch('filter', function (newVal, oldVal) { //custom search filter is upated
                        if (newVal !== oldVal) {
                            setGridData(getPagedData(scope.source, scope.gridOptions.pagingOptions.pageSize, scope.gridOptions.pagingOptions.currentPage, scope.gridOptions.filterOptions.filterText, scope.filter));
                        }
                    }, true);

                    var getPagedData = function (allRecords, pageSize, page, searchText, filter) {
                        var applyFilter = filter || {};
                        var data = $filter('filter')(allRecords, angular.extend({}, filter, { $: searchText }));
                        return {
                            page: data.slice((page - 1) * pageSize, page * pageSize),
                            totalPages: data.length % pageSize === 0 ? data.length / pageSize : (Math.floor(data.length / pageSize) + 1)
                        };
                    };

                    var setGridData = function (pagedData) {
                        scope.gridSource.length = 0;
                        angular.forEach(pagedData.page, function (item) {
                            scope.gridSource.push(item);
                        });
                        scope.gridOptions.totalPages = pagedData.totalPages;
                    };
                }
            };
        }
    ])
    .directive('ngEnter', function () {
        return function (scope, element, attrs) {
            element.bind("keydown keypress", function (event) {
                if (event.which === 13) {
                    scope.$apply(function () {
                        scope.$eval(attrs.ngEnter);
                    });

                    event.preventDefault();
                }
            });
        };
    })
    .directive('xstoreInputFocus', [
        '$rootScope', '$timeout', function ($rootScope, $timeout) {
            return {
                restrict: 'A',
                scope: {
                    show: '=show'
                },
                link: function (scope, element, attrs) {
                    scope.$watch('show', function (value) {
                        if (value) {
                            $timeout(function () {
                                element[0].focus();
                            });
                        }
                    });

                    $('body').on("mousedown", function (e) {
                        if (scope.show) {
                            scope.show = false;
                            scope.$apply();
                        }
                    });

                    $rootScope.$on('$routeChangeSuccess', function (next, current) {
                        scope.show = false;
                    });

                    $('body').on('mousedown', '.expand', function (e) {
                        e.stopPropagation();
                    });
                }
            };
        }
    ]).directive("tinymceConfiguration", ['$timeout', function ($timeout) {
        return {
            restrict: 'A',
            scope: {
                model: '=',
                text: '='
            },
            link: function (scope, element, attr) {
                var tinyInstance;
                scope.elementId = "editor-" + Math.random().toString().substring(2, 6);
                element.attr("id", scope.elementId);
                scope.plugins = attr.plugins || "link image code textcolor preview table paste";
                scope.toolbar = attr.toolbar || "bold italic | underline | undo redo | alignleft aligncenter alignright alignjustify | bullist numlist link image | table | fontsizeselect ";
                scope.createEditor = function () {
                    tinyMCE.baseURL = '/Scripts/tinymce';
                    tinymce.init({
                        selector: 'textarea',
                        remove_linebreaks: true,
                        paste_preprocess: function (pl, o) {
                            o.content = o.content.replace(/(<([^>]+)>)/ig, '');
                        },
                        statusbar: false,
                        menubar: false,
                        plugins: [scope.plugins],
                        toolbar: scope.toolbar,
                        file_browser_callback: function (field_name, url, type, win) {
                            var fileUrl = $('#imageupload').trigger("click");
                        },
                        content_css: 'Content/less/kb.less',
                        body_id: "tinymceEditor",
                        setup: function (editor) {
                            editor.on('load', function (e) {
                                $timeout(function () {
                                    if (tinymce.get(scope.elementId) && scope.model) {
                                        tinymce.get(scope.elementId).setContent(scope.model);
                                        scope.$apply();
                                    }
                                }, 0);
                            });
                            editor.on('blur', function (e) {
                                scope.model = tinymce.get(scope.elementId).getContent();
                                scope.text = tinymce.get(scope.elementId).getContent({ format: 'text' });
                                scope.$apply();
                            });
                        }
                    });
                };
                scope.createEditor();

                scope.$watch('model', function (newVal, oldVal) {
                    if (!tinyInstance) {
                        tinyInstance = tinymce.get(scope.elementId);
                    }
                    if (tinyInstance) {
                        tinyInstance.setContent(scope.model || '');
                    }
                    scope.text = tinymce.get(scope.elementId).getContent({ format: 'text' });
                });

                scope.$on('$destroy', function () {
                    if (!tinyInstance) { tinyInstance = tinymce.get(scope.elementId); }
                    if (tinyInstance) {
                        tinyInstance.remove();
                        tinyInstance = null;
                    }
                });
            }
        };
    }]).directive('ngIntroOptions', ['$timeout', function ($timeout) {
        return {
            restrict: 'A',
            link: function (scope, element, attrs) {
                scope[attrs.ngIntroMethod] = function (step) {
                    if (typeof (step) == "string") {
                        var intro = introJs(step);
                    }
                    else {
                        var intro = introJs();
                    }
                    intro.setOptions(scope.$eval(attrs.ngIntroOptions));
                    if (attrs.ngIntroOncomplete) {
                        intro.oncomplete(scope[attrs.ngIntroOncomplete]);
                    }
                    if (typeof (step) == "number") {
                        intro.goToStep(step).start();
                    }
                    else {
                        intro.start();
                    }
                };
                if (attrs.ngIntroAutostart == "true") {
                    scope[attrs.ngIntroMethod]();
                }
            }
        };
    }]).directive('xstoreComment', function () {
        return {
            restrict: 'A',
            scope: {
                xhrCommentType: '=',
                xhrCommentTypeId: '=',
                xhrCommentDisable: '=',
            },
            templateUrl: function (element, attrs) {
                if (attrs.xhrRequireParentComment == "false") {
                    return "engage/SimpleComments"
                }
                else {
                    return 'engage/Comment'
                }
            }
        };
    }).directive('tinymceImageUpload', ['$filter', function ($filter) {
        return {
            restrict: 'E',
            replace: true,
            transclude: true,
            scope: {
                virtualContainer: '@',
                options: '=',
                uploadFile: '='
            },
            template: $('#image-template')[0].innerHTML,
            controller: function ($scope) { },
            // The linking function will add behavior to the template
            link: function (scope, element, attrs) {
                element.find('#imageupload').fileupload({
                    dataType: 'json',
                    maxFileSize: scope.options.maxFileSize ? scope.options.maxFileSize : 500000,
                    maxNumberOfFiles: scope.options.maxNumberOfFiles ? scope.options.maxNumberOfFiles : 1,
                    acceptFileTypes: scope.options.acceptFileTypes,
                    url: scope.options.uploadTo + '/' + scope.virtualContainer,
                    add: function (e, data) {
                        var fileType = data.files[0].name.split('.').pop();
                        if (scope.options.allowedFileTypes && scope.options.allowedFileTypes.indexOf(fileType.toLowerCase()) < 0) {
                            alert('Invalid file type, aborted');
                            return false;
                        }
                        scope.$apply();
                        data.submit();
                    },
                    done: function (e, data) {
                        $.each(data.result, function (index, file) {
                            file.size = (file.size / (1204 * 1024));
                            scope.uploadFile.push(file);
                            scope.$apply();
                            $('.mce-textbox.mce-placeholder').val($filter('storageAccountUrl')(file.location));
                        });
                    }
                });
            }
        };
    }]).directive('attendanceColor', function () {
        return {
            restrict: 'A',
            scope: {
                scale: '=',
                timelist: '=',
                workedNextDay: '=',
                shift: '='
            },
            link: function (scope, element, attr) {
                //Hour caluclation for a given date.
                var getHours = function (dateTime) {
                    if (!dateTime) {
                        return null;
                    }
                    var time = new Date(dateTime);
                    return (time.getUTCHours() + (time.getUTCMinutes() / 60)).toFixed(1);
                };

                var getShiftHours = function (dateTime) {
                    var date = new Date(dateTime);
                    return (date.getHours() + (date.getMinutes() / 60)).toFixed(1);
                };

                var getShiftEndHours = function (shift) {
                    if (new Date(shift.startTime).getUTCHours() > new Date(shift.endTime).getUTCHours()) {

                    } else {
                        return getShiftHours(shift.endTime);
                    }

                };

                //get time to show in tool tip
                var getTimeForToolTip = function (val) {
                    var minutes = Math.floor(((val * 100) % 100) * 0.6);
                    var hours = Math.floor((val * 100) / 100);
                    if (hours >= 24) {
                        hours = hours - 24;
                    }
                    return (hours > 12 ? hours - 12 : hours) + ":" + (minutes < 10 ? "0" + minutes : minutes) + (hours >= 12 ? " PM" : " AM");
                };

                //To check if the 2 time stamp are in the same or different day.
                var isTimeStampIsInToday = function (previousDate, currentDatetime) {
                    if (previousDate) {
                        return previousDate.getUTCDate() !== currentDatetime.getUTCDate();
                    }
                    return false;
                };

                //style for bar to show the time of a employee in office
                var applyStyle = function (index, width, margin, color) {
                    var spanElement = angular.element("<span class='tick-bars" + index + "'/>")
                    element.append(spanElement);
                    $(element).find('.tick-bars' + index).css({
                        'background-color': '' + color + '',
                        'width': '' + width + '%',
                        'position': 'absolute',
                        'left': '15px',
                        'height': '12px',
                        'margin-left': '' + margin + '%',
                        'top': '3px'
                    });
                };

                if (scope.timelist.length > 0) {
                    var startHours = getShiftHours(scope.shift.startTime);
                    var endHours = getShiftHours(scope.shift.endTime);
                    endHours = parseFloat(startHours) < parseFloat(endHours) ? endHours : 24 + parseFloat(endHours);
                    var startWidth = (startHours - scope.scale) * 3;
                    var endWidth = (endHours - scope.scale) * 3;
                    $('.start-shift-time').css("margin-left", '' + startWidth + '%');
                    $('.end-shift-time').css("margin-left", '' + endWidth + '%');
                    var isCheckedIn = true;
                    var isOnBreak = false;
                    var currentTime = scope.scale;
                    var previousDate = null;
                    var width = 0;
                    var margin = 0;
                    var logList = angular.fromJson(scope.timelist);
                    logList.forEach(function (log, index) {
                        //IE9 and below compatability check
                        if ((String.prototype.endsWith && !log.TimeStamp.endsWith('Z')) || log.TimeStamp[log.TimeStamp.length - 1] != 'Z') {
                            log.TimeStamp += 'Z';
                        }
                        margin = (currentTime - scope.scale) * 3;
                        width = (getHours(log.TimeStamp) - currentTime) * 3;
                        if (isTimeStampIsInToday(previousDate, new Date(log.TimeStamp))) {
                            width = (24 + (getHours(log.TimeStamp) - currentTime)) * 3;
                        }
                        if (margin < 0) {
                            margin += 3 * 24;
                        }
                        previousDate = new Date(log.TimeStamp);
                        currentTime = getHours(log.TimeStamp);
                        if (log.Status == 0 && logList.length != 1) {
                            if (isOnBreak) {
                                applyStyle(index, width, margin, "#B7DDF4");
                            }
                        }
                        else {
                            if (index == 0 && logList.length == 1) {
                                margin = width;
                                width = 0.75;
                            }
                            applyStyle(index, width, margin, "#30ABF2");
                            isOnBreak = true;
                        }
                        if (scope.workedNextDay && index == logList.length - 1) {
                            margin += width;
                            width = 60 - margin;
                            applyStyle(index + 1, width, margin, "#30ABF2");
                        }
                    });
                }

                $(element).on('mouseover', function (e) {
                    $(element).attr('title', getTimeForToolTip(((e.pageX - $(this).offset().left - 15) / (($(".time-ticks:even").width() + $(".time-ticks:odd").width()) / 2) + scope.scale).toFixed(2)));
                });
            }
        };
    }).directive('circleImageGenerator', ['$filter', function ($filter) {
        return {
            restrict: 'A',
            scope: {
                firstName: '=',
                lastName: '=',
                index: '='
            },
            controller: ['$scope', function ($scope) {
                $scope.vm = {};
                $scope.vm.backgroundColors = ['#F4B400', '#33B679', '#E7711B', '#9E69AF', '#15A0CB'];
                $scope.getRandomColor = function (index) {
                    return $scope.vm.backgroundColors[index % $scope.vm.backgroundColors.length];
                };
            }],
            replace: true,
            template: '<div>' +
                '<div class="img-circle img-initials"  data-ng-style="{\'background-color\':getRandomColor(index)}">{{firstName | limitTo:1}}' +
                  '{{lastName | limitTo:1}}</div></div>',
        };
    }]).directive('onlyDigits', function () {

        return {
            restrict: 'A',
            require: '?ngModel',
            link: function (scope, element, attrs, modelCtrl) {
                modelCtrl.$parsers.push(function (inputValue) {
                    if (inputValue == undefined) return ''
                    var transformedInput = inputValue.replace(/[^0-9]/g, '');
                    if (transformedInput != inputValue) {
                        modelCtrl.$setViewValue(transformedInput);
                        modelCtrl.$render();
                    }
                    return transformedInput;
                });
            }

        };
    }).directive('xstoreNiceScroll', [function () {
        return {
            restrict: 'A',
            link: function (scope, element, attrs, ngModel) {
                element.niceScroll({ autohidemode: attrs.autoHide, background: 'rgb(206,208,211)', cursorwidth: "10px" });

                element.mouseover(function () {
                    element.getNiceScroll().resize();
                });
            }
        };
    }]).directive('xstoreAlterBanner', function () {
        return {
            restrict: 'A',
            link: function (scope, element) {
                var imageln = 17;//number of banner images
                var imageLocation = "/Content/images/banner/";//location of banners
                var imageLnk = imageLocation + (new Date().getDate() % imageln).toString() + '.jpg';
                element.css({
                    'background-image': 'url(' + imageLnk + ')'
                });
            }
        };
    }).directive('setFocus', function () {
        return {
            restrict: 'A',
            link: function (scope, element, attr) {
                scope.$watch(attr.setFocus, function (n, o) {
                    if (n != 0 && n) {
                        element[0].focus();
                    }
                });
            }
        };
    }).directive('convertToNumber', function () {
        return {
            require: 'ngModel',
            link: function (scope, element, attrs, ngModel) {
                ngModel.$parsers.push(function (val) {
                    return parseInt(val, 10);
                });
                ngModel.$formatters.push(function (val) {
                    return '' + val;
                });
            }
        };
    }).directive('ngPdf', ['$window', function ($window) {
        var backingScale = function (canvas) {
            var ctx = canvas.getContext('2d');
            var dpr = window.devicePixelRatio || 1;
            var bsr = ctx.webkitBackingStorePixelRatio ||
              ctx.mozBackingStorePixelRatio ||
              ctx.msBackingStorePixelRatio ||
              ctx.oBackingStorePixelRatio ||
              ctx.backingStorePixelRatio || 1;

            return dpr / bsr;
        };

        var setCanvasDimensions = function (canvas, w, h) {
            var ratio = backingScale(canvas);
            canvas.width = Math.floor(w * ratio);
            canvas.height = Math.floor(h * ratio);
            canvas.style.width = Math.floor(w) + 'px';
            canvas.style.height = Math.floor(h - 20) + 'px';
            canvas.getContext('2d').setTransform(ratio, 0, 0, ratio, 0, 0);
            return canvas;
        };
        return {
            restrict: 'E',
            templateUrl: function (element, attr) {
                return attr.templateUrl ? attr.templateUrl : "_PdfViewer.cshtml";
            },
            link: function (scope, element, attrs) {
                var url = scope.pdfUrl;
                var pdfDoc = null
                var pageNum = (attrs.page ? attrs.page : 1);
                var scale = attrs.scale > 0 ? attrs.scale : 1;
                var canvas = (attrs.canvasid ? document.getElementById(attrs.canvasid) : document.getElementById('pdf-canvas'));
                var ctx = canvas.getContext('2d');
                var windowEl = angular.element($window);

                windowEl.on('scroll', function () {
                    scope.$apply(function () {
                        scope.scroll = windowEl[0].scrollY;
                    });
                });

                PDFJS.disableWorker = true;
                scope.pageNum = pageNum;

                scope.renderPage = function (num) {
                    pdfDoc.getPage(num).then(function (page) {
                        var viewport;
                        var pageWidthScale;
                        var pageHeightScale;
                        var renderContext = {};
                        var pageRendering;

                        if (attrs.scale === 'page-fit' && !scale) {
                            viewport = page.getViewport(1);
                            pageWidthScale = element[0].clientWidth / viewport.width;
                            pageHeightScale = element[0].clientHeight / viewport.height;
                            scale = Math.min(pageWidthScale, pageHeightScale);
                        } else {
                            viewport = page.getViewport(scale)
                        }

                        setCanvasDimensions(canvas, viewport.width, viewport.height);

                        renderContext = {
                            canvasContext: ctx,
                            viewport: viewport
                        };

                        page.render(renderContext).promise.then(function () {
                            if (typeof scope.onPageRender === 'function') {
                                scope.onPageRender();
                            }
                        });
                    });
                };

                scope.goPrevious = function () {
                    if (scope.pageToDisplay <= 1) {
                        return;
                    }
                    scope.pageNum = parseInt(scope.pageNum) - 1;
                };

                scope.goNext = function () {
                    if (scope.pageToDisplay >= pdfDoc.numPages) {
                        return;
                    }
                    scope.pageNum = parseInt(scope.pageNum) + 1;
                };

                scope.zoomIn = function () {
                    scale = parseFloat(scale) + 0.2;
                    scope.renderPage(scope.pageToDisplay);
                    if (viewport) {
                        setCanvasDimensions(canvas, viewport.width, viewport.height);
                    }
                    return scale;
                };

                scope.zoomOut = function () {
                    scale = parseFloat(scale) - 0.2;
                    scope.renderPage(scope.pageToDisplay);
                    return scale;
                };

                scope.changePage = function () {
                    scope.renderPage(scope.pageToDisplay);
                };

                scope.rotate = function () {
                    if (canvas.getAttribute('class') === 'rotate0') {
                        canvas.setAttribute('class', 'rotate90');
                    } else if (canvas.getAttribute('class') === 'rotate90') {
                        canvas.setAttribute('class', 'rotate180');
                    } else if (canvas.getAttribute('class') === 'rotate180') {
                        canvas.setAttribute('class', 'rotate270');
                    } else {
                        canvas.setAttribute('class', 'rotate0');
                    }
                };

                function renderPDF() {
                    $('.loading').show();
                    if (url && url.length) {
                        PDFJS.getDocument(url, null, null, scope.onProgress).then(
                            function (_pdfDoc) {
                                if (typeof scope.onLoad === 'function') {
                                    scope.onLoad();
                                }

                                pdfDoc = _pdfDoc;
                                scope.renderPage(scope.pageToDisplay);

                                scope.$apply(function () {
                                    scope.pageCount = _pdfDoc.numPages;
                                    $('.loading').hide();
                                });
                            }, function (error) {
                                if (error) {
                                    if (typeof scope.onError === 'function') {
                                        scope.onError(error);
                                    }
                                }
                            }
                        );
                    }
                }

                scope.$watch('pageNum', function (newVal) {
                    scope.pageToDisplay = parseInt(newVal);
                    if (pdfDoc !== null) {
                        scope.renderPage(scope.pageToDisplay);
                    }
                });

                scope.$watch('pdfUrl', function (newVal) {
                    if (newVal !== '') {
                        console.log('pdfUrl value change detected: ', scope.pdfUrl);
                        url = newVal;
                        scope.pageToDisplay = 1;
                        renderPDF();
                    }
                });

            }
        };
    }
    ]).directive('setHeight', ['$window', function ($window) {
        return {
            link: function (scope, element, attrs) {
                var zoomNew = $window.document.documentElement.clientHeight / $window.innerHeight;
                console.log(zoomNew);
                element.css('min-height', $window.innerHeight - 64);
            }
        }
    }]).directive('toggleOnFocus', function () {
        return {
            link: function (scope, element, attrs) {
                var dropdown = $(element).find('.dropdown-toggle');

                element.on('focus', function (event) {
                    event.stopPropagation();
                    $(element).bind('keyup', 'keydown', function (e) {
                        $(dropdown).click();
                    });
                });

                element.on('keypress', function (event) {
                    $(dropdown).click();
                });
            }
        }
    }).directive('resize', ['$window', function ($window) {
        return function (scope, element, attr) {

            var window = angular.element($window);
            scope.$watch(function () {
                return {
                    'h': window.innerHeight(),
                    'w': window.innerWidth()
                };
            }, function (newValue, oldValue) {
                scope.windowHeight = newValue.h;
                scope.windowWidth = newValue.w;

                scope.resizeWithOffset = function (offsetH) {
                    var maxHeight,
                        leftNavH = $('#left-nav-body').height() + 100,
                    maxHeight = (newValue.h);

                    if (leftNavH >= newValue.h) {
                        maxHeight = leftNavH;
                    }

                    return {
                        'min-height': (maxHeight - offsetH) + 'px'
                    };
                };

            }, true);

            window.bind('resize', function () {
                scope.$apply();
            });
        }
    }]).directive('xstoreUiSlider', ['$filter', '$compile', '$rootScope', function ($filter, $compile, $rootScope) {
        return {
            restrict: 'A',
            require: 'ngModel',
            scope: {
                pip: '=pip',
                float: '=float',
                settings: '=xhrUiSlider',
                ngModel: '='
            },

            link: function (scope, element, attrs) {
                //todo: inject service to remove hardcodes.

                scope.float.formatLabel = function (val) {
                    return $filter('currency')(val * scope.settings.multiplier, '', 0);
                };

                scope.rangeClick = function (index) {
                    //return range and structure for click
                    setActiveSlab(index);
                    scope.$emit('structureSelected', { index: index });
                };

                element.on('slidechange', function (e, data) {
                    //update model for slide change
                    if (scope.noSlideChange) {
                        return;
                    }
                    updateSlabValues(data);
                    if (!scope.$$phase && !$rootScope.$$phase) {
                        scope.$apply();
                    }
                });

                element.on('slide.selectPip', function (e, data) {
                    resizeSlabs(data);
                });

                element.on('mousedown.selectPip', function (e) {
                    //callback for mouse down
                });

                element.on('slidechange slide', function (e, data) {
                    //callback for continious scroll
                    var amount = $filter('currency')(data.value * scope.settings.multiplier, '', 0);
                    $(data.handle).find(".ui-slider-tip").html(amount);
                });

                element.on('slide', function (event, ui) {
                    //detect overlapping of handles and stop
                    var handleIndex = ui.values.indexOf(ui.value);
                    curr = ui.values[handleIndex],
                    next = ui.values[handleIndex + 1] - 15,
                    prev = ui.values[handleIndex - 1] + 15;

                    if (curr > next || curr < prev) {
                        var mouseup = $.Event("mouseup", { which: 1 });
                        $(ui.handle).trigger(mouseup);
                        return false;
                    }
                });

                scope.$on('initSlider', function (event, data) {
                    scope.xhrSlider = element.slider(data)
                            .slider("pips", scope.pip)
                            .slider("float", scope.float);

                    initRangeSlabs();
                    updateSlabValues();
                    setActiveSlab(0);

                    //pass the range array to calc partitions
                    resizeSlabs(data);
                });

                scope.$on('setHandles', function (event, data) {
                    scope.noSlideChange = true;
                    for (var i = 0; i < data.values.length; i++) {
                        scope.xhrSlider.slider('values', i, data.values[i]);
                    }
                    updateSlabValues();
                    resizeSlabs(data);
                    scope.noSlideChange = false;
                });

                scope.$on('sliderLock', function (event, data) {
                    scope.xhrSlider.slider("option", "disabled", data);
                });

                function initRangeSlabs() {
                    if (element.find('.range-slab').length == 0) {
                        var count = scope.settings.values.length;
                        var collection = '';
                        for (var i = 0; i <= count; i++) {
                            collection += '<span class="range-slab" data-ng-click="rangeClick(' + i + ')">' + scope.settings.slabLables[i] + '</span>';
                        }

                        element.append($compile(collection)(scope));
                    };
                };

                function updateSlabValues(data) {
                    var slabs = [];
                    if (data) {
                        scope.settings.values = data.values;
                    };
                    for (var i = 0; i <= scope.settings.values.length; i++) {
                        slabs.push(getSlabRange(i));
                    };
                    scope.ngModel = slabs;
                };

                function getSlabRange(index) {
                    var min, max;

                    if (index == 0) {
                        min = 0;
                        max = scope.settings.values[index];
                    }
                    else if (index == scope.settings.values.length) {
                        min = scope.settings.values[index - 1];
                        max = scope.settings.max;
                    }
                    else {
                        min = scope.settings.values[index - 1];
                        max = scope.settings.values[index];
                    }
                    return {
                        structure: scope.settings.slabLables[index],
                        min: min,
                        max: max,
                        multiplier: scope.settings.multiplier
                    };
                };

                function convertDataToLeft(val) {
                    var max = scope.settings.max;
                    return ((val / max) * 100);
                };

                function convertToWidth(start, end) {
                    var max = scope.settings.max;
                    return ((Math.abs(end - start) / max) * 100);
                };

                function resizeSlabs(data) {
                    var slabs = element.find('.range-slab');
                    for (var i = 0; i < slabs.length; i++) {

                        if (i == 0) {
                            var left = 0;
                            var width = convertToWidth(0, data.values[i]);
                        }

                        else if (i == slabs.length) {
                            var left = convertDataToLeft(data.values[i - 1]);
                            var width = convertToWidth(data.values[i - 1], scope.settings.max);
                        }

                        else {
                            var left = convertDataToLeft(data.values[i - 1]);
                            var width = convertToWidth(data.values[i - 1], (data.values[i] || scope.settings.max));
                        }
                        setSlabDimensions(slabs[i], i, left, width);
                    }
                };

                function setSlabDimensions(slab, index, left, width) {
                    var _slab = $(slab);
                    _slab.css({ 'left': left + '%', 'width': width + '%' });
                };

                function setActiveSlab(index) {
                    var slabs = element.find('.range-slab');
                    if (scope.currentSlab) {
                        $(scope.currentSlab).removeClass('active-slab');
                    }
                    scope.currentSlab = slabs[index];
                    $(scope.currentSlab).addClass('active-slab');
                };
            }
        };
    }]).directive('xstoreSwitchBtn', function () {
        return {
            restrict: 'AE'
            , replace: true
            , transclude: true
            , template: function (element, attrs) {
                var model = attrs.toggle == 'true' ? ('!' + attrs.ngModel) : attrs.ngModel;
                var html = '';
                html += '<span';
                html += ' class="switch' + (attrs.class ? ' ' + attrs.class : '') + '"';
                html += attrs.ngModel ? ' ng-click="' + attrs.disabled + ' ? ' + attrs.ngModel + ' : ' + attrs.ngModel + '=!' + attrs.ngModel + (attrs.ngChange ? '; ' + attrs.ngChange + '()"' : '"') : '';
                html += ' ng-class="{ checked:' + model + ', disabled:' + attrs.disabled + ' }"';
                html += '>';
                html += '<small></small>';
                html += '<input type="checkbox"';
                html += attrs.id ? ' id="' + attrs.id + '"' : '';
                html += attrs.name ? ' name="' + attrs.name + '"' : '';
                html += attrs.ngModel ? ' ng-model="' + attrs.ngModel + '"' : '';
                html += ' style="display:none" />';
                html += '<span class="switch-text">'; /*adding new container for switch text*/
                html += attrs.on ? '<span class="on">' + attrs.on + '</span>' : ''; /*switch text on value set by user in directive html markup*/
                html += attrs.off ? '<span class="off">' + attrs.off + '</span>' : ' ';  /*switch text off value set by user in directive html markup*/
                html += '</span>';
                return html;
            }
        };
    }).directive('focusElement', function () {
        return {
            link: function (scope, element, attrs) {
                element.on('mousedown', function (event) {
                    event.stopPropagation();
                    element.parents().find('.focused').removeClass('focused');
                    element.addClass('focused');
                });
                element.parents().on('mousedown', function (event) {
                    element.removeClass('focused');
                });
            }
        }
    }).directive('itemsSortable', function () {
        return {
            restrict: 'A',
            scope: {
                sortItems: '&'
            },
            link: function (scope, element, attrs) {
                element.sortable({
                    items: attrs.sortableElement,
                    containment: attrs.containment,
                    start: function (event, ui) {
                    },
                    update: function (event, ui) {
                        var currentIndex = $(ui.item).attr('data-element-index'),
                            nextElementIndex = $(ui.item).next().attr('data-element-index'),
                            prevElementIndex = $(ui.item).prev().attr('data-element-index');
                        if (currentIndex && (nextElementIndex || prevElementIndex)) {
                            scope.sortItems({ item: { currentIndex: currentIndex, nextElementIndex: nextElementIndex, prevElementIndex: prevElementIndex } });
                        }
                    }
                });
            }
        };
    }).directive('itemsDroppable', function () {
        return {
            restrict: 'A',
            scope: {
                addNewField: '&'
            },
            link: function (scope, element, attr) {
                element.droppable({
                    accept: ".create-field-item",
                    drop: function (event, ui) {
                        scope.addNewField({ type: ui.draggable.attr("data-template-name") });
                    }
                });
            }
        };
    }).directive('itemsDraggable', function () {
        return function (scope, element, attrs) {
            element.draggable({
                helper: attrs.helper,
                revert: 'invalid',
                containment: attrs.containment,
                zIndex: 9999,
                drag: function (e, ui) {
                    var top = e.pageY - $(attrs.containment).offset().top;
                    if (top < 10) {
                        $(attrs.containment).scrollTop($(attrs.containment).scrollTop() - 15);
                    } else if (top > $(attrs.containment).height() - 10) {
                        $(attrs.containment).scrollTop($(attrs.containment).scrollTop() + 15);
                    }
                }
            });
        };
    }).directive('propertiesMenuCollapse', ['$timeout', function ($timeout) {
        return function (scope, element, attrs) {
            $('body').on('click', function () {;
                $(element).find(".in").collapse('hide');
            });
            $(element).find('.menu-content').on('click', function (e) {
                e.stopPropagation();
            });
            $(element).find('.menu-content').on('click', 'li', function (e) {
                $timeout(function () {
                    $(element).find(".in").collapse('hide');
                }, 0);
            });
        };
    }]).directive('xhrSwitchBtn', function () {
        return {
            restrict: 'AE'
            , replace: true
            , transclude: true
            , template: function (element, attrs) {
                var model = attrs.toggle == 'true' ? ('!' + attrs.ngModel) : attrs.ngModel;
                var html = '';
                html += '<span';
                html += ' class="switch' + (attrs.class ? ' ' + attrs.class : '') + '"';
                html += attrs.ngModel ? ' ng-click="' + attrs.disabled + ' ? ' + attrs.ngModel + ' : ' + attrs.ngModel + '=!' + attrs.ngModel + (attrs.ngChange ? '; ' + attrs.ngChange + '()"' : '"') : '';
                html += ' ng-class="{ checked:' + model + ', disabled:' + attrs.disabled + ' }"';
                html += '>';
                html += '<small></small>';
                html += '<input type="checkbox"';
                html += attrs.id ? ' id="' + attrs.id + '"' : '';
                html += attrs.name ? ' name="' + attrs.name + '"' : '';
                html += attrs.ngModel ? ' ng-model="' + attrs.ngModel + '"' : '';
                html += ' style="display:none" />';
                html += '<span class="switch-text">'; /*adding new container for switch text*/
                html += attrs.on ? '<span class="on">' + attrs.on + '</span>' : ''; /*switch text on value set by user in directive html markup*/
                html += attrs.off ? '<span class="off">' + attrs.off + '</span>' : ' ';  /*switch text off value set by user in directive html markup*/
                html += '</span>';
                return html;
            }
        };
    });
