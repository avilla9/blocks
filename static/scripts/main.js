var Acme = angular.module('Acme', []);

Acme.config(['$httpProvider', '$interpolateProvider',
  function ($httpProvider, $interpolateProvider) {
    /* for compatibility with django teplate engine */
    $interpolateProvider.startSymbol('{$');
    $interpolateProvider.endSymbol('$}');
    /* csrf */
    $httpProvider.defaults.xsrfHeaderName = 'X-CSRFToken';
    $httpProvider.defaults.xsrfCookieName = 'csrftoken';
  }]);


Acme.controller('AcmeController', function ($scope, $http) {


  var mainBlockly = function (arg) {
    arg.forEach(function (element) {
      Blockly.Blocks[element.id] = {
        init: function () {
          this.appendValueInput("name")
            .setCheck("String")
            .appendField(element.name);
          this.appendValueInput("url")
            .setCheck("String")
            .appendField(element.url);
          this.setNextStatement(true, null);
          this.setColour(230);
          this.setTooltip("");
          this.setHelpUrl("");
        }
      };

      Blockly.JavaScript[element.id] = function (block) {
        var value_name = Blockly.JavaScript.valueToCode(block, 'name', Blockly.JavaScript.ORDER_ATOMIC);
        var value_url = Blockly.JavaScript.valueToCode(block, 'url', Blockly.JavaScript.ORDER_ATOMIC);
        // TODO: Assemble JavaScript into code variable.
        var code = '...;\n';
        return code;
      };
    });


    Blockly.inject('blocklyDiv', { toolbox: toolbox });
  }


  // Consultar los registros de Wenhooks al iniciar la página
  var getBlocks = function () {
    $http({
      method: 'GET',
      url: 'webhooks',
    }).then(showblocks, errorCallBack);
  }

  // Llevar los registros de webhooks a un modelo para ser tratado en el template
  var showblocks = function (response) {
    mainBlockly(response.data);
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