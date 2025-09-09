import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Route, Navigate, useNavigate, useLocation } from "react-router-dom";

 



function LoginForm({setUserEmail,setUserPassword,loginUser,setForm}) {
  const [showPassword, setShowPassword] = useState(false);
   const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };
  return (
   
          <form
            className=" pt-20 pr-20 h-full w-full"
            action="#"
            method="POST"
            onSubmit={loginUser}
          >
            <div className="flex flex-col pl-10">
              <h1 className="text-4xl mb-6 font-bold text-gray-900">
                Login Info
              </h1>

              <label
                htmlFor="email"
                className="flex flex-col w-full mb-4 font-medium text-sm"
              >
                Email address
                <input
                  id="email"
                  name="email"
                  type="email"
                  autoComplete="email"
                  required
                  placeholder="Type here..."
                  className="px-3 py-2 mt-2  font-normal w-full rounded-sm shadow-sm"
                  onChange={(e) => setUserEmail(e.target.value)}
                />
              </label>

              <label
                htmlFor="password"
                className="flex flex-col  mb-4 font-medium text-sm"
              >
                Password
                <input
                  id="password"
                  name="password"
                  type={showPassword ? "text" : "password"}
                  autoComplete="current-password"
                  required
                  placeholder="Type here..."
                  className="px-3 py-2 mt-2 font-normal appearance-none rounded-sm shadow-sm"
                  onChange={(e) => setUserPassword(e.target.value)}
                />
                <p className="text-tkh-grayscale-8">Passwords are case sensitive</p>
                <button className="mb-0" type="button" onClick={togglePasswordVisibility}>
                  {showPassword ? "Hide" : "Show"}
                </button>
              </label>

              <div className="flex flex-col mb-3 md:flex-row justify-center md:justify-between items-center gap-1 w-full">
                <label
                  htmlFor="remember-me"
                  className="block text-sm text-gray-900 font-medium"
                >
                  <input
                    id="remember-me"
                    name="remember-me"
                    type="checkbox"
                    className="mr-2 h-4 w-4 text-indigo-600 focus:ring-indigo-500 border-gray-300 rounded"
                  />
                  Remember me
                </label>
                <a  onClick={(e) => setForm("reset")} className="text-sm text-gray-900 font-medium">
                  Forgot password?
                </a>
              </div>

              <div className="mt-3 ">
                <button
                  type="submit"
                  className="flex justify-center py-2 px-2 h-10 w-full rounded-md  drop-shadow-btn font-semibold bg-tkh-brand-tangerine-5 text-tkh-solid-0 hover:bg-tkh-brand-tangerine-3"
                >
                  Login
                </button>
              </div>
            </div>
          </form>
       
  );
}

export default LoginForm;
