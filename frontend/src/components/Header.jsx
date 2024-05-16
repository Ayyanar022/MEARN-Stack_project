import React from "react";
import Logo from "./Logo";
import { BiSearchAlt } from "react-icons/bi";

const Header = () => {
  return (
    <header className="h-16 shadow-md">
      <div className="h-full items-center flex container mx-auto px-4 justify-between">
        <div>
          <Logo w={90} h={50} />
        </div>

        <div className="flex items-center w-full justify-between max-w-sm bg-slate-500">
          <input type="text" placeholder="Search Peoduct ..." />
          <div className="text-lg min-w-[50px] h-8 bg-blue-400">
            <BiSearchAlt />
          </div>
        </div>
        <div className="">icons</div>
      </div>
    </header>
  );
};

export default Header;
