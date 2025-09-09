import { Fragment } from "react";
import { NavLink } from "react-router-dom";
import { Menu, Popover, Transition } from "@headlessui/react";
import { MenuIcon, XIcon } from "@heroicons/react/outline";
import { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { signOutUser } from "../../redux/user/userLogoutSlice";
import { EditUserForm } from "./EditUserForm";
import profileIcon from "../../assets/user.svg";
import UserBanner from "../../components/sharedComponents/UserBanner";
import cookie from "js-cookie";



const navigation = [
  { name: "Home", to: "/" },
  { name: "Programs", to: "/programs" },
  { name: "Events", to: "/events" },
  { name: "Videos", to: "/videos" },
  { name: "Resources", to: "/resources" },
  { name: "Partners", to: "/partners_page" },
];

function classNames(...classes) {
  return classes.filter(Boolean).join(" ");
}

const Navbar = ({}) => {
  const location = useLocation();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const isLoggedIn = cookie.get("isLoggedIn");
  const [isProfileEditorRendered, setProfileEditorRendered] = useState(false);
  const [selectedImage, setSelectedImage] = useState(null);
  const userId = cookie.get("userId");
  const isUser = cookie.get("isUser")
  const isProfileConfirmed = cookie.get("profileCofirmed")
  const isSettingsConfirmed = cookie.get("settings_confirmed")
  const [meta, setMeta] = useState(cookie.get("isMetaAdmin"));
  const [admin, setAdmin] = useState(cookie.get("isBxdpAdmin"));
  const isOrgAdmin = cookie.get("isOrgAdmin")
  const isOrgUser = cookie.get("isOrgUser")
  const profileImage = cookie.get("profileImage")
  const orgId = cookie.get('orgId')
  const currentPath = window.location.pathname;
  const dashboard = (isOrgAdmin==="true") || (isOrgUser==="true") ? "org_dashboard" : "dashboard"

  useEffect(() => {
    setMeta(cookie.get("isMetaAdmin"))
    setAdmin(cookie.get("isBxdpAdmin"))
  }, [])

  console.log("isProfileConfirmed: "+ isProfileConfirmed)
  console.log("isUser: "+ isUser)
  console.log("isSettingsConfirmed: "+ isSettingsConfirmed)
  useEffect(() => {
    if (isProfileConfirmed == "false" && isUser == "true") {
      navigate("/create_profile")
    }else if(isProfileConfirmed == "true" && isUser == "true" && isSettingsConfirmed == "false"){
      navigate("/set_preferences")
    }
  }, [isProfileConfirmed])

  const handleImageChange = (event) => {
    setSelectedImage(event.target.files[0]);
  };

  const handleUserSettingsNavigation = (event) => {
    event.preventDefault();
    if (event.target.name == "dashboard") {

      location.pathname !== "/dashboard"
        ? navigate("/dashboard")
        : window.location.reload(true);

    } else if (event.target.name == "org_dashboard") {
      location.pathname !== "/org_dashboard"
        ? navigate("/org_dashboard")
        : window.location.reload(true);
    } else if (event.target.name == "logout") {
      dispatch(signOutUser({ user_id: userId })).then(() => {
        window.location.reload(true);
      });
    }else if (event.target.name == "home") {
       location.pathname !== "/home"
        ? navigate("/home")
        : window.location.reload(true);
    }
    else{
      
    }
  };

  const handleNavigation = (event,id) => {
      event.preventDefault();
      const link = `/partners_page/partnerProfile/${id}`
      navigate(link)
  };

  const renderUserEditForm = () => {
    return (
      <EditUserForm
        userId={userId}
        isProfileEditorRendered={isProfileEditorRendered}
        setProfileEditorRendered={setProfileEditorRendered}
        selectedImage={selectedImage}
        handleImageChange={handleImageChange}
      />
    );
  };

  const ProfileMenuItems = () => {
    return (
      <div className="cursor-pointer">
        { isUser === "false" &&(meta=="true" || admin=="true") && (
        <Menu.Item
            name={dashboard}
            onClick={(e) => navigate("/dashboard")}
          >
            {({ active }) => (
              <a
                className={classNames(
                  active
                    ? "bg-tkh-brand-tangerine-2 text-tkh-grayscale-0"
                    : "text-tkh-grayscale-7 hover:bg-tkh-brand-tangerine-1 hover:text-tkh-grayscale-0",
                  "flex px-4 py-2 text-base font-semibold"
                )}
              >
              <button name="dashboard">Dashboard</button>
            </a>
          )}
          </Menu.Item>
        )} 
        { isUser === "false" &&meta=="false" &&(
          <Menu.Item
              name={dashboard}
              onClick={(e) => navigate("/org_dashboard")}
            >
              {({ active }) => (
                <a
                  className={classNames(
                    active
                      ? "bg-tkh-brand-tangerine-2 text-tkh-grayscale-0"
                      : "text-tkh-grayscale-7 hover:bg-tkh-brand-tangerine-1 hover:text-tkh-grayscale-0",
                    "flex px-4 py-2 text-base font-semibold"
                  )}
                >
                <button name="dashboard">Dashboard</button>
              </a>
            )}
          </Menu.Item>
        )}
        <Menu.Item
            name={"profile"}
            onClick={(e) => navigate("/profile")}
          >
            {({ active }) => (
              <a
                className={classNames(
                  active
                    ? "bg-tkh-brand-tangerine-2 text-tkh-grayscale-0"
                    : "text-tkh-grayscale-7 hover:bg-tkh-brand-tangerine-1 hover:text-tkh-grayscale-0",
                  "flex px-4 py-2 text-base font-semibold"
                )}
              >
                <button name="Profile Dashboard">Profile Dashboard</button>
            </a>
          )}
          </Menu.Item>

       
        
        { isOrgAdmin === "true" &&(

          <Menu.Item name="edit"  onClick={(e) => handleNavigation(e,orgId)}>
            {({ active }) => (
              <a
                className={classNames(
                  active
                    ? "bg-tkh-brand-tangerine-2 text-tkh-grayscale-0"
                    : "text-tkh-grayscale-7 hover:bg-tkh-brand-tangerine-1 hover:text-tkh-grayscale-0",
                  "flex px-4 py-2 text-base font-semibold"
                )}
              >
                <button name="edit">Edit Org Profile</button>
              </a>
            )}
          </Menu.Item>
         )}
        <Menu.Item
          name="logout"
          onClick={(e) => handleUserSettingsNavigation(e)}
        >
          {({ active }) => (
            <a
              className={classNames(
                active
                  ? "bg-tkh-brand-tangerine-2 text-tkh-grayscale-0"
                  : "text-tkh-grayscale-7 hover:bg-tkh-brand-tangerine-1 hover:text-tkh-grayscale-0",
                "flex px-4 py-2 text-base font-semibold"
              )}
            >
              <button name="logout" onClick={(e) => handleLogOut(e)}>
                Logout
              </button>
            </a>
          )}
        </Menu.Item>
      </div>
    );
  };

  const renderLoggedInNav = () => {
    if (isLoggedIn) {
      return (
        <div className="hidden lg:flex items-center justify-end lg:flex-1 lg:w-0">
          <div className="absolute top-28 left-20 w-full">
            {renderUserEditForm()}
          </div>

          <Menu as="div" className="relative inline-block text-left">
            <div className="rounded-full">
              <Menu.Button >
                <img
                    src={profileImage? profileImage : profileIcon }
                  alt=""
                  className="h-7 w-7 object-fill rounded-full bg-tkh-grayscale-0"
                />
                <span className="sr-only">Open options</span>
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
              <Menu.Items className="origin-top-right absolute border border-solid border-tkh-grayscale-9 overflow-auto w-60 right-6 mt-1.5 shadow-sm rounded-md bg-tkh-grayscale-0 z-10">
                <div className="py-1">

                  
                    <ProfileMenuItems />

                  
                </div>
              </Menu.Items>
            </Transition>
          </Menu>
        </div>
      );
    } else if (!isLoggedIn) {
      return (
        <div className="hidden lg:flex items-center justify-end lg:flex-1 lg:w-0">
          <button
            href="#"
            className="whitespace-nowrap text-base font-medium
             hover:bg-tkh-grayscale-0 text-tkh-grayscale-0
             hover:text-tkh-brand-tangerine-5  border-solid border-tkh-grayscale-0 border-2  
             rounded px-[20px] h-[36px]"
          >
            <NavLink name="login" to="/login">
              Login
            </NavLink>
          </button>
          <NavLink to="/user_registration">
            <button
              href="#"
              className="ml-4 whitespace-nowrap bg-tkh-grayscale-0 px-[20px] h-[36px] 
              rounded border-2 border-solid  border-tkh-grayscale-0 shadow-sm text-base font-medium text-tkh-brand-tangerine-5
              hover:bg-tkh-brand-tangerine-5 active:bg-tkh-brand-tangerine-5 hover:text-tkh-grayscale-0 "
            >
              Sign Up
            </button>
          </NavLink>
        </div>
      );
    }
  };

  const renderMobileLoggedInNav = () => {
    if (isLoggedIn) {
      return (
        <div className="flex items-center justify-center">
          <div className="flex absolute z-10">{renderUserEditForm()}</div>
          <div className="flex flex-col justify-center items-center gap-4 cursor-pointer my-5 w-full">
            <div
             name={dashboard}
              onClick={(e) => handleUserSettingsNavigation(e)}
            >
              <a className="text-base font-medium text-[#3E4265] hover:text-tkh-brand-gold-4 active:text-tkh-brand-gold-4">
                <button name={dashboard} >Dashboard</button>
              </a>
            </div>
            <div name="profile" onClick={() => navigate("/profile")}>
              <a className="text-base font-medium text-[#3E4265] hover:text-tkh-brand-gold-4 active:text-tkh-brand-gold-4">
                <button name="profile">Profile Dashboard</button>
              </a>
            </div>
            
            <div name="logout" onClick={(e) => handleUserSettingsNavigation(e)}>
              <a className="text-base font-medium text-[#3E4265] hover:text-tkh-brand-gold-4 active:text-tkh-brand-gold-4">
                <button name="logout" onClick={(e) => handleLogOut(e)}>
                  Logout
                </button>
              </a>
            </div>
          </div>
        </div>
      );
    } else if (!isLoggedIn) {
      return (
        <div className="py-6 px-5">
          <div className="mt-6">
            <NavLink name="sign_up" to="/user_registration"> 
              <button className="w-full flex items-center justify-center border-2 border-tkh-brand-tangerine-5 bg-tkh-brand-tangerine-5 bg-origin-border px-4 py-2 rounded-md  shadow-sm text-base font-medium hover:bg-tkh-grayscale-0  hover:text-tkh-brand-tangerine-5 text-tkh-grayscale-0 ">
                Sign up
              </button>
            </NavLink>
            <p className="mt-6 text-center text-base font-medium text-tkh-grayscale-0">
              Have an Account?
              <NavLink
                to="/login"
                className="w-full flex items-center justify-center  border-tkh-grayscale-4  border-2  rounded-md px-4 py-2 shadow-sm text-base font-medium hover:text-tkh-grayscale-0 hover:bg-tkh-brand-tangerine-5 text-tkh-brand-tangerine-5">
             
                {" " + "Login"}
              </NavLink>
            </p>
          </div>
        </div>
      );
    }
  };

  return (
    <header className="h-[76px] bg-tkh-brand-tangerine-5 sticky top-0 w-[100vw] z-40">
      <UserBanner/>
      <Popover className="relative ">
        <div className="flex h-[76px] justify-between items-center mx-auto px-4 py-2 sm:px-6 lg:justify-start md:space-x-10 md:px-6 lg:px-10 xl:px-20 2xl:px-20 ">
          
            <NavLink name="Home" to="/" 
              
            >
              <span className="sr-only text-tkh-purple-5">DP</span>
             <img className="max-h-[55px]" src="https://d1yh21d3dzz97r.cloudfront.net/DP%20Digital%20Pipeline%20-%20_Powered%20by%20the%20Knowledge%20House_%20white%20%281%29.png" />
            </NavLink>
          
          <div className="-mr-2 -my-1 lg:hidden">
            <Popover.Button className="bg-tkh-grayscale-0   rounded-md p-2 inline-flex items-center justify-center text-tkh-grayscale-0 hover:text-gray-500 hover:bg-gray-100 focus:outline-none">
              <span className="sr-only">Open menu</span>
              <MenuIcon className="h-6 w-6 text-tkh-brand-tangerine-5" aria-hidden="true" />
            </Popover.Button>
          </div>
          <Popover.Group as="nav" className="hidden lg:flex space-x-10">
            {navigation.map((item) => (
              // <NavLink
              //   name={item.name}
              //   to={item.to}
              //   className={
              //     currentPath == item.to
              //       ? "text-base font-semibold text-[black] hover:text-tkh-brand-tangerine-5 active:text-tkh-brand-tangerine-5 "
              //       : "text-base font-semibold text-[#fff] hover:text-[black] active:text-[balck]"
              //   }
              // >
              //   {item.name}
              // </NavLink>
              <a name={item.name}
                href={ item.to}
                className={
                  currentPath == item.to
                    ? "text-base font-semibold text-[black] hover:text-tkh-brand-tangerine-5 active:text-tkh-brand-tangerine-5 "
                    : "text-base font-semibold text-[#fff] hover:text-[black] active:text-[balck]"
                } 
              >
                {item.name}
                
              </a>
            ))}
          </Popover.Group>
          {renderLoggedInNav()}
        </div>

        {/* Mobile menu */}
        <Transition
          as={Fragment}
          enter="duration-200 ease-out"
          enterFrom="opacity-0 scale-100"
          enterTo="opacity-100 scale-100"
          leave="duration-100 ease-in"
          leaveFrom="opacity-100 scale-100"
          leaveTo="opacity-0 scale-100"
        >
          <Popover.Panel
            focus
            className="absolute z-30 top-0 inset-x-0 p-0 transition transform origin-top-right lg:hidden"
          >
            <div className="rounded-sm shadow-md bg-[#F3F6FF] divide-y-2 divide-tkh-brand-tangerine-5">
              <div className="pt-5 pb-6 px-4 md:px-6">
                <div className="flex items-center justify-between">
                  <NavLink name="Home" to="/" 
              
            >
              <span className="sr-only text-tkh-purple-5">DP</span>

             <img className="max-h-[55px]" src="https://d1yh21d3dzz97r.cloudfront.net/DP%20Digital%20Pipeline%20-%20_Powered%20by%20the%20Knowledge%20House_.png" />
            </NavLink>
                  <div className="-mr-2">
                    <Popover.Button className="bg-tkh-brand-tangerine-5 rounded-md p-2 md:px-4 inline-flex items-center justify-center text-tkh-grayscale-0 hover:text-tkh-grayscale-0 focus:outline-none">
                      <span className="sr-only">Close menu</span>
                      <XIcon className="h-6 w-6" aria-hidden="true" />
                    </Popover.Button>
                  </div>
                </div>
                <div className="mt-6">
                  <nav className="grid grid-cols-1 gap-7">
                    {navigation.map((item) => (
                     <NavLink
                        name={item.name}
                        to={item.to}
                        className={
                          currentPath == item.to
                            ? "text-base font-medium text-tkh-brand-tangerine-5 hover:text-tkh-brand-tangerine-5 active:text-tkh-brand-tangerine-5 "
                            : "text-base font-medium text-[#3E4265] hover:text-tkh-brand-tangerine-5 active:text-tkh-brand-tangerine-5"
                        }
                      >
                        {item.name}
                      </NavLink>
                    ))}
                  </nav>
                </div>
              </div>
              {renderMobileLoggedInNav()}
            </div>
          </Popover.Panel>
        </Transition>
      </Popover>

      <div className="w-full h-[30px] flex justify-center items-center bg-tkh-grayscale-0">
        <h2 className="text-tkh-brand-tangerine-5 font-bold">Staging</h2>
      </div>
    </header>
  );
};

export default Navbar;
