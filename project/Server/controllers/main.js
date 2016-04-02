const controllers = {};

controllers.auth = require('./auth/AuthCheck');
controllers.registration = require('./auth/Registration');
controllers.authorization = require('./auth/Authorization');
controllers.logout = require('./auth/LogOut');
controllers.passport = require('./auth/AuthStrategy');

controllers.updateUser = require('./auth/Update');

controllers.addList = require('./lists/AddList');
controllers.getList = require('./lists/Get');
controllers.delList = require('./lists/Delete');

controllers.addTask = require('./tasks/Add');
controllers.getTasks = require('./tasks/Get');
controllers.getTask = require('./tasks/GetTask');
controllers.delTask = require('./tasks/Del');
controllers.updateTask = require('./tasks/Update');
controllers.updateDate = require('./tasks/UpdateDate');
controllers.updateImage = require('./tasks/UpdateImage');

controllers.addSubtask = require('./tasks/subtasks/AddSubtask');
controllers.toggleSubtask = require('./tasks/subtasks/ToggleSubtask');
controllers.deleteSubtask = require('./tasks/subtasks/DeleteSubtask');

module.exports = controllers;
