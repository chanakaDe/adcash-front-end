import angular from 'angular';

// Create the module where our functionality can attach to
let servicesModule = angular.module('app.services', []);


import UserService from './user.service';
servicesModule.service('User', UserService);

// Not using in this demo.
import JwtService from './jwt.service'
servicesModule.service('JWT', JwtService);

import ProductService from './product.service';
servicesModule.service('Product', ProductService);

import OrderService from './order.service';
servicesModule.service('Order', OrderService);


export default servicesModule;
