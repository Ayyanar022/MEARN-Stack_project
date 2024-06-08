import SummaryApi from "../common";
import { toast } from "react-toastify";

const addToCart = async (e, id) => {
  e?.stopPropagation();
  e?.preventDefault();

  const response = await fetch(SummaryApi.addToCart.url, {
    method: SummaryApi.addToCart.method,
    credentials: "include",
    headers: {
      "content-type": "application/json",
    },
    body: JSON.stringify({ productId: id }),
  });
  const resData = await response.json();
  if (resData.success) {
    toast.success(resData.message);
  }
  if (resData.error) {
    toast.error(resData.message);
  }
  if (resData.warning) {
    toast.warning(resData.message);
  }
  return resData; 
};

export default addToCart;
