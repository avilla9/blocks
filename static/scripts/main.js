var Acme = angular.module('Acme', []);

Acme.config(['$httpProvider', '$interpolateProvider',
  function ($httpProvider, $interpolateProvider) {
    $interpolateProvider.startSymbol('{$');
    $interpolateProvider.endSymbol('$}');
    $httpProvider.defaults.xsrfHeaderName = 'X-CSRFToken';
    $httpProvider.defaults.xsrfCookieName = 'csrftoken';
  }]);

Acme.controller('AcmeController', function ($scope, $http) {

  $scope.data = [];
  $scope.workspace = null;

  // Consultar los registros de Wenhooks al iniciar la página
  var getBlocks = function () {
    $http({
      method: 'GET',
      url: 'webhooks',
    }).then(showBlocks);
  }

  // traer como respuesta registros de webhooks
  var showBlocks = function (response) {
    mainBlockly(response.data);
    toolbox(response.data);
  }

  getBlocks(); // Muestra los registros en webhooks

  var mainBlockly = function (arg) {
    $scope.data = arg;
    arg.forEach(function (element) {
      Blockly.Blocks[element.id] = {
        init: function () {
          this.appendValueInput("name")
            .setCheck("String")
            .appendField("Nombre");
          this.appendValueInput("url")
            .setCheck("String")
            .appendField("URL");
          this.setNextStatement(true, null);
          this.setColour(230);
          this.setTooltip("");
          this.setHelpUrl("");
        }
      };

      Blockly.JavaScript[element.id] = function (block) {
        var value_name = Blockly.JavaScript.valueToCode(block, 'name', Blockly.JavaScript.ORDER_ATOMIC);
        var value_url = Blockly.JavaScript.valueToCode(block, 'url', Blockly.JavaScript.ORDER_ATOMIC);
        var code = value_name + " " + value_url + " ";
        return code;
      };
    });
  }

  var toolbox = function (arg) {
    var box =
      '<xml>' +
      '<block type="new_webhook">' +
      '<field name="name">Nombre</field>' +
      '<field name="url">URL</field>' +
      '<value name="name">' +
      '<block type="text">' +
      '<field name="TEXT" />' +
      '</block>' +
      '</value>' +
      '<value name="url">' +
      '<block type="text">' +
      '<field name="TEXT" />' +
      '</block>' +
      '</value>' +
      '<next>' +
      '<block type="create">' +
      '<field name="Create">Crear</field>' +
      '</block>' +
      '</next>' +
      '</block>';

    box += '<block type="update">' +
      '<field name="Update">Actualizar</field>' +
      '</block>' +
      '<block type="delete">' +
      '<field name="Delete">Eliminar</field>' +
      '</block>';

    arg.forEach(function (element) {
      box +=
        '<block type="' + element.id + '">' +
        '<value name="name">' +
        '<block type="text">' +
        '<field name="TEXT">' +
        element.name +
        '</field>' +
        '</block>' +
        '</value>' +
        '<value name="url">' +
        '<block type="text">' +
        '<field name="TEXT">' +
        element.url +
        '</field>' +
        '</block>' +
        '</value>' +
        '</block>';
    });
    box += '</xml>';
    workspace = Blockly.inject('blocklyDiv', { toolbox: box });
  }

  // Traer data de los bloques en javascript hacia angularjs
  $scope.showcode = function () {
    var code = Blockly.JavaScript.workspaceToCode();
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
      }).then(
        location.reload()
        /* function () {
        //getBlocks();
        $scope.data.push({
          name: $scope.name,
          action: $scope.action,
          url: $scope.url,
          response: 200,
          status_field: true
        });
        mainBlockly($scope.data);
      } */);
    }
  }
});