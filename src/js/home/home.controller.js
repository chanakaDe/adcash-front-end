class HomeCtrl {
  constructor(User, Product, Order, AppConstants, $scope) {
    'ngInject';

    this.appName = AppConstants.appName;
    this._$scope = $scope;
    this._Order = Order;
    this._User = User;
    this._Product = Product;
    this.formData = {
      user_id: '',
      product_id: '',
      order_qty: '',
      search_by_name: '',
      search_by_date: ''
    };
    this.today = new Date().toISOString().split('T')[0];

    User
      .get()
      .then(
        (users) => {
          console.log("USERS :", users);
          this.users = users
        }
      );

    Product
      .get()
      .then(
        (products) => {
          console.log("products :", products);
          this.products = products
        }
      );

    this.getAllOrders();

  }

  submitForm(status) {
    this.errors = [];
    // validating inputs
    if (this.formData.user_id == '' || this.formData.product_id == '' || this.formData.order_qty == '') {
      this.errors.push("All fields are required");
      console.log("EMPTY")
    }
    if (parseInt(this.formData.order_qty) <= 0) {
      this.errors.push("Quantity must be higher than 0");
      console.log("0 error")
    }
    if (this.formData.order_qty % 1 != 0) {
      this.errors.push("Enter valid order amount (Counting numbers)");
      console.log(this.formData.order_qty % 1 != 0);
    }
    if (this.errors.length > 0) {
      console.log("ERROR", this.errors.length)
      return
    }

    console.log("status", status);
    console.log("Data : ", this.formData);
    // this.productOb = JSON.parse(this.formData.product);
    this.total_price = parseInt(this.formData.order_qty) * parseFloat(this.selectedProduct.unit_price);
    this.discount = 0;
    this.net_total = 0;

    if (this.selectedProduct.name == "Pepsi Cola" && this.formData.order_qty >= 3) {
      this.discount = 20;
      this.net_total = (this.total_price * 80) / 100;
    } else {
      this.discount = 0;
      this.net_total = this.total_price;
    }

    this.orderTemp = {
      "user_id": this.formData.user_id,
      "product_id": this.formData.product_id,
      "order_qty": this.formData.order_qty,
      "total_price": this.total_price,
      "discount": parseInt(this.discount),
      "net_total": this.net_total,
      "order_date": this.today
    }
    console.log("orderTemp", this.orderTemp);

    if (status == "save") {
      this._Order.save(this.orderTemp).then(
        (data) => {
          console.log("RESPONSE : ", data);
          this.formData = {
            user_id: '',
            product: '',
            order_qty: ''
          };
          console.log("Added Done");
          this.getAllOrders();
        },
        (err) => {
          console.log(err);
        }
      )
    } else {
      this._Order.update(this.selectedOrderId, this.orderTemp).then(
        (data) => {
          console.log("RESPONSE : ", data);
          this.formData = {
            user_id: '',
            product: '',
            order_qty: ''
          };
          console.log("Update Done");
          this.getAllOrders();
          this.updateStatus = false;
        },
        (err) => {
          console.log(err);
        }
      )
    }

  }

  getProductID() {
    this._Product
      .getOne(this.formData.product_id)
      .then(
        (product) => {
          console.log("product :", product);
          this.selectedProduct = product
        }
      );
  }

  getAllOrders() {
    this._Order.get().then(
      (data) => {
        console.log("GET ALL : ", data);
        this.orders = data;
      },
      (err) => {
        console.log(err);
      }
    )
  }

  deleteOrder(id) {
    console.log("ID : ", id);
    this._Order.delete(id).then(
      (data) => {
        console.log("RESPONSE : ", data);
        this.getAllOrders();
      },
      (err) => {
        console.log(err);
      }
    )
  }

  editOrder(order) {
    console.log(order);
    this.formData.product_id = order.product_id.toString();
    this.formData.user_id = order.user_id.toString();
    this.formData.order_qty = order.order_qty;
    this.selectedOrderId = order.id;
    this.updateStatus = true;

    // Get selected product information
    this._Product
      .getOne(order.product_id)
      .then(
        (product) => {
          console.log("product :", product);
          this.selectedProduct = product
        }
      );
  }

  cancelUpdate() {
    this.updateStatus = false;
    this.formData = {
      user_id: '',
      product: '',
      order_qty: ''
    };
  }

  searchByDate() {
    if (this.formData.search_by_date == '') {
      return
    }
    this.formData.search_by_name = '';
    this.searchCondition = this.formData.search_by_date;
    console.log("this.searchCondition : ", this.searchCondition, " today : ", this.today);
    if (this.searchCondition == "7days" || this.searchCondition == "today") {
      this._Order.getByDate(this.searchCondition, this.today).then(
        (data) => {
          console.log("GET ALL : ", data);
          this.orders = data;
        },
        (err) => {
          console.log(err);
        }
      )
    } else {
      this.getAllOrders();
    }
  }

  searchByName() {
    if (this.formData.search_by_name == '') {
      return
    }
    this.formData.search_by_date = '';
    this.searchName = this.formData.search_by_name;

    this._Order.getByName(this.searchName).then(
      (data) => {
        console.log("GET ALL : ", data);
        this.orders = data;
      },
      (err) => {
        console.log(err);
      }
    )
  }

  resetAll() {
    this.getAllOrders();
    this.formData.search_by_date = '';
    this.formData.search_by_name = '';
  }


}

export default HomeCtrl;
