import marked from 'marked';

class UserCtrl {
  constructor($sce, $rootScope, User) {
    'ngInject';

    this._User = User;

    this.getAllUsers();
  }

  submitForm() {
    console.log("Data : ", this.formData);

    this._User.save(this.formData).then(
      (data) => {
        console.log("RESPONSE : ", data);
        this.formData = null;
        console.log("Added Done");
        this.getAllUsers();
      },
      (err) => {
        console.log(err);
      }
    )
  }

  getAllUsers() {
    this._User.get().then(
      (data) => {
        console.log("GET ALL : ", data);
        this.users = data;
      },
      (err) => {
        console.log(err);
      }
    )
  }

  deleteUser(id) {
    console.log("ID : ", id);
    this._User.delete(id).then(
      (data) => {
        console.log("RESPONSE : ", data);
        this.getAllUsers();
      },
      (err) => {
        console.log(err);
      }
    )
  }
}

export default UserCtrl;
