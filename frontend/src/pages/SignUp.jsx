import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import loginIcons from "../assest/signin.gif";
import { FaRegEye } from "react-icons/fa"; // Eye open
import { IoEyeOffOutline } from "react-icons/io5"; // Eye off
import imageTobase64 from "../helpers/imageTobase64";
import SummaryApi from "../common/index";
import { toast } from "react-toastify";

const SignUp = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [confirmPassword, setConfirmPassword] = useState(false);

  const [data, setData] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
    profilepic: "",
  });

  const navigate = useNavigate();

  const handleChnage = (e) => {
    const { name, value } = e.target;
    setData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleUploadPic = async (e) => {
    e.preventDefault();
    const file = e.target.files[0];
    const imagePic = await imageTobase64(file);

    setData((prev) => ({
      ...prev,
      profilepic: imagePic,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (data.password !== data.confirmPassword) {
      return;
    }

    const dataResponse = await fetch(SummaryApi.signup.url, {
      method: SummaryApi.signup.method,
      headers: {
        "content-type": "application/json",
      },
      body: JSON.stringify(data),
    });

    const resData = await dataResponse.json();

    if (resData.success) {
      toast.success(resData.message);
      navigate("/login");
    }
    if (resData.error) toast.error(resData.message);
  };

  return (
    <section id="signup">
      <div className="mx-auto container p-4">
        <div className="bg-white p-4 w-full max-w-sm mx-auto">
          <div className="w-20 h-20 mx-auto">
            <div className="h-full rounded-full  w-full bg-slate-500 overflow-hidden">
              <img
                className="object-cover w-full h-full"
                src={data?.profilepic || loginIcons}
                alt=" Signin logo"
              />
            </div>

            <form>
              <label>
                <div className="text-xs  bg-slate-100 cursor-pointer">
                  Upload Photo
                </div>
                <input
                  type="file"
                  className="hidden"
                  onChange={handleUploadPic}
                />
              </label>
            </form>
          </div>

          <form className="mt-6 flex flex-col gap-2 " onSubmit={handleSubmit}>
            <div className="grid ">
              <label>Name:</label>
              <div className="bg-slate-100 p-2">
                <input
                  type="text"
                  name="name"
                  placeholder="Enter your FullName.."
                  className="w-full h-full outline-none bg-transparent"
                  onChange={handleChnage}
                  value={data.name}
                  required
                />
              </div>
            </div>

            <div className="grid mt-2">
              <label>Email:</label>
              <div className="bg-slate-100 p-2">
                <input
                  type="text"
                  name="email"
                  placeholder="Enter Email.."
                  className="w-full h-full outline-none bg-transparent"
                  onChange={handleChnage}
                  value={data.email}
                  required
                />
              </div>
            </div>

            <div className="mt-2">
              <label>Password:</label>
              <div className="bg-slate-100 p-2 flex">
                <input
                  type={showPassword ? "text" : "password"}
                  name="password"
                  placeholder="Enter Password.."
                  className="w-full h-full outline-none bg-transparent"
                  onChange={handleChnage}
                  value={data.password}
                  required
                />
                <div
                  className="flex cursor-pointer"
                  onClick={() => setShowPassword((prev) => !prev)}
                >
                  <span>
                    {showPassword ? <FaRegEye /> : <IoEyeOffOutline />}
                  </span>
                </div>
              </div>
            </div>

            <div className="mt-2">
              <label>Confirm Password:</label>
              <div className="bg-slate-100 p-2 flex">
                <input
                  type={confirmPassword ? "text" : "password"}
                  name="confirmPassword"
                  placeholder="Enter Confirm Password.."
                  className="w-full h-full outline-none bg-transparent"
                  onChange={handleChnage}
                  value={data.confirmPassword}
                  required
                />
                <div
                  className="flex cursor-pointer"
                  onClick={() => setConfirmPassword((prev) => !prev)}
                >
                  <span>
                    {confirmPassword ? <FaRegEye /> : <IoEyeOffOutline />}
                  </span>
                </div>
              </div>
            </div>

            <button
              type="submit"
              className="bg-red-500 hover:bg-red-600 py-1 text-lg font-semibold px-1 w-full max-w-[150px]  rounded-lg text-white hover:scale-105 transition-all mx-auto block mt-6"
            >
              Sign Up
            </button>
          </form>
          <p className="mt-2">
            Alredy have account?
            <Link to={"/login"} className="font-semibold hover:text-red-600">
              Sign in
            </Link>
          </p>
        </div>
      </div>
    </section>
  );
};

export default SignUp;
