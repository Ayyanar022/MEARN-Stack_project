import React, { useContext, useState } from "react";
import Logo from "./Logo";
import { BiSearchAlt } from "react-icons/bi";
import { BiSolidUserCircle } from "react-icons/bi"; // user icon
import { LuShoppingCart } from "react-icons/lu"; // cart icon
import { Link, json, useLocation, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import SummaryApi from "../common";
import { toast } from "react-toastify";
import { setUserDetails } from "../store/userSlice";
import ROLE from "../common/role";
import Context from "../context";

const Header = () => {
  const [adminMenuDisplay, setAdminMenuDisplay] = useState(false);

  const dispatch = useDispatch();
  const user = useSelector((state) => state?.user?.user);
  const context = useContext(Context);
  const navigate = useNavigate();
  const searchInputLocation = useLocation();
  const url = new URLSearchParams(searchInputLocation?.search);
  const searchQuery = url.getAll("q");
  const [search, setSearch] = useState(searchQuery);

  const handleLogout = async (e) => {
    const fetchData = await fetch(SummaryApi.logOut.url, {
      method: SummaryApi.logOut.method,
      credentials: "include",
    });

    const responseData = await fetchData.json();

    if (responseData?.success) {
      toast.success(responseData.message);
      dispatch(setUserDetails(null));
      navigate("/");
    }

    if (responseData?.error) {
      toast.error(responseData.message);
    }
  };

  const handleAdminMenuDisplay = (e) => {
    setAdminMenuDisplay((prev) => !prev);
  };

  // serch
  const handleSearch = (e) => {
    const { value } = e.target;

    setSearch(value);

    if (value) {
      navigate(`/search?q=${value}`);
    } else {
      navigate("/search");
    }
  };

  return (
    <header className="h-16 shadow-md lg:px-5 bg-white w-full fixed z-40 ">
      <div className="h-full items-center flex container mx-auto px-4 justify-between">
        <div>
          <Link to={"/"}>
            <Logo w={90} h={50} />
          </Link>
        </div>

        <div className=" hidden  lg:flex items-center w-full justify-between max-w-sm  border rounded-full focus-within:shadow pl-3">
          <input
            onChange={handleSearch}
            value={search}
            type="text"
            placeholder="Search Peoduct ..."
            className="w-full  outline-none"
          />
          <div className="text-lg min-w-[50px] h-8 bg-red-500 flex justify-center items-center rounded-r-full font-bold cursor-pointer">
            <BiSearchAlt />
          </div>
        </div>

        <div className=" flex items-center gap-7">
          <div className="relative  flex justify-center items-center">
            {user?._id && (
              <div
                className=" text-4xl cursor-pointer"
                onClick={handleAdminMenuDisplay}
              >
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
            )}

            {adminMenuDisplay && (
              <div className="absolute bg-white bottom-0 top-9 hidden md:block   h-fit p-2 shadow-lg rounded text-center">
                {user?.role === ROLE?.ADMIN && (
                  <nav>
                    <Link
                      to={"admin-panel/products"}
                      onClick={handleAdminMenuDisplay}
                      className="whitespace-nowrap hover:bg-slate-100"
                    >
                      Admin Panel
                    </Link>
                  </nav>
                )}
              </div>
            )}
          </div>

          {user?._id && (
            <Link to={"/cart"} className="text-3xl relative cursor-pointer ">
              <span>
                <LuShoppingCart />
              </span>

              <div className="bg-red-500 text-white w-5 h-5 p-1 flex justify-center items-center rounded-full absolute -top-1 -right-1">
                <p className="text-xs text-center">{context?.cartCount}</p>
              </div>
            </Link>
          )}

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

    //---------------------------------------------------------------------------

    // <header className="h-16 shadow-md lg:px-5 bg-white">
    //   <div className="h-full flex items-center container mx-auto px-4 justify-between">
    //     <div className="flex items-center">
    //       <Link to={"/"}>
    //         <Logo w={70} h={40} /> {/* Adjusted size for mobile */}
    //       </Link>
    //     </div>

    //     <div className="hidden lg:flex items-center w-full justify-between max-w-sm border rounded-full focus-within:shadow pl-3">
    //       <input
    //         type="text"
    //         placeholder="Search Product..."
    //         className="w-full outline-none"
    //       />
    //       <div className="text-lg min-w-[50px] h-8 bg-red-500 flex justify-center items-center rounded-r-full font-bold cursor-pointer">
    //         <BiSearchAlt />
    //       </div>
    //     </div>

    //     <div className="flex items-center gap-4 lg:gap-7">
    //       <div className="relative flex justify-center items-center">
    //         {user?._id && (
    //           <div
    //             className="text-2xl md:text-4xl cursor-pointer"
    //             onClick={handleAdminMenuDisplay}
    //           >
    //             {user?.profilepic ? (
    //               <img
    //                 src={user?.profilepic}
    //                 className="w-8 h-8 md:w-10 md:h-10 rounded-full"
    //                 alt={user?.name}
    //               />
    //             ) : (
    //               <BiSolidUserCircle />
    //             )}
    //           </div>
    //         )}

    //         {adminMenuDisplay && (
    //           <div className="absolute bg-white bottom-0 top-9 hidden md:block h-fit p-2 shadow-lg rounded text-center">
    //             {user?.role === ROLE?.ADMIN && (
    //               <nav>
    //                 <Link
    //                   to={"admin-panel/products"}
    //                   onClick={handleAdminMenuDisplay}
    //                   className="whitespace-nowrap hover:bg-slate-100 block"
    //                 >
    //                   Admin Panel
    //                 </Link>
    //               </nav>
    //             )}
    //           </div>
    //         )}
    //       </div>

    //       <div className="text-2xl md:text-3xl relative cursor-pointer">
    //         <span>
    //           <LuShoppingCart />
    //         </span>
    //         <div className="bg-red-500 text-white w-5 h-5 flex justify-center items-center rounded-full absolute -top-1 -right-1">
    //           <p className="text-xs md:text-sm">0</p>
    //         </div>
    //       </div>

    //       <div className="flex justify-center items-center">
    //         {user?._id ? (
    //           <button
    //             className="px-2 py-1 text-xs md:text-lg bg-red-500 text-white rounded-full hover:bg-red-600"
    //             onClick={handleLogout}
    //           >
    //             Logout
    //           </button>
    //         ) : (
    //           <Link
    //             to={"/login"}
    //             className="px-2 py-1 text-xs md:text-lg bg-red-500 text-white rounded-full hover:bg-red-600"
    //           >
    //             Login
    //           </Link>
    //         )}
    //       </div>
    //     </div>
    //   </div>

    //   <div className="lg:hidden mt-2 px-4">
    //     <div className="flex items-center w-full justify-between border rounded-full focus-within:shadow pl-3">
    //       <input
    //         type="text"
    //         placeholder="Search Product..."
    //         className="w-full outline-none"
    //       />
    //       <div className="text-lg min-w-[50px] h-8 bg-red-500 flex justify-center items-center rounded-r-full font-bold cursor-pointer">
    //         <BiSearchAlt />
    //       </div>
    //     </div>
    //   </div>
    // </header>

    //------------------------------------------------------------------------
  );
};

export default Header;
