import marked from 'marked';

class ProductCtrl {
  constructor($sce, $rootScope, Product) {
    'ngInject';

    this._Product = Product;

    this.getAllProducts();

  }

  submitForm() {
    console.log("Data name : ", this.formData.name);

    this._Product.save(this.formData).then(
      (data) => {
        console.log("RESPONSE : ", data);
        this.formData = null;
        console.log("Added Done");
        this.getAllProducts();
      },
      (err) => {
        console.log(err);
      }
    )
  }

  getAllProducts() {
    this._Product.get().then(
      (data) => {
        console.log("GET ALL : ", data);
        this.products = data;
      },
      (err) => {
        console.log(err);
      }
    )
  }

  deleteProduct(id) {
    console.log("ID : ", id);
    this._Product.delete(id).then(
      (data) => {
        console.log("RESPONSE : ", data);
        this.getAllProducts();
      },
      (err) => {
        console.log(err);
      }
    )
  }

  addComment() {
    this.commentForm.isSubmitting = true;

    this._Product.add(this.article.slug, this.commentForm.body).then(
      (comment) => {
        this.comments.unshift(comment);
        this.resetCommentForm();
      },
      (err) => {
        this.commentForm.isSubmitting = false;
        this.commentForm.errors = err.data.errors;
      }
    )
  }

  deleteComment(commentId, index) {
    this._Comments.destroy(commentId, this.article.slug).then(
      (success) => {
        this.comments.splice(index, 1);
      }
    )
  }

}

export default ProductCtrl;
