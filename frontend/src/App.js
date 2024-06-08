import { Outlet } from "react-router-dom";
import "./App.css";
import Header from "./components/Header";
import Footer from "./components/Footer";
// for tostify
import { ToastContainer, Bounce } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import { useEffect, useState } from "react";
import SummaryApi from "./common";
import Context from "./context";
import { useDispatch } from "react-redux";
import { setUserDetails } from "./store/userSlice";

function App() {
  const [cartCount, setCartCount] = useState(0);
  const dispatch = useDispatch();

  const current_userDetails = async () => {
    const dataResponse = await fetch(SummaryApi?.current_user.url, {
      method: SummaryApi.current_user.method,
      credentials: "include",
    });
    const dataApi = await dataResponse.json();
    if (dataApi.success) {
      dispatch(setUserDetails(dataApi.data));
    }
  };

  const getCartCount = async () => {
    const response = await fetch(SummaryApi?.cartCount.url, {
      method: SummaryApi.cartCount.method,
      credentials: "include",
    });
    const count = await response?.json();
    setCartCount(count?.data?.count);
  };

  useEffect(() => {
    current_userDetails();
    getCartCount();
  }, []);
  return (
    <>
      <Context.Provider
        value={{
          current_userDetails, // user Detail fetch
          cartCount, // cart count
          getCartCount, // cartCount fetch function
        }}
      >
        <ToastContainer
          position="top-right"
          autoClose={1800}
          hideProgressBar={false}
          newestOnTop={false}
          closeOnClick
          rtl={false}
          pauseOnFocusLoss={false}
          draggable
          pauseOnHover={false}
          theme="dark"
          transition={Bounce}
        />
        <Header />
        <main className="min-h-[calc(100vh-112px)] pt-16">
          <Outlet />
        </main>
        <Footer />
      </Context.Provider>
    </>
  );
}

export default App;
