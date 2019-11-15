export default class Order {
    constructor(AppConstants, $http) {
        'ngInject';

        this._AppConstants = AppConstants;
        this._$http = $http;

    }

    save(order) {
        let request = {};

        request.url = `${this._AppConstants.api}/orders`;
        request.method = 'POST';

        request.data = order;

        return this._$http(request).then((res) => res);
    }

    get() {
        return this._$http({
            url: this._AppConstants.api + '/orders',
            method: 'GET'
        }).then((res) => res.data);
    }

    getByDate(condition, date) {
        return this._$http({
            url: this._AppConstants.api + '/orders_by_date/' + condition + '/' + date,
            method: 'GET'
        }).then((res) => res.data);
    }

    getByName(name) {
        return this._$http({
            url: this._AppConstants.api + '/orders_by_user_or_product_name/' + name,
            method: 'GET'
        }).then((res) => res.data);
    }

    delete(id) {
        return this._$http({
            url: this._AppConstants.api + '/orders/' + id,
            method: 'DELETE'
        }).then((res) => res.data);
    }

    update(id, order) {
        let request = {};

        request.url = `${this._AppConstants.api}/orders/` + id;
        request.method = 'PUT';

        request.data = order;

        return this._$http(request).then((res) => res);
    }

}
