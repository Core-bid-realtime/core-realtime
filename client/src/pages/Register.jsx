import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { register } from "../store/appSlice";
import logo from "../assets/logo2.png";

const Register = () => {
  let { isError, errorMessage } = useSelector((state) => state.appReducer);
  let navigate = useNavigate();
  let dispatch = useDispatch();
  let currentTheme = localStorage.getItem("theme");
  let [input, setInput] = useState({
    fullname: "",
    email: "",
    password: "",
  });

  let changeInput = (e) => {
    let { name, value } = e.target;
    setInput({
      ...input,
      [name]: value,
    });
  };

  async function saveSubmit(e) {
    e.preventDefault();
    await dispatch(register(input));
    navigate("/login");
  }

  useEffect(() => {
    if (currentTheme) {
      document.documentElement.setAttribute("data-theme", currentTheme);
    }
  }, [currentTheme]);

  return (
    <>
      <div className="flex items-center justify-center min-h-screen">
        <form onSubmit={saveSubmit}>
          <div className="relative flex flex-col bg-base-200 shadow-2xl rounded-2xl md:flex-row md:space-y-0">
            <div className="flex flex-col justify-center p-8 md:p-14">
              <span className="mb-3 text-4xl font-bold">Register</span>
              <span className="font-light text-bg-body-secondary">Welcome to the CORE, your place to fast bidding!</span>
              {isError && (
                <div role="alert" className="alert mb-2 alert-error">
                  <svg xmlns="http://www.w3.org/2000/svg" className="stroke-current shrink-0 h-6 w-6" fill="none" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                  <span>{errorMessage}</span>
                </div>
              )}
              <div className="py-1">
                <span htmlFor="fullname" className="mb-2 text-md">
                  Full Name
                </span>
                <input type="text" className="w-full p-2 rounded-md border border-base-300" name="fullname" id="fullname" onChange={changeInput} />
              </div>
              <div className="py-1">
                <span htmlFor="email" className="mb-2 text-md">
                  Email
                </span>
                <input type="text" className="w-full p-2 rounded-md border border-base-300" name="email" id="email" onChange={changeInput} />
              </div>
              <div className="py-1">
                <span htmlFor="password" className="mb-2 text-md">
                  Password
                </span>
                <input type="password" name="password" id="password" className="w-full p-2 rounded-md border border-base-300" onChange={changeInput} />
              </div>
              <button type="submit" className="w-full bg-base-300 mt-4 text-bg-body-secondary p-2 rounded-lg mb-6 hover:bg-base-200">
                Sign Up
              </button>

              <div className="text-center text-bg-body-secondary ">
                Already have an account?
                <a href="/login" className="font-bold mx-2 text-bg-body-secondary hover:text-base-300">
                  Login
                </a>
              </div>
            </div>

            <div className="relative bg-base-300 rounded-md">
              <img src={logo} alt="img" className="w-[500px] h-[500px] animate-pulse hidden rounded-r-2xl md:block object-cover" />
            </div>

          </div>
        </form>
      </div>
    </>
  );
};

export default Register;
