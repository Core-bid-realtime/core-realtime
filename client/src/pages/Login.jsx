import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { login } from "../store/appSlice";
import logo from "../assets/logo2.png";

const Login = () => {
  let [input, setInput] = useState();
  let navigate = useNavigate();
  let dispatch = useDispatch();
  let currentTheme = localStorage.getItem("theme");

  let changeInput = (e) => {
    let { name, value } = e.target;
    setInput({
      ...input,
      [name]: value,
    });
  };

  async function submitLogin(e) {
    e.preventDefault();
    await dispatch(login(input));
    navigate("/");
  }

  useEffect(() => {
    if (currentTheme) {
      document.documentElement.setAttribute("data-theme", currentTheme);
    }
  }, [currentTheme]);

  return (
    <>
      <div className="flex items-center justify-center min-h-screen ">
        <form onSubmit={submitLogin}>
          <div className="relative flex flex-col m-6 space-y-8 bg-base-200 shadow-2xl rounded-2xl md:flex-row md:space-y-0">
            <div className="flex flex-col justify-center p-8 md:p-14">
              <span className="mb-3 text-4xl font-bold">Login</span>
              <span className="font-light text-bg-body-secondary">Welcome back to the CORE!</span>
              <div className="py-4">
                <span htmlFor="email" className="mb-2 text-md">
                  Email
                </span>
                <input type="email" className="w-full border border-base-300 p-2 rounded-md" name="email" id="email" onChange={changeInput} />
              </div>
              <div>
                <span htmlFor="password" className="mb-2 text-md">
                  Password
                </span>
                <input type="password" name="password" id="password" onChange={changeInput} className="w-full p-2 border border-base-300 rounded-md" />
              </div>
              <button type="submit" className="w-full bg-base-300 mt-10 text-bg-body-secondary p-2 rounded-lg mb-6 hover:bg-base-200">
                Login
              </button>

              <div className="text-center text-bg-body-secondary ">
                Don't have an account?
                <a href="/register" className="font-bold mx-2 text-bg-body-secondary hover:text-base-300">
                  Sign up
                </a>
              </div>
            </div>

            <div className="relative bg-base-300 rounded-md">
              <img src={logo} alt="img" className="w-[500px] h-[500px] hidden rounded-r-2xl md:block object-cover animate-logo" />
            </div>
          </div>
        </form>
      </div>
    </>
  );
};

export default Login;
