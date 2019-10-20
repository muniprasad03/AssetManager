var appRoot = angular.module('xstore', ['xstore.directives', 'xstore.services', 'ngResource', 'ngRoute', 'ngSanitize', 'ui.grid', 'ui.grid.edit', 'ui.grid.cellNav', 'ui.grid.selection', 'ui.grid.autoResize', 'ui.grid.pagination', 'ui.grid.grouping', 'ui.grid.pinning', 'ui.grid.resizeColumns', 'ui.grid.moveColumns', 'nvd3', 'ui.router', 'ui.bootstrap', 'ui.select', 'LoadingServices', 'angular-nicescroll'])
    .config(['$routeProvider', '$urlRouterProvider', '$stateProvider', '$compileProvider', '$httpProvider', '$locationProvider',
        function ($routeProvider, $urlRouterProvider, $stateProvider, $compileProvider, $httpProvider, $locationProvider) {
            $locationProvider.hashPrefix('');
            $compileProvider.aHrefSanitizationWhitelist(/^\s*(https?|ftp|mailto|tel|file|skype):/);
            $urlRouterProvider.otherwise("/dashboard");
            $stateProvider
                //.state('materials', { url: '/materials', templateUrl: '/product', title: 'Materials' })
                //.state('categories', { url: '/categories', templateUrl: '/category', title: 'Categories' })
                //.state('stations', { url: '/stations', templateUrl: '/station', title: 'Stations' })
                //.state('reported', { url: '/reported', templateUrl: '/reported', title: 'Reported' })
                //.state('gearfault', { url: '/gearfaults', templateUrl: '/gearfault', title: 'Gear at Fault' })
                //.state('sections', { url: '/sections', templateUrl: '/section', title: 'Sections' })
                //.state('users', { url: '/users', templateUrl: '/user', title: 'Users' })
                //.state('sfrentry', { url: '/sfrentry', templateUrl: '/failure', title: 'SFR Entry' })
                //.state('reports', { url: '/reports', templateUrl: '/reports', title: 'Reports' })
                //.state('reports.failures', { url: '/failures?monthView&section&reported&gear&late', templateUrl: '/reports/failures', title: 'Report' })
                //.state('reports.causereport', { url: '/causereport', templateUrl: '/graphs/causereport', title: 'Report' })
                //.state('reports.loginreport', { url: '/loginreport', templateUrl: '/reports/logins', title: 'Report' })
                //.state('reports.summary', { url: '/summary?section&reported', templateUrl: '/graphs/gearSummary', title: 'Graphs' })
                //.state('graphs', { url: '/graphs', templateUrl: '/graphs', title: 'Graphs' })
                //.state('graphs.failures', { url: '/failures', templateUrl: '/graphs/Failures', title: 'Graphs' })
                //.state('graphs.compare', { url: '/compare', templateUrl: '/graphs/CompareStats', title: 'Graphs' })
                //.state('graphs.incidents', { url: '/incidents', templateUrl: '/graphs/SignalIncidents', title: 'Graphs' })
                //.state('graphs.costincidents', { url: '/costincidents', templateUrl: '/graphs/CostIncidents', title: 'Graphs' })
                //.state('graphs.sectionincidents', { url: '/sectionincidents', templateUrl: '/Reports/SectionIncidents', title: 'Graphs' })
                //.state('graphs.sectiongearincidents', { url: '/sectiongearincidents', templateUrl: '/reports/SectionGearIncidents', title: 'Graphs' })

                .state('dashboard', { url: '/dashboard', templateUrl: '/dashboard', title: 'Dashboard' })
                .state('blocks', { url: '/blocks', templateUrl: '/dashboard/addblock', title: 'Blocks' })
                //.state('signaltelecom', { url: '/signaltelecom', templateUrl: '/work', title: 'Points' })
                //.state('signaltelecom.pointer', { url: '/pointer', templateUrl: '/work/pointers', title: 'Point' })
                //.state('signaltelecom.track', { url: '/track', templateUrl: '/work/track', title: 'Track' })
                //.state('signaltelecom.signal', { url: '/signal', templateUrl: '/work/signal', title: 'Signal' })
                .state('about', { url: '/about', templateUrl: 'home/about', title: 'About' });
            var interceptor = ['$rootScope', '$q', function (scope, $q) {
                return {
                    request: function (config, $cookies) {
                        config.headers = config.headers || {};
                        config.headers['X-Requested-With'] = 'XMLHttpRequest';
                        return config;
                    },
                    'response': function success(response) {
                        return response;
                    },

                    'responseError': function error(response) {
                        var status = response.status;
                        switch (status) {
                            case 400:
                                // bad request
                                // window.location = "Content/400.html";
                                break;
                            case 401:
                                // Unauthorized
                                window.location = "account/login?ReturnUrl=%2f" + window.location.hash;
                                break;
                            case 403:
                                // Forbidden
                                window.location = "Content/403.html";
                                break;
                            default:
                            // page not found
                            // window.location = "Content/404.html";
                        }
                        // otherwise
                        return $q.reject(response);
                    }
                }

            }];
            $httpProvider.interceptors.push(interceptor);

        }

    ]);

appRoot.service("UserService", [
    '$resource', '$q', function ($resource, $q) {
        return {
            getUser: $resource("/api/user/getUser")
        }
    }]);

appRoot.controller('RootController', [
    '$scope', '$state', '$stateParams', '$location', 'UserService',
    function ($scope, $state, $stateParams, $location, UserService) {
        console.log('Instantiated RootController');
        $scope.vm = {};

        UserService.getUser().then(function (user) {
            $scope.vm.profile = user;
        }, function (error) {
            console.log(error);
        });

        $scope.$on('$stateChangeSuccess', function (event, toState, toParams, fromState, fromParams) {
            $scope.title = toState.title;
            $scope.vm.state = toState;
        });

        var init = function () {
        };

        init();
    }
]);