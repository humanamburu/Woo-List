const alerts = {};

//  TODO
// add lodash merge method

alerts.fillAllInputs = function create($scope) {
  return {
    scope: $scope,
    title: 'Ошибка! ',
    content: 'Заполните все поля!',
    placement: 'top',
    type: 'danger',
    show: true,
    container: 'bs-alert',
    animation: 'am-flip-x',
    duration: 2
  };
};

alerts.notIdentPasswords = function create($scope) {
  return {
    scope: $scope,
    title: 'Ошибка! ',
    content: 'Пароли не совпадают!',
    placement: 'top',
    type: 'danger',
    show: true,
    container: 'bs-alert',
    animation: 'am-flip-x',
    duration: 2
  };
};

alerts.succesReg = function create($scope) {
  return {
    scope: $scope,
    title: 'Успех!',
    content: 'Превосходно! Теперь можно выполнить вход :)',
    animation: 'am-flip-x',
    type: 'success success-center',
    show: true,
    duration: 3
  };
};

alerts.wrongData = function create($scope) {
  return {
    scope: $scope,
    title: 'Ошибка! ',
    content: 'Некорректные данные. Попробуйте еще раз',
    placement: 'top',
    type: 'danger',
    show: true,
    container: 'bs-alert',
    animation: 'am-flip-x',
    duration: 2
  };
};

alerts.succesDataSave = function create($scope) {
  return {
    scope: $scope,
    title: 'Успех!',
    content: 'Данные сохранены',
    animation: 'am-flip-x',
    type: 'success success-center',
    show: true,
    duration: 3
  };
};



module.exports = alerts;
