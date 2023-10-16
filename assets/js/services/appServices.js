app.service("TablesDataList", ["$http", "$rootScope", "$q", function ($http, $rootScope, $q) {
  this.getList = function (tableName) {
    return $q(function (resolve, reject) {
      var unwatch = $rootScope.$watch("userDetails", function (newValue, oldValue) {
        if (newValue !== undefined) {
          var data = {
            tablename: tableName,
            userId: $rootScope.userDetails["id"],
          };

          $http({
            method: "POST",
            url: "apiConfig/homeTablesData.php",
            data: JSON.stringify(data),
          })
          .then(function (result) {
            resolve(result.data); 
          })
          .catch(function (error) {
            reject(error);
          })
          .finally(function () {
            unwatch(); 
          });
        }
      });
    });
  };
}]);
