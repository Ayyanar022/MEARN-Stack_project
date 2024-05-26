import React from "react";
import { RiCloseFill } from "react-icons/ri";

const UploadProduct = ({ onClose }) => {
  return (
    <div className="fixed w-full h-full bg-slate-200 bg-opacity-35 left-0 top-0 bottom-0 right-0 flex justify-center items-center">
      <div className="bg-white p-4 rounded w-full max-w-2xl h-full max-h-[80%]">
        <div className="flex justify-center items-center">
          <h2 className="font-bold text-lg">UploadProduct</h2>
          <div className="w-fit ml-auto text-xl hover:text-red-500 cursor-pointer">
            <RiCloseFill />
          </div>
        </div>
      </div>
    </div>
  );
};

export default UploadProduct;
