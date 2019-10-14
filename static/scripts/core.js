/* 'use strict';

var app = angular.module('Blocks', []);

// Configuración del modulo Blocks
app.config(function ($locationProvider, $interpolateProvider) {
  $locationProvider.html5Mode({
    enabled: true
  });
  $interpolateProvider.startSymbol('{$');
  $interpolateProvider.endSymbol('$}');
});

// Controlador BlocksController
app.controller('BlocksController', function ($scope, $http) {

  // Consultar los registros de Wenhooks al iniciar la página
  var getBlocks = function () {
    $http({
      method: 'GET',
      url: 'webhooks/?format=json',
    }).then(showblocks, errorCallBack);
  }

  // Llevar los registros de webhooks a un modelo para ser tratado en el template
  var showblocks = function (response) {
    console.log(response.data); //[0].name
    $scope.shblock = response.data;
  }

  // Traer data de los bloques en javascript hacia angularjs
  $scope.showcode = function (data) {
    var code = Blockly.JavaScript.workspaceToCode(data);
    var string = code.replace(/['"]+/g, ''),
      separador = " ", // un espacio en blanco
      array = string.split(separador);
    console.log(array);
    $http({
      method: 'POST',
      url: 'webhooks/',
      data: array
    }).then(creationStatus, errorCallBack);
  }

  // Estado de la transaccion crear un registro en webhook
  var newBlock = function (response) {
    console.log(response.data);
  }

  // Traer errores en la data
  var errorCallBack = function (reason) {
    $scope.error = reason.data;
  }

  // ***** Funciones cargadas al inicar la página *****
  getBlocks(); // Muestra los registros en webhooks
});

 */