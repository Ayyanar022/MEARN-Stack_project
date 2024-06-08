const { default: SummaryApi } = require("../common");

const fetchCategoryWiseProduct = async (category) => {
  const response = await fetch(SummaryApi?.getcategorywiseProduct?.url, {
    method: SummaryApi?.getcategorywiseProduct?.method,
    headers: {
      "content-type": "application/json",
    },
    body: JSON.stringify({ category: category }),
  });

  const resData = await response?.json();

  return resData;
};

export default fetchCategoryWiseProduct;
