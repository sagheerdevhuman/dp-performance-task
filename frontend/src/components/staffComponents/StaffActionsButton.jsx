import { Fragment } from "react";
import { Menu, Transition } from "@headlessui/react";
import { DotsVerticalIcon } from "@heroicons/react/solid";

function classNames(...classes) {
  return classes.filter(Boolean).join(" ");
}

const StaffActionsButton = ({
  changeUserActiveStatus,
  changeUserRole,
  deleteUser,
  staffId,
  setStaffId,
  userId,
}) => {
  return (
    <div className="flex-shrink-0 self-center flex">
      <Menu as="div" className="relative inline-block text-left">
        <div>
          <Menu.Button
            className="-m-2 p-2 flex items-center justify-center border-none border-tkh-grayscale-5 rounded text-sm leading-5 font-medium  text-tkh-grayscale-7 hover:text-tkh-brand-tangerine-1  active:text-tkh-brand-tangerine-2"
            onMouseEnter={() => {
              setStaffId({
                ...staffId,
                staffUserId: userId,
              });
            }}
          >
            <span className="sr-only">Open options</span>
            <DotsVerticalIcon className="h-6 w-6" aria-hidden="true" />
          </Menu.Button>
        </div>

        <Transition
          as={Fragment}
          enter="transition ease-out duration-100"
          enterFrom="transform opacity-0 scale-95"
          enterTo="transform opacity-100 scale-100"
          leave="transition ease-in duration-75"
          leaveFrom="transform opacity-100 scale-100"
          leaveTo="transform opacity-0 scale-95"
        >
          <Menu.Items className="origin-top-right absolute border border-solid border-tkh-grayscale-9 overflow-auto w-44 right-7 -mt-3 shadow-sm rounded-md bg-tkh-grayscale-0">
            <div className="py-0">
              <Menu.Item>
                {({ active }) => (
                  <a
                    href="#"
                    className={classNames(
                      active
                        ? "bg-tkh-brand-tangerine-2 text-tkh-grayscale-0"
                        : "text-tkh-grayscale-7 hover:bg-tkh-brand-tangerine-1 hover:text-tkh-grayscale-0",
                      "flex px-4 py-2 text-base font-semibold"
                    )}
                  >
                    <button
                      name="deactivateUser"
                      onClick={(event) => {
                        changeUserActiveStatus(event);
                      }}
                    >
                      Deactivate User
                    </button>
                  </a>
                )}
              </Menu.Item>
              <Menu.Item>
                {({ active }) => (
                  <a
                    href="#"
                    className={classNames(
                      active
                        ? "bg-tkh-brand-tangerine-2 text-tkh-grayscale-0"
                        : "text-tkh-grayscale-7 hover:bg-tkh-brand-tangerine-1 hover:text-tkh-grayscale-0",
                      "flex px-4 py-2 text-base font-semibold"
                    )}
                  >
                    <button
                      name="activateUser"
                      onClick={(event) => {
                        changeUserActiveStatus(event);
                      }}
                    >
                      Activate User
                    </button>
                  </a>
                )}
              </Menu.Item>
              <Menu.Item>
                {({ active }) => (
                  <a
                    href="#"
                    className={classNames(
                      active
                        ? "bg-tkh-brand-tangerine-2 text-tkh-grayscale-0"
                        : "text-tkh-grayscale-7 hover:bg-tkh-brand-tangerine-1 hover:text-tkh-grayscale-0",
                      "flex px-4 py-2 text-base font-semibold"
                    )}
                  >
                    <button
                      name="deleteUser"
                      onClick={(event) => {
                        deleteUser(event);
                      }}
                    >
                      Delete User
                    </button>
                  </a>
                )}
              </Menu.Item>
              <Menu.Item>
                {({ active }) => (
                  <a
                    href="#"
                    className={classNames(
                      active
                        ? "bg-tkh-brand-tangerine-2 text-tkh-grayscale-0"
                        : "text-tkh-grayscale-7 hover:bg-tkh-brand-tangerine-1 hover:text-tkh-grayscale-0",
                      "flex px-4 py-2 text-sm font-semibold"
                    )}
                  >
                    <button
                      name="toMetaAdmin"
                      onClick={(event) => {
                        changeUserRole(event);
                      }}
                    >
                      Make to Meta Admin
                    </button>
                  </a>
                )}
              </Menu.Item>
              <Menu.Item>
                {({ active }) => (
                  <a
                    href="#"
                    className={classNames(
                      active
                        ? "bg-tkh-brand-tangerine-2 text-tkh-grayscale-0"
                        : "text-tkh-grayscale-7 hover:bg-tkh-brand-tangerine-1 hover:text-tkh-grayscale-0",
                      "flex px-4 py-2 text-sm font-semibold"
                    )}
                  >
                    <button
                      name="toBxdpAdmin"
                      onClick={(event) => {
                        changeUserRole(event);
                      }}
                    >
                      Make to DP Admin
                    </button>
                  </a>
                )}
              </Menu.Item>
            </div>
          </Menu.Items>
        </Transition>
      </Menu>
    </div>
  );
};

export default StaffActionsButton;
