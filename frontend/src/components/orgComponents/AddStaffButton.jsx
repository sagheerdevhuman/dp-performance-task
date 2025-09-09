import { Fragment } from "react";
import { Menu, Transition } from "@headlessui/react";
import { PlusSmIcon as PlusSmIconSolid } from "@heroicons/react/solid";
import { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { orgAdminInviteStatus } from "../../redux/org/inviteOrgAdminSlice";
import { orgManagerInviteStatus } from "../../redux/org/inviteOrgManagerSlice";
import { orgUserInviteStatus } from "../../redux/org/inviteOrgUserSlice";
import AddStaffForm from "./AddStaffForm";

function classNames(...classes) {
  return classes.filter(Boolean).join(" ");
}

const AddStaffButton = ({handleStaffFormRendering}) => {
  const dispatch = useDispatch();
  
  return (
    <div className="mb-7 flex-shrink-0 self-center flex">
      <Menu as="div" className="relative inline-block text-left bg-white">
        <div>
          <Menu.Button onClick={handleStaffFormRendering} className="flex items-center justify-center rounded-md w-8 h-8 md:h-8 md:w-8 text-xs md:text-sm font-bold sm:font-semibold text-tkh-grayscale-7 shadow-sm bg-tkh-brand-tangerine-5 hover:bg-tkh-brand-tangerine-3 hover:border-tkh-brand-tangerine-1 hover:text-tkh-grayscale-0">
            <span className="sr-only">Open options</span>
            <svg xmlns="http://www.w3.org/2000/svg" width="19" height="19" viewBox="0 0 19 19" fill="none">
            <path d="M8.31055 12.4365H9.81055V5.68651H12.0605L9.06055 1.93651L6.06055 5.68651H8.31055V12.4365Z" fill="white"/>
            <path d="M3.81055 16.9365H14.3105C15.1378 16.9365 15.8105 16.2638 15.8105 15.4365V8.68651C15.8105 7.85926 15.1378 7.18651 14.3105 7.18651H11.3105V8.68651H14.3105V15.4365H3.81055V8.68651H6.81055V7.18651H3.81055C2.9833 7.18651 2.31055 7.85926 2.31055 8.68651V15.4365C2.31055 16.2638 2.9833 16.9365 3.81055 16.9365Z" fill="white"/>
            </svg>
          </Menu.Button>
        </div>
      </Menu>
    </div>
  );
};

export default AddStaffButton;
