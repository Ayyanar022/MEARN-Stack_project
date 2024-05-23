import React, { useContext, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import loginIcons from "../assest/signin.gif";
import { FaRegEye } from "react-icons/fa"; // Eye open
import { IoEyeOffOutline } from "react-icons/io5"; // Eye off
import SummaryApi from "../common";
import { toast } from "react-toastify";
import Context from "../context";

const Login = () => {
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();
  const { current_userDetails } = useContext(Context);

  const [data, setData] = useState({
    email: "",
    password: "",
  });

  const handleChnage = (e) => {
    const { name, value } = e.target;
    setData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const dataResponse = await fetch(SummaryApi.signIn.url, {
      method: SummaryApi.signIn.method,
      credentials: "include",
      headers: {
        "content-type": "application/json",
      },
      body: JSON.stringify(data),
    });

    const dataApi = await dataResponse.json();
    console.log("dataApi", dataApi);
    console.log("dataApi", dataApi);
    if (dataApi.success) {
      toast.success(dataApi.message);

      navigate("/");
      current_userDetails();
    }

    if (dataApi.err) {
      toast.error(dataApi.message);
    }
  };

  return (
    <section id="login">
      <div className="mx-auto container p-4">
        <div className="bg-white p-4 w-full max-w-sm mx-auto">
          <div className="w-20 h-20 mx-auto">
            <img src={loginIcons} alt=" Signin logo" />
          </div>

          <form className="mt-2 flex flex-col gap-2 ">
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

              <Link
                to={"/forgot-password"}
                className="ml-auto w-fit block hover:underline hover:text-red-500"
              >
                Forgot Password?
              </Link>
            </div>
            <button
              onClick={handleSubmit}
              className="bg-red-500 hover:bg-red-600 py-1 text-lg font-semibold px-1 w-full max-w-[150px]  rounded-lg text-white hover:scale-105 transition-all mx-auto block mt-6"
            >
              Login
            </button>
          </form>
          <p className="mt-2">
            don't have account?
            <Link to={"/sign-up"} className="font-semibold hover:text-red-600">
              Sign up
            </Link>
          </p>
        </div>
      </div>
    </section>
  );
};

export default Login;
