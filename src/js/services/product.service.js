export default class Product {
    constructor(AppConstants, $http) {
        'ngInject';

        this._AppConstants = AppConstants;
        this._$http = $http;

    }

    save(product) {
        let request = {};

        request.url = `${this._AppConstants.api}/products`;
        request.method = 'POST';

        request.data = {
            "name": product.name,
            "label": product.label,
            "unit_price": parseFloat(product.unit_price),
            "available_qty": parseInt(product.available_qty),
            "reorder_level": parseInt(product.reorder_level),
            "note": product.note
        };


        return this._$http(request).then((res) => res);
    }

    get() {
        return this._$http({
            url: this._AppConstants.api + '/products',
            method: 'GET'
        }).then((res) => res.data);
    }

    getOne(id) {
        return this._$http({
            url: this._AppConstants.api + '/products/' + id,
            method: 'GET'
        }).then((res) => res.data);
    }


    delete(id) {
        return this._$http({
            url: this._AppConstants.api + '/products/' + id,
            method: 'DELETE'
        }).then((res) => res.data);
    }

    follow(username) {
        return this._$http({
            url: this._AppConstants.api + '/profiles/' + username + '/follow',
            method: 'POST'
        }).then((res) => res.data);
    }

}
