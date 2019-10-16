// ******* CREATE WEBHOOK START *******
Blockly.Blocks['new_webhook'] = {
  init: function () {
    this.appendValueInput("name")
      .setCheck("String")
      .appendField(new Blockly.FieldLabelSerializable("Nombre"), "name");
    this.appendValueInput("url")
      .setCheck("String")
      .appendField(new Blockly.FieldLabelSerializable("URL"), "url");
    this.setInputsInline(false);
    this.setNextStatement(true, null);
    this.setColour(240);
    this.setTooltip("Ingrese el nombre del modelo y el url.");
    this.setHelpUrl("");
  }
};

// CREATE WEBHOOK JS
Blockly.JavaScript['new_webhook'] = function (block) {
  var value_name = Blockly.JavaScript.valueToCode(block, 'name', Blockly.JavaScript.ORDER_ATOMIC);
  var value_url = Blockly.JavaScript.valueToCode(block, 'url', Blockly.JavaScript.ORDER_ATOMIC);
  var code = value_name + " " + value_url + " ";
  return code;
};
// ******* CREATE WEBHOOK END *******

Blockly.Blocks['create'] = {
  init: function () {
    this.appendDummyInput()
      .setAlign(Blockly.ALIGN_CENTRE)
      .appendField(new Blockly.FieldLabelSerializable("Crear"), "Create");
    this.setPreviousStatement(true, null);
    this.setColour(135);
    this.setTooltip("");
    this.setHelpUrl("");
  }
};

Blockly.JavaScript['create'] = function (block) {
  // TODO: Assemble JavaScript into code variable.
  var code = 'Create';
  return code;
};

Blockly.Blocks['update'] = {
  init: function () {
    this.appendDummyInput()
      .setAlign(Blockly.ALIGN_CENTRE)
      .appendField(new Blockly.FieldLabelSerializable("Actualizar"), "Update");
    this.setPreviousStatement(true, null);
    this.setColour(60);
    this.setTooltip("");
    this.setHelpUrl("");
  }
};

Blockly.JavaScript['update'] = function (block) {
  // TODO: Assemble JavaScript into code variable.
  var code = 'Update';
  return code;
};

Blockly.Blocks['delete'] = {
  init: function () {
    this.appendDummyInput()
      .setAlign(Blockly.ALIGN_CENTRE)
      .appendField(new Blockly.FieldLabelSerializable("Eliminar"), "Delete");
    this.setPreviousStatement(true, null);
    this.setColour(0);
    this.setTooltip("");
    this.setHelpUrl("");
  }
};

Blockly.JavaScript['delete'] = function (block) {
  // TODO: Assemble JavaScript into code variable.
  var code = 'Delete';
  return code;
};

// Webhook functionality
Blockly.JavaScript['webhook'] = function (block) {
  var name = block.getFieldValue('name');
  var action = block.getFieldValue('action');
  var url = block.getFieldValue('url');
  var result = [name, action, url];
  return block;
};