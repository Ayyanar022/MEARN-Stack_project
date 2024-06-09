const backendDomain = "http://localhost:8080";

const SummaryApi = {
  signup: {
    url: `${backendDomain}/api/signup`,
    method: "post",
  },
  signIn: {
    url: `${backendDomain}/api/signin`,
    method: "post",
  },
  current_user: {
    url: `${backendDomain}/api/user-details`,
    method: "get",
  },
  logOut: {
    url: `${backendDomain}/api/logout`,
    method: "get",
  },
  allUsers: {
    url: `${backendDomain}/api/all-users`,
    method: "get",
  },
  userRoleUpdate: {
    url: `${backendDomain}/api/userRole-update`,
    method: "post",
  },
  uploadProduct: {
    url: `${backendDomain}/api/upload-product`,
    method: "post",
  },
  getAllProducts: {
    url: `${backendDomain}/api/get-allproduct`,
    method: "get",
  },
  editProduct: {
    url: `${backendDomain}/api/edit-product`,
    method: "post",
  },
  productCategoryDistinct: {
    url: `${backendDomain}/api/get-distinctproduct`,
    method: "get",
  },
  getcategorywiseProduct: {
    url: `${backendDomain}/api/category-wiseproduct`,
    method: "post",
  },
  getProductDetails: {
    url: `${backendDomain}/api/product-details`,
    method: "post",
  },
  addToCart: {
    url: `${backendDomain}/api/addTo-cart`,
    method: "post",
  },
  cartCount: {
    url: `${backendDomain}/api/cart-count`,
    method: "get",
  },
  getCartProductView: {
    url: `${backendDomain}/api/getCart-product`,
    method: "get",
  },
};

export default SummaryApi;
