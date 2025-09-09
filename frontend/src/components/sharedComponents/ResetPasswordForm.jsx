import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Route, Navigate, useNavigate, useLocation } from "react-router-dom";


function ResetForm({setUserEmail,recoverUser,setForm}) {

  return (
   
          <form
            className=" pt-20 pr-20 h-full w-full"
            action="#"
            method="POST"
            onSubmit={recoverUser}
          >
            <div className="flex flex-col pl-10">
              <h1 className="mb-6 text-4xl font-bold text-gray-900">
                Account Recovery 
              </h1>

              <label
                htmlFor="email"
                className="flex flex-col  mb-3 font-medium text-sm"
              >
                Email address
                <input
                  id="email"
                  name="email"
                  type="email"
                  autoComplete="email"
                  required
                  placeholder="Type here..."
                  className="px-3 py-2 mt-2 font-normal appearance-none rounded-sm shadow-sm"
                  onChange={(e) => setUserEmail(e.target.value)}
                />
              </label>

              <div className="flex flex-col mb-3 md:flex-row justify-center md:justify-between items-center gap-1 w-full">
                <a  onClick={(e) => setForm("login")} className="text-sm text-gray-900 font-medium">
                  login with password
                </a>
              </div>

              <div className="mt-3 ">
                <button
                  type="submit"
                  className="flex justify-center py-2 px-2 h-10 w-full rounded-md  drop-shadow-btn font-semibold bg-tkh-brand-tangerine-5 text-tkh-solid-0 hover:bg-tkh-brand-tangerine-3"
                >
                
                  send
                </button>
              </div>
            </div>
          </form>
       
  );
}

export default ResetForm;
