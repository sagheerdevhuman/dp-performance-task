import { Fragment } from "react";
import { Menu, Transition } from "@headlessui/react";
import { PlusSmIcon as PlusSmIconSolid } from "@heroicons/react/solid";
import { useState, useEffect } from "react";



function classNames(...classes) {
  return classes.filter(Boolean).join(" ");
}

const AddSkillButton = ({handleSkillFormRendering}) => {

  
  return (
    <div className="mb-7 flex-shrink-0 self-center flex">
      <Menu as="div" className="relative inline-block text-left bg-white">
        <div>
          <Menu.Button onClick={handleSkillFormRendering} className="flex items-center justify-center border border-tkh-grayscale-5 rounded-full w-8 h-8 md:h-8 md:w-8 text-xs md:text-sm font-bold sm:font-semibold text-tkh-grayscale-7 shadow-sm hover:bg-tkh-brand-tangerine-5 hover:border-tkh-brand-tangerine-1 hover:text-tkh-grayscale-0">
            <span className="sr-only">Open options</span>
            <PlusSmIconSolid className="h-6 w-6" aria-hidden="true" />
          </Menu.Button>
        </div>
      </Menu>
    </div>
  );
};

export default AddSkillButton;
