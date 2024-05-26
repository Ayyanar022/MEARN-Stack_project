import React, { useEffect } from "react";
import { BiSolidUserCircle } from "react-icons/bi";
import { useSelector } from "react-redux";
import { Link, Outlet, useNavigate } from "react-router-dom";
import ROLE from "../common/role";
// import SummaryApi from "../common";

const AdminPanel = () => {
  const user = useSelector((state) => state?.user?.user);

  const navigate = useNavigate();

  useEffect(() => {
    if (user?.role !== ROLE?.ADMIN) navigate("/");
  }, [user]);

  return (
    <div className="min-h-[calc(100vh-113px)] bg-slate-100 hidden md:flex">
      <aside className="bg-white  w-full max-w-60 min-h-full">
        <div className="h-36 flex justify-center items-center flex-col  ">
          <div className=" text-8xl cursor-pointer flex justify-center">
            {user?.profilepic ? (
              <img
                src={user?.profilepic}
                className="w-20 h-20 rounded-full"
                alt={user?.name}
              />
            ) : (
              <BiSolidUserCircle />
            )}
          </div>
          <p className="capitalize text-lg font-semibold">{user?.name}</p>
          <p className="capitalize text-sm font-semibold">{user?.role}</p>
        </div>
        {/**navigation */}
        <div>
          <nav className="grid p-4">
            <Link className="p-2 hover:bg-slate-100" to={"all-users"}>
              All Users
            </Link>
            <Link className="p-2 hover:bg-slate-100" to={"products"}>
              Products
            </Link>
          </nav>
        </div>
      </aside>
      <main className="w-full h-full p-2">
        <Outlet />
      </main>
    </div>
  );
};

export default AdminPanel;
