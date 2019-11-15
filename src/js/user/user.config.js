function UserConfig($stateProvider) {
    'ngInject';
  
    $stateProvider
    .state('app.user', {
      url: '/user',
      controller: 'UserCtrl',
      controllerAs: '$ctrl',
      templateUrl: 'user/user.html',
      title: 'User',
    });
  
  };
  
  export default UserConfig;
  