import { Outlet } from "react-router-dom";
import "./App.css";
import Header from "./components/Header";
import Footer from "./components/Footer";

// for tostify
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function App() {
  return (
    <>
      <ToastContainer />
      <Header />
      <main className="min-h-[calc(100vh-112px)]">
        <Outlet />
      </main>
      <Footer />
    </>
  );
}

export default App;
