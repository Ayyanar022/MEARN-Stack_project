import React from "react";
import Logo from "./Logo";
import { BiSearchAlt } from "react-icons/bi";
import { BiSolidUserCircle } from "react-icons/bi"; // user icon
import { LuShoppingCart } from "react-icons/lu"; // cart icon
import { Link, json } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import SummaryApi from "../common";
import { toast } from "react-toastify";
import { setUserDetails } from "../store/userSlice";

const Header = () => {
  const dispatch = useDispatch();
  const user = useSelector((state) => state?.user?.user);
  console.log("user headre", user);
  const handleLogout = async (e) => {
    const fetchData = await fetch(SummaryApi.logOut.url, {
      method: SummaryApi.logOut.method,
      credentials: "include",
    });

    const responseData = await fetchData.json();
    console.log("espo", responseData);
    if (responseData.success) {
      toast.success(responseData.message);
      dispatch(setUserDetails(null));
    }

    if (responseData.error) {
      toast.error(responseData.message);
    }
  };
  return (
    <header className="h-16 shadow-md lg:px-5 bg-white">
      <div className="h-full items-center flex container mx-auto px-4 justify-between">
        <div>
          <Link to={"/"}>
            <Logo w={90} h={50} />
          </Link>
        </div>

        <div className=" hidden  lg:flex items-center w-full justify-between max-w-sm  border rounded-full focus-within:shadow pl-3">
          <input
            type="text"
            placeholder="Search Peoduct ..."
            className="w-full  outline-none"
          />
          <div className="text-lg min-w-[50px] h-8 bg-red-500 flex justify-center items-center rounded-r-full font-bold cursor-pointer">
            <BiSearchAlt />
          </div>
        </div>

        <div className=" flex items-center gap-7">
          <div className=" text-4xl cursor-pointer">
            {user?.profilepic ? (
              <img
                src={user?.profilepic}
                className="w-10 h-10 rounded-full"
                alt={user?.name}
              />
            ) : (
              <BiSolidUserCircle />
            )}
          </div>

          <div className="text-3xl relative cursor-pointer ">
            <span>
              <LuShoppingCart />
            </span>
            <div className="bg-red-500 text-white w-5 h-5 p-2 flex justify-center items-center rounded-full absolute -top-1 -right-1">
              <p className="text-sm ">0</p>
            </div>
          </div>

          <div className="flex justify-center items-center">
            {user?._id ? (
              <button
                className="px-4 py-1 text-lg bg-red-500 text-white rounded-full hover:bg-red-600"
                onClick={handleLogout}
              >
                Logout
              </button>
            ) : (
              <Link
                to={"/login"}
                className="px-4 py-1 text-lg bg-red-500 text-white rounded-full hover:bg-red-600"
              >
                Login
              </Link>
            )}
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
