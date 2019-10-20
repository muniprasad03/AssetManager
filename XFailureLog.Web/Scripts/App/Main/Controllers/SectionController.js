appRoot.factory("SectionService", ['$resource', '$q', function ($resource, $q) {

    sectionServices = {
        section: $resource('api/section/:action/:id', {}, { update: { method: 'PUT' }, drop: { method: 'DELETE' } }),

        getSections: function () {
            var sections = [];
            return this.section.query({ action: 'getSections' }).$promise.then(function (sections) {
                return sections;
            });
        },

        getUsers: function() {
            var users = [];
            return this.section.query({action: 'getUsers'}).$promise.then(function (users) {
                return users;
            });
        },

        getSection: function (id) {
            return this.section.get({ Id: id }).$promise.then(function (data) {
                return data;
            });
        },

        deleteSection: function (id) {
            return this.section.drop({ id: id, action: '' }).$promise.then(function () {
                return true;
            }, function () {
                return false;
            });
        },

        saveSection: function (data) {
            return this.section.save({ action: 'saveSection' }, data).$promise.then(function (result) {
                return true;
            }, function () {
                return false;
            });
        },

        updateSection: function (data) {
            return this.section.update({ action: 'updateSection' }, data).$promise.then(function (result) {
                return true;
            }, function () {
                return false;
            });
        }
    };

    return sectionServices;
}]);

appRoot.controller('SectionController', [
    '$scope', '$state', '$stateParams', '$location', 'SectionService', 'AppSettings', 'NotificationService',
function ($scope, $state, $stateParams, $location, SectionService, AppSettings, NotificationService) {
    $scope.vm = {};


    $scope.getAll = function () {
        SectionService.getSections().then(function (sections) {
            $scope.vm.sections = sections;
        });
    };

    $scope.save = function () {
        if ($scope.departments.$valid) {
            SectionService.saveSection($scope.model).then(function (result) {
                if (result) {
                    $scope.showForm = false;
                    $scope.getAll();
                    NotificationService.information('Saved Successfully');
                }
                else {
                    NotificationService.information('An error was encountered while saving this Section.  Please try again.');
                }
            });
        }
        else {
            NotificationService.information('fill all required fields');
        }
    };

    $scope.delete = function (Department) {
        SectionService.deleteSection(Department.id).then(function (data) {
            if (data) {
                NotificationService.information('Deleted Successfully');
                $scope.getAll();
            }
            else {
                NotificationService.information('An error was encountered while deleting this section.  Please try again.');
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
            SectionService.updateSection($scope.model).then(function (result) {
                if (result) {
                    $scope.showUpdateButton = false;
                    $scope.showForm = false;
                    $scope.getAll();
                    NotificationService.information('Updated Successfully');
                }
                else {
                    NotificationService.information('An error was encountered while updating this Section.  Please try again.');
                }
            });
        }
        else {
            NotificationService.information('fill all required fields');
        }
    };

    $scope.vm.tableHeaders = [
{ name: 'name', title: 'Section Name', sortReverse: false }
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
        $scope.getAll();
    };

    init();
}
]);