angular.module('app.directives.navDirectives',[])
.directive('navDirectives', function() {
    return {
        restrict : 'A',
        // A untuk membaca Attribute html
        // E untuk membaca Element html
        // contoh
        // A "<div data-nav-directive>"
        // E "<navdirective>"
        scope : {
            data : "="
        },
        transclude : true,
        templateUrl : "templates/directives/submenu.html",
        controller : function($scope){ 
            // console.log($scope.data);
        }
    }
});