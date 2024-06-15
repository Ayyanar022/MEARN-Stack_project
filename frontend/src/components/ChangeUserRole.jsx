import React, { useState } from "react";
import ROLE from "../common/role";
import { IoIosCloseCircleOutline } from "react-icons/io";
import SummaryApi from "../common";
import { toast } from "react-toastify";

const ChangeUserRole = ({ name, email, role, onClose, userId, allUser }) => {
  const [userRole, setUserRole] = useState(role);

  const handleRoleChange = (e) => {
    setUserRole(e.target.value);
  };

  const updateUserRole = async () => {
    const response = await fetch(SummaryApi.userRoleUpdate.url, {
      method: SummaryApi.userRoleUpdate.method,
      credentials: "include",
      headers: { "content-type": "application/json" },
      body: JSON.stringify({
        userId: userId,
        role: userRole,
      }),
    });
    const responseData = await response.json();

    if (responseData.success) {
      onClose();
      allUser();
      toast.success(responseData.message);
    }
  };

  return (
    <div className=" fixed top-0 bottom-0 left-0 right-0  flex justify-between items-center jus w-full h-full z-10 bg-slate-200 bg-opacity-50">
      <div className=" mx-auto bg-white shadow-md w-full max-w-sm p-4">
        <button
          className="block ml-auto hover:bg-red-600 hover:rounded-full hover:text-white"
          onClick={onClose}
        >
          <IoIosCloseCircleOutline />
        </button>
        <h1 className="pb-4 text-lg font-medium"> Change User Role</h1>
        <p>Name : {name}</p>
        <p>Email : {email}</p>
        <div className="flex justify-between items-center">
          <p>Role :</p>
          <select
            className="border px-4 py-1 mt-1"
            value={userRole}
            onChange={handleRoleChange}
          >
            {Object.values(ROLE).map((role) => (
              <option value={role} key={role}>
                {role}
              </option>
            ))}
          </select>
        </div>
        <button
          onClick={updateUserRole}
          className="w-fit mx-auto block p-1 px-3 text-white hover:bg-red-600 border bg-red-500 rounded-full "
        >
          Change Roll
        </button>
      </div>
    </div>
  );
};

export default ChangeUserRole;
