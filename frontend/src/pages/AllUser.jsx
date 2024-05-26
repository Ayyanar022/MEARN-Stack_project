import React, { useEffect } from "react";
import { useState } from "react";
import SummaryApi from "../common";
import { toast } from "react-toastify";
import moment from "moment";
import { LiaUserEditSolid } from "react-icons/lia"; // edit icon
import ChangeUserRole from "../components/ChangeUserRole";

const AllUser = () => {
  const [allUsers, setAllUsers] = useState([]);
  const [openUpdateRole, setOpenUpdateRole] = useState(false);
  const [updateUserDetails, setUpdateUserDetails] = useState({
    name: "",
    email: "",
    role: "",
  });

  const allUser = async () => {
    try {
      const response = await fetch(SummaryApi.allUsers.url, {
        method: SummaryApi.allUsers.method,
        credentials: "include",
      });

      const responseData = await response.json();

      if (responseData.success) {
        console.log("responseData", responseData.data);
        setAllUsers(responseData.data);
      }

      if (responseData.error) {
        toast.error(responseData.message);
      }
    } catch (err) {}
  };

  useEffect(() => {
    allUser();
  }, []);

  const handlePopupClick = (user) => {
    console.log("user ", user);
    setUpdateUserDetails(user);
    setOpenUpdateRole(true);
  };
  return (
    <div className="bg-white pb-4">
      <table className="w-full userTable ">
        <thead className="bg-black text-white">
          <th className="p-1">S.NO</th>
          <th className="p-1">Name</th>
          <th className="p-1">Email</th>
          <th className="p-1">Role</th>
          <th className="p-1">Created Date</th>
          <th className="p-1">Action</th>
        </thead>
        <tbody>
          {allUsers?.map((user, index) => (
            <tr className="">
              <td className="text-center text-xs p-1 ">{index + 1}</td>
              <td className="text-center text-xs p-1 ">{user?.name}</td>
              <td className="text-center text-xs p-1 ">{user?.email}</td>
              <td className="text-center text-xs p-1 ">{user?.role}</td>
              <td className="text-center text-xs p-1 ">
                {moment(user?.updatedAt).format("LL")}
              </td>
              <td className="text-center text-lg p-1">
                <button
                  onClick={() => handlePopupClick(user)}
                  className="text-xl font-bold bg-green-100 p-1 rounded-full"
                >
                  <LiaUserEditSolid />
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      {openUpdateRole && (
        <ChangeUserRole
          onClose={() => setOpenUpdateRole(false)}
          name={updateUserDetails.name}
          email={updateUserDetails.email}
          role={updateUserDetails.role}
          userId={updateUserDetails._id}
          allUser={allUser}
        />
      )}
    </div>
  );
};

export default AllUser;
