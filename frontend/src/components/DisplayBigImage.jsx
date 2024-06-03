import React from "react";
import { RiCloseFill } from "react-icons/ri";

const DisplayBigImage = ({ imageUrl, onClose }) => {
  return (
    // <div className="fixed top-0 bottom-0 left-0 right-0 ">
    //   <div className="bg-white rounded shadow-lg max-w-5xl ">
    //     <div className="flex justify-center p-4 max-h-[50vh] max-w-[50vw]">
    //       <img src={imageUrl} alt="bigImage" className="w-full h-full" />
    //     </div>
    //   </div>
    // </div>
    <div className="fixed top-0 bottom-0 left-0 right-0 flex items-center justify-center">
      <div className="bg-white rounded shadow-lg max-w-7xl p-6">
        <div
          className="w-fit ml-auto text-xl hover:text-red-500 cursor-pointer"
          onClick={onClose}
        >
          <RiCloseFill />
        </div>
        <div className="flex justify-center">
          <img
            src={imageUrl}
            alt="bigImage"
            className="max-h-[70vh] max-w-[70vw] object-contain"
          />
        </div>
      </div>
    </div>
  );
};

export default DisplayBigImage;
