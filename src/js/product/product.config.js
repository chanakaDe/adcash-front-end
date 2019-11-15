function ProductConfig($stateProvider) {
    'ngInject';
  
    $stateProvider
    .state('app.product', {
      url: '/product',
      controller: 'ProductCtrl',
      controllerAs: '$ctrl',
      templateUrl: 'product/product.html',
      title: 'Product',
    });
  
  };
  
  export default ProductConfig;
  