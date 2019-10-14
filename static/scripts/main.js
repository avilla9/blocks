var blocks = angular.module('Blocks', []);

blocks.config(['$httpProvider', '$interpolateProvider',
  function ($httpProvider, $interpolateProvider) {
    /* for compatibility with django teplate engine */
    $interpolateProvider.startSymbol('{$');
    $interpolateProvider.endSymbol('$}');
    /* csrf */
    $httpProvider.defaults.xsrfHeaderName = 'X-CSRFToken';
    $httpProvider.defaults.xsrfCookieName = 'csrftoken';
  }]);


blocks.controller('BlocksController', function ($scope, $http) {
  // Consultar los registros de Wenhooks al iniciar la página
  var getBlocks = function () {
    $http({
      method: 'GET',
      url: 'webhooks',
    }).then(showblocks, errorCallBack);
  }

  // Llevar los registros de webhooks a un modelo para ser tratado en el template
  var showblocks = function (response) {
    $scope.shblock = response.data;
  }

  // Traer data de los bloques en javascript hacia angularjs
  $scope.showcode = function (data) {
    var code = Blockly.JavaScript.workspaceToCode(data);
    var string = code.replace(/['"]+/g, ''),
      separador = " ", // un espacio en blanco
      array = string.split(separador);
    $scope.name = array[0];
    $scope.url = array[1];
    $scope.action = array[2];
    if (array == '' || array[0] == '\\\n\t\t\t\t' || array[1] == '\\\n\t\t\t\t' || array[2] == '' || array.length < 3) {
      swal("ALERTA", "Debe agregar un bloque, llenar todos los campos y agregar una etiqueta.", "warning");
    } else {
      swal("¡Éxito!", "Se ha completado la acción.", "success");
      $http({
        method: 'POST',
        url: 'webhooks/',
        data: {
          name: $scope.name,
          action: $scope.action,
          url: $scope.url,
          response: 200,
          status_field: true
        }
      }).then(getBlocks());
    }
  }

  // Traer errores en la data
  var errorCallBack = function (reason) {
    $scope.error = reason.data;
  }

  // ***** Funciones cargadas al inicar la página *****
  getBlocks(); // Muestra los registros en webhooks
});