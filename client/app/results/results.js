angular.module('zeus.results', [])
.controller('ResultsController', function(Results, $stateParams) {
  // capture the value of `this` in a variable vm
  // vm stands for view model and is a replacement for $scope
  var ResultsVm = this;
  ResultsVm.results = [];
  ResultsVm.loaded = false;
  ResultsVm.search = $stateParams.search;
  //direct user to first page if none is specified in url
  var page = $stateParams.page || 1;
  Results.multiSearch(ResultsVm.search, page)
    .then(function(results) {
      ResultsVm.loaded = true;
      ResultsVm.results = results.data.results;
      //create array to use ng-repeat on for page numbers
      ResultsVm.totalPages = _.range(1, results.data.total_pages + 1);
      ResultsVm.totalResults = results.data.total_results;
    });
})
.directive('searchResult', function() {
  return {
    restrict: 'AE',
    replace: true,
    scope: true,
    templateUrl: 'app/results/searchResult.html'
  };
});