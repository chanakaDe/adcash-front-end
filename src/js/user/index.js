import angular from 'angular';

// Create the module where our functionality can attach to
let userModule = angular.module('app.user', []);

// Include our UI-Router config settings
import UserConfig from './user.config';
userModule.config(UserConfig);

// Controllers
import UserCtrl from './user.controller';
userModule.controller('UserCtrl', UserCtrl);

export default userModule;
